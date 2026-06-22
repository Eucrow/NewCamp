import pandas as pd

from sqlalchemy import create_engine

from django.http import HttpResponse

from rest_framework.status import HTTP_201_CREATED

from catches.models import Catch
from import_old_camp.importers.base import BaseImport
from import_old_camp.importers.catches_import import CatchesImport
from import_old_camp.importers.hauls_import import HaulsImport
from import_old_camp.importers.haul_trawls_import import HaulTrawlsImport
from import_old_camp.importers.hydrographies_import import HydrographiesImport
from import_old_camp.importers.lengths_import import LengthsImport
from import_old_camp.importers.meteorologies_import import MeteorologiesImport
from import_old_camp.importers.sampled_weights_import import SampledWeightsImport
from import_old_camp.importers.sexes_import import SexesImport
from import_old_camp.importers.species_import import SpeciesImport
from import_old_camp.importers.surveys_import import SurveysImport

from newcamp.utils import get_create_sampler_object

from import_old_camp.utils.db_helpers import get_sp_id, get_haul_id
from import_old_camp.utils.utils import get_file_dbf, get_type_survey

from newcamp.apps import empty

from strata.models import Stratum
from stratifications.models import Stratification


def create_stratification(stratification_name):
    """
    This function creates a new Stratification object if it does not already exist.

    Parameters:
    stratification_name (str): The name of the stratification to be created.

    Returns:
    HttpResponse: An HTTP response indicating the success or failure of the operation.
    """
    message = []
    if not Stratification.objects.filter(stratification=stratification_name).exists():
        stratification_object = Stratification.objects.create(
            # stratification=stratification_name,
            # comment="In Demersales surveys, the stratification is a combination of geographic sector and depth."
            stratification=stratification_name,
            description="In Demersales surveys, the stratification is a combination of geographic sector and depth."
        )
        message.append("<p>The stratification " + stratification_name + " has been created.</p>")
    else:
        message.append("<p>The stratification " + stratification_name + " already exists.</p>")

    return HttpResponse(message, status=HTTP_201_CREATED)


def create_stratum(request):
    """
    This function is used to create stratum instances based on the data provided in the request.
    It reads the data from the request, formats it, and then creates new Stratum objects in the database.

    Parameters:
    request (HttpRequest): The request object containing the data for creating the stratum.

    Returns:
    HttpResponse: An HTTP response indicating the success or failure of the operation.
    """

    df = get_file_dbf(request, 'camp')
    survey_file = df.to_dict('records')

    sectors_col_names = [1, 2, 3, 4, 5]
    sectors_names = ["MIÑO-FINISTERRE", "FINISTERRE-ESTA", "ESTACA-PEÑAS", "PEÑAS-AJO", "AJO-BIDASOA"]
    # dept_col_names "D" and "E" doesn't have data so its depths_names are "without depth 1" and "without
    # depth 2"
    depth_col_names = ["A", "B", "C", "D", "E"]
    depths_names = ["70-120", "120-200", "200-500", "without depth 1", "without depth 2"]

    stratification = get_type_survey(request.FILES['camp'].name) + "-sector-profundidad"
    stratification_object = Stratification.objects.get(stratification=stratification)

    message = []

    for row in survey_file:

        for s in sectors_col_names:
            for d in depth_col_names:

                area_col = "C" + str(s) + d

                depth_index = depth_col_names.index(d)
                name_stratification = sectors_names[s - 1] + "-" + depths_names[depth_index]

                area = row[area_col]

                # some depth-sector doesn't have info (columns C1D, C1E...)
                if not empty(area):

                    if Stratum.objects.filter(stratum=name_stratification).exists():
                        message.append("<p>The stratum " + name_stratification + " already exists.</p>")
                    else:
                        Stratum.objects.create(
                            stratum=name_stratification,
                            area=row[area_col],
                            comment="<p>In Demersales surveys, the stratification is a combination of geographic sector and " \
                                    "depth.</p> ",
                            stratification_id=stratification_object.id
                        )

                else:
                    message.append("<p>There aren't areas of stratification " + area_col + ".</p>")

    Stratum.objects.get_or_create(
        stratum="not_assigned",
        area=0,
        comment="<p>In Demersales surveys, the stratification is a combination of geographic sector and " \
                "depth.</p> ",
        stratification_id=stratification_object.id
    )

    return HttpResponse(message, status=HTTP_201_CREATED)


class FaunasImport(BaseImport):

    def __init__(self, request):  # Call parent constructor
        super().__init__(request, "fauna")
        self.survey_object = self.get_survey_object()
        self.sampler_object = get_create_sampler_object(sampler_name="ARRASTRE")
        self.faunas = get_file_dbf(self.request, "fauna")

    def format_table(self, file):
        catches_table = file

        # The catches table is filled first in the import of NTALL file. In this importation only the
        # species measured has been saved. With the FAUNA file, only species which hasn't been
        # measured must be stored because it is used to_sql from pandas library.

        def anti_join(x, y, on):
            """Return rows in x which are not present in y"""
            ans = pd.merge(left=x, right=y, how='left', indicator=True, on=on)
            ans = ans.loc[ans._merge == 'left_only', :]
            return ans

        # previously saved in the catches table:
        in_catches = Catch.objects.filter(haul__station__survey=self.survey_object).values()
        in_catches = pd.DataFrame(list(in_catches))
        in_catches = in_catches[['sp_id', 'category', 'haul_id']].drop_duplicates()

        # def get_cat_1_id(row):
        #     sp = Sp.objects.get(group=row['GRUPO'], sp_code=row['ESP'])
        #     cat_id = get_or_create_categories(sp=sp, category_name='1').id
        #     return cat_id

        # catches_table['category_id'] = catches_table.apply(get_cat_1_id, axis=1)
        # The category must always be 1 because only the measured species can have more than
        # one category, and that one is stored previously, when FAUNA file is imported.
        catches_table['category'] = 1
        catches_table['sp_id'] = catches_table.apply(get_sp_id, axis=1)
        catches_table['haul_id'] = catches_table.apply(get_haul_id, axis=1, args=[self.survey_name])
        catches_table['weight'] = catches_table['PESO_GR']
        catches_table['not_measured_individuals'] = catches_table['NUMERO']

        catches_table = catches_table[['haul_id', 'sp_id', 'category', 'weight', 'not_measured_individuals']]

        # catches to save = all catches in fauna file - previously saved in catches table
        catches_to_save_table = anti_join(catches_table, in_catches, ['sp_id', 'category', 'haul_id'])

        catches_to_save_table = catches_to_save_table[
            ['sp_id', 'category', 'haul_id', 'weight', 'not_measured_individuals']]

        return catches_to_save_table

    def import_data(self):
        """
        Import file with faunas data.
        :return: http response
        """
        try:

            catches_file = self.faunas

            # Create your engine.
            engine = create_engine('sqlite:///db.sqlite3', echo=True)

            # Cant' check if there aren't already saved, because in the format_catch_table are selected the
            # catches which aren't saved yet because they don't had been measured
            catches_table = self.format_table(catches_file)
            catches_table.to_sql("catches_catch", con=engine, if_exists="append", index=False)
            self.add_message(f"Successfully imported {len(catches_table)} catches records")

        except Exception as e:
            self.add_error(f"Error importing faunas: {e}")

        return HttpResponse(self.messages, status=HTTP_201_CREATED)


# class SpeciesImport(BaseImport):
#     """Import class for species data."""
#
#     def __init__(self, request):
#         super().__init__(request, "species")  # Call parent constructor
#
#         def not_survey_name(self):
#             pass
#
#         self.species_file = get_file_dbf(request, "species")
#         self.fields_species = {
#             "group": "GRUPO",
#             "sp_code": "ESP",
#             "sp_name": "ESPECIE",
#             "spanish_name": "NOMBREE",
#             "a_param": "A",
#             "b_param": "B",
#             "unit": "MED",
#             "increment": "INCREM",
#             "APHIA": "APHIA",
#         }
#         self.survey_name = not_survey_name()
#
#     def format_table(self, file):
#         """
#         Format species table - implementation of abstract method.
#         :param file: Input file data
#         :return: Formatted DataFrame
#         """
#
#         species_df = file.copy()
#
#         try:
#             # Select variables
#             species_df = species_df[list(self.fields_species.values())]
#
#             # Change variable names
#             species_df.columns = self.fields_species.keys()
#
#             # Add default columns
#             species_df['comment'] = ""
#             species_df['measurement_type_id'] = ""
#
#             self.add_message("Species table formatted successfully")
#
#             return species_df
#         except Exception as e:
#             self.add_error("Error formatting species table: {}".format(e))
#             return None
#
#     @staticmethod
#     def get_measurement_type(row):
#         """
#         Get the measurement type id. Used in pandas apply function.
#         :param row: row of the apply function
#         :return: Measurement type id.
#         """
#         unit_name = get_unit_name(row['unit'], row['increment'])
#
#         try:
#             measurement_type = MeasurementType.objects.get(name=unit_name)
#             return measurement_type.id
#         except ObjectDoesNotExist:
#             raise ValueError(f"MeasurementType object with name {unit_name} does not exist")
#
#     def import_data(self) -> HttpResponse:
#         """
#         Import species data - implementation of abstract method.
#         If the species_sp table is already filled, overwrite it.
#         :return: HttpResponse
#         """
#
#         try:
#             # Create your engine.
#             engine = create_engine('sqlite:///db.sqlite3', echo=True)
#
#             # species
#             species_table = self.format_table(self.species_file)
#
#             if species_table is None:
#                 return self.get_response()
#
#             # Apply measurement type
#             species_table['measurement_type_id'] = species_table.apply(self.get_measurement_type, axis=1)
#             species_table = species_table.drop(columns=['unit', 'increment'], axis=1)
#
#             # Save to database
#             # Previously use the argument if_exists="replace" to avoid partial saving of new species files.
#             # But in this way, the primary key is not generated (to_sql not allow it) and change the original
#             # structure without primary key.
#             # At the end, I use if_exists="append" to maintain the original primary key.
#             species_table.to_sql("species_sp", con=engine, if_exists="append", index="id")
#             self.add_message(f"Successfully imported {len(species_table)} species records")
#         except Exception as e:
#             self.add_error(f"Error importing species: {e}")
#
#         return self.get_response()

#
# class SurveysImport(BaseImport):
#     # Call parent constructor
#     def __init__(self, request):
#         super().__init__(request, "camp")
#         self.survey_file = get_file_dbf(request, "camp")
#         self.survey_object = self.get_survey_object()
#
#     def format_table(self, file) -> Any:
#         pass
#
#     def import_data(self):
#         """
#         Function to import the file with survey info.
#         :return: Http Response
#         """
#
#         try:
#             stratification_name = get_type_survey(self.request.FILES["camp"].name) + "-sector-profundidad"
#
#             stratification_id = Stratification.objects.get(stratification=stratification_name).id
#
#             if Survey.objects.filter(acronym=self.survey_file['CLAV']).exists():
#                 return HttpResponse(
#                     '<p>The survey ' + str(self.survey_file['CLAV']) + ' already exists in newCamp.</p>',
#                     status=300)
#
#             # save survey model
#             tmp = Survey()
#             tmp.acronym = self.survey_file['CLAV'][0]
#             tmp.description = self.survey_file['IDENT'][0]
#             tmp.width_x = self.survey_file['CUX'][0]
#             tmp.width_y = self.survey_file['CUY'][0]
#             tmp.origin_x = self.survey_file['OCUX'][0]
#             tmp.origin_y = self.survey_file['OCUY'][0]
#             tmp.ship = get_ship(self.survey_file['BARCO'][0])
#             tmp.hauls_duration = self.survey_file['DURLAN'][0]
#             if tmp.start_date is not None: tmp.start_date = datetime.strptime(
#                 fix_year_date(self.survey_file['COMI'][0]),
#                 '%d/%m/%y').date()
#             if tmp.end_date is not None: tmp.end_date = datetime.strptime(fix_year_date(self.survey_file['FINA'][0]),
#                                                                           '%d/%m/%y').date()
#             tmp.stratification_id = stratification_id
#
#             tmp.save()
#
#             self.add_message(f"The survey {self.survey_file['CLAV'][0]} has been saved.")
#
#         except Exception as e:
#             self.add_error("Error formatting species table: {}".format(e))
#
#         return self.get_response()
#

# class HydrographiesImport:
#
#     def __init__(self, request):
#         self.request = request
#         self.survey_name = get_survey_name(self.request.FILES['hidro'].name)
#         self.survey_object = Survey.objects.get(acronym=self.survey_name)
#         self.hydrographies = get_file_dbf(request, "hidro")
#         self.fields_hydrography = {
#             "latitude": "LATITUD",
#             "longitude": "LONGITUD",
#             "date_time": "FECHA",
#             "depth_probe": "SONDA",
#             "cable": "CABLE",
#             "depth": "PROF",
#             "temperature_0": "TEMP0",
#             "salinity_0": "SALI0",
#             "sigma_0": "SIGMA0",
#             "temperature_50": "TEMP50",
#             "salinity_50": "SALI50",
#             "sigma_50": "SIGMA50",
#             "temperature_100": "TEMP100",
#             "salinity_100": "SALI100",
#             "sigma_100": "SIGMA100",
#             "temperature": "TEMP",
#             "salinity": "SALI",
#             "sigma": "SIGMA",
#             "comment": "OBSERV",
#         }
#         self.sampler_object = get_create_sampler_object("CTD")
#         self.message = []
#
#     def format_hydrography_table(self, hydrography_df):
#
#         hydrography_df['latitude'] = hydrography_df["LATITUD"].apply(convert_position_camp_to_decimal)
#
#         hydrography_df['longitude'] = hydrography_df["LONGITUD"].apply(convert_position_camp_to_decimal)
#
#         hydrography_df['latitude'] = hydrography_df.apply(format_latitude_decimal, axis=1,
#                                                           args=["LATITUD", "NOSU", "S"])
#
#         hydrography_df['longitude'] = hydrography_df.apply(format_latitude_decimal, axis=1,
#                                                            args=["LONGITUD", "NOSU", "W"])
#
#         hydrography_df = hydrography_df.drop(['LATITUD', 'LONGITUD', 'NOSU'], axis=1)
#
#         def unit_date_time(row, date_field, time_field):
#             return datetime.strptime(str(row[date_field]) + " " + str(row[time_field]), '%Y-%m-%d %H.%M')
#
#         hydrography_df['date_time'] = hydrography_df.apply(unit_date_time, axis=1, args=["FECHA", "HORA"])
#
#         hydrography_df = hydrography_df.drop(['FECHA', 'HORA'], axis=1)
#
#         # Create a reverse mapping from values to keys
#         column_mapping = {value: key for key, value in self.fields_hydrography.items()}
#
#         # Rename columns using the mapping (columns not in mapping will remain unchanged)
#         hydrography_df = hydrography_df.rename(columns=column_mapping)
#
#         return hydrography_df
#
#     def import_hydrographies(self):
#         """
#         Function to import the CSV file with hydrography data.
#         :return:
#         """
#         hydrographies_df = self.format_hydrography_table(self.hydrographies)
#
#         # check there aren't already saved hydrographies of the survey
#         if HaulHydrography.objects.filter(haul_id__station_id__survey_id__acronym=self.survey_name):
#             self.message.append(
#                 "<p>hydrographies of this survey already saved in database. Remove all the hydrographies of this "
#                 "survey before try to import it again. None of the hydrographies has been saved.</p>")
#         else:
#             # station
#             # The station of hydrography haul is the station of the trawl haul (which is stored in the 'haul' field
#             # of hydrography file), so firstly we identify it:
#             sampler_object = Sampler.objects.get(sampler="CTD")
#
#             # gear
#             # By default we use the same gear for all the hydrography hauls
#             ctd_object, created = CTD.objects.get_or_create(name="1", brand="default brand", model="default model")
#
#             def createHydroStation(row):
#                 station_object, created = Station.objects.get_or_create(
#                     station=row['LANCE'],
#                     survey=self.survey_object,
#                 )
#                 row['station'] = station_object
#                 return row
#
#             def createHydroHaul(row, sampler_object, ctd_object):
#                 haul_object, created = Haul.objects.get_or_create(
#                     haul=row['ESTN'],
#                     sampler=sampler_object,
#                     station=row['station'],
#                     ctd=ctd_object,
#                     sampler_type="CTD",
#                 )
#                 row['haul_id'] = haul_object.id
#                 return row
#
#             hydrographies_df = hydrographies_df.apply(createHydroStation, axis=1)
#             hydrographies_df = hydrographies_df.apply(createHydroHaul, axis=1, args=[sampler_object, ctd_object])
#
#             columns = list(self.fields_hydrography.keys()) + ['haul_id']
#             hydrographies_df = hydrographies_df[columns]
#
#             # the empty values must be saved as Na, so:
#             hydrographies_df = hydrographies_df.replace('', pd.NA)
#
#             engine = create_engine('sqlite:///db.sqlite3', echo=True)
#             hydrographies_df.to_sql("hauls_haulhydrography", con=engine, if_exists="append", index=False)
#
#         return HttpResponse(self.message, status=HTTP_201_CREATED)


class OldCampImport:
    """
    Import all the tables from old CAMP in newCamp tables.
    The files required are CAMPXXx.csv, LANCEXXX.csv, FAUNAXXX.csv, NTALLXXX.csv, and HIDROXXX.csv
    """

    def __init__(self, request):
        self.sectors_col_names = [1, 2, 3, 4, 5]
        self.sectors_names = ["MIÑO-FINISTERRE", "FINISTERRE-ESTA", "ESTACA-PEÑAS", "PEÑAS-AJO", "AJO-BIDASOA"]
        # dept_col_names "D" and "E" doesn't have data so the depths_names of them are "without depth 1" and "without
        # depth 2"
        self.depth_col_names = ["A", "B", "C", "D", "E"]
        self.depths_names = ["70-120", "120-200", "200-500", "without depth 1", "without depth 2"]
        self.stratification_name = get_type_survey(request.FILES['camp'].name) + "-sector-profundidad"
        self.request = request

    def import_complete(self):
        stratification_name = get_type_survey(self.request.FILES['camp'].name) + "-sector-profundidad"

        stratification = create_stratification(stratification_name)

        stratum = create_stratum(self.request)

        survey = SurveysImport(self.request)
        survey_import = survey.import_data()

        hauls = HaulsImport(self.request)
        hauls_import = hauls.import_data()

        meteo = MeteorologiesImport(self.request)
        meteo_import = meteo.import_data()

        haul_trawl = HaulTrawlsImport(self.request)
        haul_trawl_import = haul_trawl.import_data()

        # Is mandatory that NTALL file will be imported before FAUNA file.
        # The NTALL file is imported in sex, catches, sampled_weight and lengths tables.

        catches = CatchesImport(self.request)
        catches_import = catches.import_data()

        sex = SexesImport(self.request)
        sex_import = sex.import_data()

        sampled_weight = SampledWeightsImport(self.request)
        sampled_weight_import = sampled_weight.import_data()

        lengths = LengthsImport(self.request)
        lengths_import = lengths.import_data()

        # The catches table is filled first in the import of NTALL file. In this import only the
        # species measured has been saved. With the FAUNA file, only of species which haven't been
        # measured must be stored because it is used to_sql from pandas library.
        faunas = FaunasImport(self.request)
        faunas_import = faunas.import_data()

        # hydro = HydrographiesImport(self.request)
        # hydrography_import = hydro.import_hydrographies()

        return HttpResponse([stratification.content,
                             stratum.content,
                             survey_import.content,
                             hauls_import.content,
                             meteo_import.content,
                             haul_trawl_import.content,
                             sex_import.content,
                             catches_import.content,
                             sampled_weight_import.content,
                             lengths_import.content,
                             faunas_import.content,
                             # hydrography_import.content
                             ])

    def import_species(self):
        species = SpeciesImport(self.request)
        species_import = species.import_data()

        response = [species_import.content]

        return HttpResponse(response)

    def import_hydrographies(self):
        hydro = HydrographiesImport(self.request)
        hydrography_import = hydro.import_data()

        response = [hydrography_import.content]

        return HttpResponse(response)
