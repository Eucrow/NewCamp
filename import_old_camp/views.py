import pandas as pd

from sqlalchemy import create_engine

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist

from datetime import datetime

from rest_framework.status import HTTP_201_CREATED, HTTP_409_CONFLICT, HTTP_400_BAD_REQUEST

from catches.models import Catch
from hauls.models import Haul, HaulTrawl, HaulHydrography, Meteorology

from newcamp.utils import get_survey_name, get_create_sampler_object

from import_old_camp.utils.converters import fix_year_date, convert_position_camp_to_decimal, \
    format_latitude_decimal
from import_old_camp.utils.db_helpers import get_sp_id, get_haul_id, get_ship, get_catch_id, \
    species_exists, species_not_exists_in_db, get_sex_id
from import_old_camp.utils.utils import get_file_dbf, get_type_survey, get_unit_name
from newcamp.apps import empty
from species.models import Sp, MeasurementType
from stations.models import Station
from strata.models import Stratum
from stratifications.models import Stratification
from gears.models import Trawl, CTD
from surveys.models import Survey
from samplers.models import Sampler
from samples.models import Length, SampledWeight, Sex

from abc import ABC, abstractmethod
from typing import List, Optional, Any


class BaseImport(ABC):
    """Base class for all import operations with common functionality."""

    def __init__(self, request: Any, file_type: str = None):
        """
        Initialize base import class.
        :param request: Django request object
        :param survey_name: Optional survey name
        """
        self.request = request
        self.survey_name = get_survey_name(request.FILES[file_type].name)
        self.messages: List[str] = []
        self.errors: List[str] = []

    def add_message(self, message: str) -> None:
        """Add a success message."""
        self.messages.append(message)

    def add_error(self, error: str) -> None:
        """Add an error message."""
        self.errors.append(error)

    def has_errors(self) -> bool:
        """Check if there are any errors."""
        return len(self.errors) > 0

    def get_response(self) -> HttpResponse:
        """
        Generate HTTP response based on messages and errors.
        :return: HttpResponse with appropriate status
        """
        if self.has_errors():
            response_data = {
                'errors': self.errors,
                'messages': self.messages
            }
            return HttpResponse(response_data, status=HTTP_400_BAD_REQUEST)
        else:
            return HttpResponse(self.messages, status=HTTP_201_CREATED)

    def get_survey_object(self, survey_name: Optional[str] = None):
        """
        Get survey object by name.
        :param survey_name: Survey name (uses self.survey_name if not provided)
        :return: Survey object or None if not found
        """
        from surveys.models import Survey
        from django.core.exceptions import ObjectDoesNotExist

        name = survey_name or self.survey_name
        if not name:
            self.add_error("Survey name is required")
            return None

        try:
            return Survey.objects.get(acronym=name)
        except ObjectDoesNotExist:
            self.add_error(f"Survey with acronym '{name}' does not exist")
            return None

    @abstractmethod
    def format_table(self, data) -> Any:
        """
        Abstract method to format data table.
        Must be implemented by subclasses.
        :param data: Input data to format
        :return: Formatted data
        """
        pass

    @abstractmethod
    def import_data(self) -> HttpResponse:
        """
        Abstract method to perform the import operation.
        Must be implemented by subclasses.
        :return: HttpResponse
        """
        pass


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

        catches_file = self.faunas

        # Create your engine.
        engine = create_engine('sqlite:///db.sqlite3', echo=True)

        # Cant' check if there aren't already saved, because in the format_catch_table are selected the
        # catches which aren't saved yet because they don't had been measured
        catches_table = self.format_table(catches_file)
        catches_table.to_sql("catches_catch", con=engine, if_exists="append", index=False)

        return HttpResponse(self.messages, status=HTTP_201_CREATED)


class SpeciesImport(BaseImport):
    """Import class for species data."""

    def __init__(self, request):
        super().__init__(request)  # Call parent constructor

        self.species_file = get_file_dbf(request, "species")
        self.fields_species = {
            "group": "GRUPO",
            "sp_code": "ESP",
            "sp_name": "ESPECIE",
            "spanish_name": "NOMBREE",
            "a_param": "A",
            "b_param": "B",
            "unit": "MED",
            "increment": "INCREM",
            "APHIA": "APHIA",
        }

    def format_table(self, file):
        """
        Format species table - implementation of abstract method.
        :param file: Input file data
        :return: Formatted DataFrame
        """

        species_df = file.copy()

        try:
            # Select variables
            species_df = species_df[list(self.fields_species.values())]

            # Change variable names
            species_df.columns = self.fields_species.keys()

            # Add default columns
            species_df['comment'] = ""
            species_df['measurement_type_id'] = ""

            self.add_message("Species table formatted successfully")

            return species_df
        except KeyError as e:
            self.add_error("Error formatting species table: {}".format(e))
            return None
        except Exception as e:
            self.add_error("Error formatting species table: {}".format(e))
            return None

    @staticmethod
    def get_measurement_type(row):
        """
        Get the measurement type id. Used in pandas apply function.
        :param row: row of the apply function
        :return: Measurement type id.
        """
        unit_name = get_unit_name(row['unit'], row['increment'])

        try:
            measurement_type = MeasurementType.objects.get(name=unit_name)
            return measurement_type.id
        except ObjectDoesNotExist:
            raise ValueError(f"MeasurementType object with name {unit_name} does not exist")

    def import_data(self) -> HttpResponse:
        """
        Import species data - implementation of abstract method.
        If the species_sp table is already filled, overwrite it.
        :return: HttpResponse
        """

        try:
            # Create your engine.
            engine = create_engine('sqlite:///db.sqlite3', echo=True)

            # species
            species_table = self.format_table(self.species_file)

            if species_table is None:
                return self.get_response()

            # Apply measurement type
            species_table['measurement_type_id'] = species_table.apply(self.get_measurement_type, axis=1)
            species_table = species_table.drop(columns=['unit', 'increment'], axis=1)

            # Save to database
            # Previously use the argument if_exists="replace" to avoid partial saving of new species files.
            # But in this way, the primary key is not generated (to_sql not allow it) and change the original
            # structure without primary key.
            # At the end, I use if_exists="append" to maintain the original primary key.
            species_table.to_sql("species_sp", con=engine, if_exists="append", index="id")
            self.add_message(f"Successfully imported {len(species_table)} species records")
        except Exception as e:
            self.add_error(f"Error importing species: {e}")

        return self.get_response()


class SurveysImport(BaseImport):
    # Call parent constructor
    def __init__(self, request):
        super().__init__(request, "camp")
        self.survey_file = get_file_dbf(request, "camp")

    def format_table(self, file) -> Any:
        pass

    def import_data(self):
        """
        Function to import the file with survey info.
        :return: Http Response
        """

        stratification_name = get_type_survey(self.request.FILES["camp"].name) + "-sector-profundidad"

        stratification_id = Stratification.objects.get(stratification=stratification_name).id

        if Survey.objects.filter(acronym=self.survey_file['CLAV']).exists():
            return HttpResponse(
                '<p>The survey ' + str(self.survey_file['CLAV']) + ' already exists in newCamp.</p>',
                status=300)

        # save survey model
        tmp = Survey()
        tmp.acronym = self.survey_file['CLAV'][0]
        tmp.description = self.survey_file['IDENT'][0]
        tmp.width_x = self.survey_file['CUX'][0]
        tmp.width_y = self.survey_file['CUY'][0]
        tmp.origin_x = self.survey_file['OCUX'][0]
        tmp.origin_y = self.survey_file['OCUY'][0]
        tmp.ship = get_ship(self.survey_file['BARCO'][0])
        tmp.hauls_duration = self.survey_file['DURLAN'][0]
        if tmp.start_date is not None: tmp.start_date = datetime.strptime(fix_year_date(self.survey_file['COMI'][0]),
                                                                          '%d/%m/%y').date()
        if tmp.end_date is not None: tmp.end_date = datetime.strptime(fix_year_date(self.survey_file['FINA'][0]),
                                                                      '%d/%m/%y').date()
        tmp.stratification_id = stratification_id

        tmp.save()

        message = "<p>The survey " + self.survey_file['CLAV'] + ' has been saved.</p>'
        return HttpResponse(message, status=HTTP_201_CREATED)


class HaulsImport:

    def __init__(self, request):
        self.request = request
        self.message = []
        self.sectors_col_names = [1, 2, 3, 4, 5]
        self.sectors_names = ["MIÑO-FINISTERRE", "FINISTERRE-ESTA", "ESTACA-PEÑAS", "PEÑAS-AJO", "AJO-BIDASOA"]
        # dept_col_names "D" and "E" doesn't have data so the depths_names of them are "without depth 1" and "without
        # depth 2"
        self.depth_col_names = ["A", "B", "C", "D", "E"]
        self.depths_names = ["70-120", "120-200", "200-500", "without depth 1", "without depth 2"]
        self.survey_name = get_survey_name(self.request.FILES['lance'].name)
        self.survey_object = Survey.objects.get(acronym=self.survey_name)
        self.sampler_object = get_create_sampler_object(sampler_name="ARRASTRE")
        self.stratification_name = get_type_survey(self.request.FILES['camp'].name) + "-sector-profundidad"
        self.stratification_object = Stratification.objects.get(stratification=self.stratification_name)

        # TODO: the valid field now must be fill the "valid" of the newCamp database and
        # the field "special". The field "special" is a boolean field which indicates if
        # the haul is special or not.

        self.fields_haul = {
            "haul": "LANCE",
            # "gear": "ARTE",
            "valid": "VALIDEZ",
        }
        self.fields_meteorology = {
            "wind_direction": "DIR_VIENTO",
            "wind_velocity": "VEL_VIENTO",
            "sea_state": "EST_MAR",
        }
        self.fields_trawl = {
            "shooting_date_time": "HORA_L",
            "shooting_latitude": "LATITUD_L",
            "shooting_longitude": "LONGITUD_L",
            "shooting_depth": "PROF_L",
            "hauling_date_time": "HORA_V",
            "hauling_latitude": "LATITUD_V",
            "hauling_longitude": "LONGITUD_V",
            "hauling_depth": "PROF_V",
            "course": "RUMBO",
            "velocity": "VELOCIDAD",
            "cable": "CABLE",
            "sweep": "MALLETAS",
            "otter_boards_distance": "DISTA_P",
            "horizontal_aperture": "ABERT_H",
            "vertical_aperture": "ABERT_V",
            # "grid": "CUADRICULA",
            "track": "RECORRIDO",
            "comment": "OBSERV",
        }

    def get_stratum_name(self, row_sector, row_stratum):
        if row_sector == "" or row_sector is None or row_stratum == "" or row_stratum is None:
            return None

        sector_name = self.sectors_names[int(row_sector) - 1]
        depth_index = self.depth_col_names.index(row_stratum)
        depth_name = self.depths_names[depth_index]

        stratum_name = sector_name + "-" + depth_name
        return stratum_name

    def get_trawl_gear_id(self, row):
        """
        Get the gear id. Used in pandas apply function.
        :param row: row of the apply function
        :return: gear id
        """
        try:
            trawl_gear = Trawl.objects.get(name=row["ARTE"])
            return trawl_gear.id
        except Trawl.DoesNotExist:
            print("The trawl " + str(row["ARTE"]) + " does not exists in Trawl table.")

    def get_stratum_id(self, row):
        """
        Get the stratum id. Used in pandas apply function.
        :param row: row of the apply function.
        :return: stratum id.
        """

        # There are some stratum which does not have areas, so I don't save it stratum database
        stratum = self.get_stratum_name(row["SECTOR"], row["ESTRATO"])

        if stratum is not None:
            stratum_object = Stratum.objects.get(stratum=stratum,
                                                 stratification=self.stratification_object)
        else:
            stratum_object = Stratum.objects.get(stratum="not_assigned",
                                                 stratification=self.stratification_object)
        return stratum_object.id

    def get_station_id_or_create(self, row):
        """
        Get the station id. Used in pandas apply function.
        :param row: row of the apply function.
        :return: Station id.
        """

        # add station data
        # temporally, in all demersales surveys, the station is the same as the haul
        if not Station.objects.filter(station=row['LANCE'], survey__acronym=self.survey_name).exists():
            station_new = Station()
            station_new.station = row['LANCE']
            station_new.sampler = self.sampler_object
            station_new.survey = self.survey_object
            station_new.save()

        station_object = get_object_or_404(Station, station=row['LANCE'], survey__acronym=self.survey_name)
        return station_object.id

    def format_haul_table(self, file):
        """
        Format table to save in database with to_sql function of pandas.
        Remove useless variables and add station_id and stratum_id.
        :param file: file hauls in pandas data frame
        :return: pandas data frame formatted
        """

        hauls_table = file

        hauls_table.loc[:, 'station_id'] = hauls_table.apply(self.get_station_id_or_create, axis=1)

        hauls_table.loc[:, 'stratum_id'] = hauls_table.apply(self.get_stratum_id, axis=1)

        hauls_table.loc[:, 'sampler_id'] = self.sampler_object.id

        # hauls_table.loc[:, 'gear_id'] = hauls_table.apply(self.get_trawl_gear_id, axis=1)
        hauls_table.loc[:, 'trawl_id'] = hauls_table.apply(self.get_trawl_gear_id, axis=1)

        hauls_table.loc[:, 'sampler_type'] = "trawl"

        validez = hauls_table['VALIDEZ'].apply(lambda x: True if x == 1 or x == 2 else False)
        hauls_table.loc[:, 'valid'] = validez

        special = hauls_table['VALIDEZ'].apply(lambda x: True if x == 2 else False)
        hauls_table.loc[:, 'special'] = special

        fields = list(self.fields_haul.values())
        fields.extend(['station_id', 'stratum_id', 'sampler_id', 'trawl_id', 'sampler_type', 'valid', 'special'])

        hauls_table = file[fields]

        new_fields = list(self.fields_haul.keys())
        new_fields.extend(['station_id', 'stratum_id', 'sampler_id', 'trawl_id', 'sampler_type', 'valid', 'special'])

        hauls_table.columns = new_fields

        # the empty values must be saved as Na, so:
        hauls_table = hauls_table.replace('', pd.NA)

        return hauls_table

    def format_haul_meteorology_table(self, file):
        """
        Format table to save in database with to_sql function of pandas.
        Remove useless variables and add station_id and stratum_id.
        :param file: file hauls in pandas data frame
        :return: pandas data frame formatted
        """
        meteo_table = file

        meteo_table.loc[:, 'haul_id'] = meteo_table.apply(get_haul_id, axis=1, args=[self.survey_name])

        fields = list(self.fields_meteorology.values())

        fields.extend(['haul_id'])

        meteo_table = file[fields]

        new_fields = list(self.fields_meteorology.keys())

        new_fields.extend(['haul_id'])

        meteo_table.columns = new_fields

        # the empty values must be saved as Na, so:
        meteo_table = meteo_table.replace('', pd.NA)

        def convert_wind_velocity(row):
            if not pd.isna(row['wind_velocity']):
                # Check if it's a string before using replace
                if isinstance(row['wind_velocity'], str):
                    return float(row['wind_velocity'].replace(',', '.'))
                else:
                    # If it's already a float, return it as is
                    return float(row['wind_velocity'])
            return None

        meteo_table["wind_velocity"] = meteo_table.apply(convert_wind_velocity, axis=1)

        return meteo_table

    def format_haul_trawl_table(self, file):
        """
        Format table to save in database with to_sql function of pandas.
        Remove useless variables and add station_id and stratum_id.
        :param file: file hauls in pandas data frame
        :return: pandas data frame formatted
        """
        trawl_table = file

        # add haul_id variable
        trawl_table.loc[:, 'haul_id'] = trawl_table.apply(get_haul_id, axis=1, args=[self.survey_name])

        def fix_year_and_convert_date(date_val):
            if pd.isna(date_val):
                return pd.NaT

            date_str = str(date_val).strip()

            try:
                dt = pd.to_datetime(date_str)

                if 1900 <= dt.year <= 1999:
                    new_year = dt.year + 100
                    if new_year > 2000:
                        dt = dt.replace(year=new_year)

                return dt
            except:
                return pd.NaT

        trawl_table["FECHA"] = trawl_table["FECHA"].apply(fix_year_and_convert_date)

        if trawl_table["FECHA"].dtype == 'object':
            trawl_table["FECHA"] = pd.to_datetime(trawl_table["FECHA"])

        # Convert HORA_L from "HH.MM" format to timedelta
        def parse_time_to_timedelta(time_str):
            if pd.isna(time_str):
                return pd.Timedelta(0)

            time_str = str(time_str).strip()
            # Split by dot and convert to hours:minutes format
            if '.' in time_str:
                hours, minutes = time_str.split('.')
                return pd.Timedelta(hours=int(hours), minutes=int(minutes))
            return pd.Timedelta(0)

        # Convert time strings to timedelta
        trawl_table["time_shooting"] = trawl_table["HORA_L"].apply(parse_time_to_timedelta)
        trawl_table["time_hauling"] = trawl_table["HORA_V"].apply(parse_time_to_timedelta)

        # Add timedelta to datetime
        trawl_table['shooting_date_time'] = trawl_table["FECHA"] + trawl_table["time_shooting"]
        trawl_table['hauling_date_time'] = trawl_table["FECHA"] + trawl_table["time_hauling"]

        # format some variables
        def convert_velocity(row):
            if isinstance(row['VELOCIDAD'], str):
                return float(row['VELOCIDAD'].replace(',', '.'))
            else:
                # If it's already a float, return it as is
                return float(row['VELOCIDAD'])

        trawl_table["velocity"] = trawl_table.apply(convert_velocity, axis=1)

        # format coordinates
        def format_latitude_decimal(row, coor_var, cardinal_var, cardinal_value):
            """
            Change the format of latitude by LATITUD var and cardinal points var. To use in apply.
            :param row: row of apply.
            :param coor_var: coordinate variable.
            :param cardinal_var: variable which contain the cardinal point of the coordinates (NSL, NSV, EWL, EWV)
            :param cardinal_value: cardinal value (string) which indicates if the coordinates are negatives.
            :return: coordinate converted.
            """
            row[coor_var] = convert_position_camp_to_decimal(row[coor_var])
            if row[cardinal_var] == cardinal_value:
                row[coor_var] = (-1) * row[coor_var]
            return round(row[coor_var], 4)

        trawl_table['shooting_latitude'] = trawl_table.apply(format_latitude_decimal, axis=1,
                                                             args=["LATITUD_L", "NSL", "S"])
        trawl_table['shooting_longitude'] = trawl_table.apply(format_latitude_decimal, axis=1,
                                                              args=["LONGITUD_L", "EWL", "W"])
        trawl_table['hauling_latitude'] = trawl_table.apply(format_latitude_decimal, axis=1,
                                                            args=["LATITUD_V", "NSV", "S"])
        trawl_table['hauling_longitude'] = trawl_table.apply(format_latitude_decimal, axis=1,
                                                             args=["LONGITUD_V", "EWV", "W"])

        # select variables to export

        fields = list(self.fields_trawl.values())

        fields.extend(['haul_id', 'shooting_date_time', 'hauling_date_time', 'shooting_latitude', 'shooting_longitude',
                       'hauling_latitude', 'hauling_longitude', 'velocity'])

        trawl_table = trawl_table[fields]

        new_fields = list(self.fields_trawl.keys())

        new_fields.extend(
            ['haul_id', 'shooting_date_time', 'hauling_date_time', 'shooting_latitude', 'shooting_longitude',
             'hauling_latitude', 'hauling_longitude', 'velocity'])

        trawl_table.columns = new_fields

        # the empty values must be saved as Na, so:
        trawl_table = trawl_table.replace('', pd.NA)

        # return table formatted
        return trawl_table

    def import_hauls_csv(self):
        """
        Import csv file with trips data.
        The hauls file to import from old Camp is saved in two different models: one with generic characteristics and
        other with the specific characteristics ot trawl.
        :return:
        """

        hauls_file = get_file_dbf(self.request, "lance")

        # Create your engine.
        engine = create_engine('sqlite:///db.sqlite3', echo=True)

        # check there aren't already saved
        if Haul.objects.filter(station__survey=self.survey_object).exists() or Meteorology.objects.filter(
                haul_id__station__survey=self.survey_object).exists() or HaulTrawl.objects.filter(
            haul_id__station__survey=self.survey_object).exists():
            self.message.append("<p>Hauls of this survey already saved in database. Remove all of them before try to "
                                "import it again. None of the hauls has been saved.</p>")
            return HttpResponse(self.message, status=HTTP_409_CONFLICT)
        else:
            # haul
            hauls_table = self.format_haul_table(hauls_file)
            hauls_table.to_sql("hauls_haul", con=engine, if_exists="append", index=False)

            # meteorology
            meteo_table = self.format_haul_meteorology_table(hauls_file)
            meteo_table.to_sql("hauls_meteorology", con=engine, if_exists="append", index=False)

            # trawl
            trawl_table = self.format_haul_trawl_table(hauls_file)
            trawl_table.to_sql("hauls_haultrawl", con=engine, if_exists="append", index=False)

            return HttpResponse(self.message, status=HTTP_201_CREATED)


class NtallImport:

    def __init__(self, request):
        self.request = request
        self.messages = []
        self.sampler_object = get_create_sampler_object(sampler_name='ARRASTRE')
        self.survey_name = get_survey_name(self.request.FILES['ntall'].name)
        self.survey_object = Survey.objects.get(acronym=self.survey_name)
        self.ntall = get_file_dbf(request, "ntall")
        self.fields_sexes = {
            'sex': "SEXO",
        }
        self.fields_lengths = {
            'length': 'TALLA',
            'number_individuals': 'NUMER',
        }
        self.fields_sampled_weight = {
            'sampled_weight': 'PESO_M',
        }

    @staticmethod
    def get_sp_unit(row):
        """
        Get the species unit. Used in pandas apply function.
        :param row: row of the apply function
        :return: Species unit
        """
        sp = Sp.objects.get(group=row['GRUPO'], sp_code=row['ESP'])
        return sp.unit

    @staticmethod
    def get_measurement_factor(row):
        """
        Get the measurement factor of the species. Used in pandas apply function.
        :param row: row of the apply function
        :return: Measurement factor
        """
        sp = Sp.objects.get(group=row['GRUPO'], sp_code=row['ESP'])
        return sp.measurement_type.conversion_factor

    @staticmethod
    def get_measurement_type(grupo, esp):
        """
        Get the measurement type id. Used in pandas apply function.
        :param row: row of the apply function
        :return: Measurement type id.
        """
        sp = Sp.objects.get(group=grupo, sp_code=esp)
        try:
            measurement_type = sp.measurement_type
            return measurement_type.id
        except ObjectDoesNotExist:
            raise ValueError("MeasurementType object with measurement_type {} does not exist".format(measurement_type))

    def transform_length(self, row):
        """
        Fix the lengths of the species. Used in pandas apply function.
        If the unit is 1 (cm), the length is multiplied by 10. If the unit is 2 (mm), the length is not modified. If the
        unit is different, the length is not modified because it is assumed
        to be stored as mm.
        :param row: row of the apply function
        :return: Fixed lengths
        """

        measurement_factor = self.get_measurement_factor(row)

        return row['TALLA'] * measurement_factor

        # unit = self.get_sp_unit(row)
        #
        # if unit == 1:
        #     return row['TALLA'] * 10
        #
        # if unit == 2:
        #     return row['TALLA']
        #
        # if unit != 1 and unit != 2:
        #     return row['TALLA']

    def format_sexes_table(self, file):
        lengths_table = self.ntall

        # get the catch grouped
        sexed_table = lengths_table[['LANCE', 'GRUPO', 'ESP', 'CATE', 'SEXO']].drop_duplicates()
        sexed_table['catch_id'] = sexed_table.apply(get_catch_id, axis=1, args=[self.survey_name])
        sexed_table['measurement_type_id'] = sexed_table.apply(
            lambda row: self.get_measurement_type(row["GRUPO"], row["ESP"]), axis=1)

        fields = list(self.fields_sexes.values())
        fields.extend(['catch_id'])
        fields.extend(['measurement_type_id'])

        sexed_table = sexed_table[fields]

        new_fields = list(self.fields_sexes.keys())
        new_fields.extend(['catch_id'])
        new_fields.extend(['measurement_type_id'])

        sexed_table.columns = new_fields

        return sexed_table

    def format_lengths_table(self, file):

        lengths_table = self.ntall

        # lengths

        lengths_df = lengths_table[['LANCE', 'GRUPO', 'ESP', 'CATE', 'SEXO']].drop_duplicates()
        lengths_df['catch_id'] = lengths_df.apply(get_catch_id, axis=1, args=[self.survey_name])
        lengths_df['sex_id'] = lengths_df.apply(get_sex_id, axis=1)

        # merge
        lengths_df = pd.merge(left=lengths_table, right=lengths_df, how='left',
                              on=['LANCE', 'GRUPO', 'ESP', 'CATE', 'SEXO'])

        lengths_df['TALLA'] = lengths_df.apply(self.transform_length, axis=1)
        # duplicated = lengths_df[['sex_id', 'TALLA', 'NUMER']].duplicated()
        # lengths_df_duplicted = lengths_df[duplicated]
        fields = list(self.fields_lengths.values())
        fields.extend(['sex_id'])

        lengths_df = lengths_df[fields]

        new_fields = list(self.fields_lengths.keys())
        new_fields.extend(['sex_id'])

        lengths_df.columns = new_fields

        return lengths_df

    def format_catch_table(self, file):

        catches_table = file

        catches_table = catches_table[['LANCE', 'GRUPO', 'ESP', 'CATE', 'SEXO', 'PESO_GR']].drop_duplicates()

        if species_exists(file):
            catches_table['sp_id'] = catches_table.apply(get_sp_id, axis=1)
            catches_table['category'] = catches_table['CATE']
            catches_table['haul_id'] = catches_table.apply(get_haul_id, axis=1, args=[self.survey_name])
            catches_table['weight'] = catches_table['PESO_GR']

            catches_table = catches_table[['sp_id', 'category', 'haul_id', 'weight']]
            catches_table = catches_table.drop_duplicates()

            return catches_table
        else:
            not_exists = species_not_exists_in_db(file)
            raise TypeError(
                ["The next species are not previously saved in species master. Add it before import file again:",
                 not_exists])

    def format_sampled_weight_table(self, file):
        sw_table = file

        sw_table = sw_table[['LANCE', 'GRUPO', 'ESP', 'CATE', 'PESO_GR', 'PESO_M']].drop_duplicates()
        sw_table = sw_table[sw_table['PESO_GR'] != sw_table['PESO_M']]
        if species_exists(file):
            sw_table['catch_id'] = sw_table.apply(get_catch_id, axis=1, args=[self.survey_name])
            sw_table['sampled_weight'] = sw_table['PESO_M']
            sw_table = sw_table[['catch_id', 'sampled_weight']]
            return sw_table
        else:
            not_exists = species_not_exists_in_db(file)
            raise TypeError(
                ["The next species are not previously saved in species master. Add it before import file again:",
                 not_exists])

    def import_ntall_csv(self):

        lengths_file = self.ntall

        # check if all species exists
        if not species_exists(lengths_file):
            not_exists = species_not_exists_in_db(lengths_file)
            raise TypeError(
                [
                    "The next species are not previously saved in species master. Add it before import lengtsh file "
                    "again:",
                    not_exists])

        # create categories if it doesn't exist in species_category
        # check_or_create_categories(lengths_file)

        # Create engine.
        engine = create_engine('sqlite:///db.sqlite3', echo=True)

        # catches
        # check there aren't already saved catches of the survey
        if Catch.objects.filter(haul_id__station_id__survey_id__acronym=self.survey_name):
            self.messages.append(
                "<p>Catches of this survey already saved in database. Remove all the catches of this "
                "survey before try to import it again. None of the catches has been saved.</p>")
        else:
            catches_table = self.format_catch_table(lengths_file)
            catches_table.to_sql("catches_catch", con=engine, if_exists="append", index=False)

        # sampled weight
        # check there aren't already saved lengths of the survey
        if SampledWeight.objects.filter(catch_id__haul_id__station_id__survey_id__acronym=self.survey_name):
            self.messages.append(
                "<p>Sampled Weights of this survey already saved in database. Remove all the sampled weights"
                "of this survey before try to import it again. None of the sampled weights has been saved.</p>")
        else:
            sampled_weight_table = self.format_sampled_weight_table(lengths_file)
            sampled_weight_table.to_sql("samples_sampledweight", con=engine, if_exists="append", index=False)

        # sexes
        # check there aren't already saved sexes of the survey
        if Sex.objects.filter(catch_id__haul_id__station_id__survey_id__acronym=self.survey_name):
            self.messages.append(
                "<p>Sexes of this survey already saved in database. Remove all the sexes of this "
                "survey before try to import it again. None of the sexes has been saved.</p>")
        else:
            sexes_table = self.format_sexes_table(lengths_file)
            sexes_table.to_sql("samples_sex", con=engine, if_exists="append", index=False)

        # lengths
        # check there aren't already saved lengths of the survey
        if Length.objects.filter(sex_id__catch_id__haul_id__station_id__survey_id__acronym=self.survey_name):
            self.messages.append(
                "<p>Lengths of this survey already saved in database. Remove all the lengths of this "
                "survey before try to import it again. None of the lengths has been saved.</p>")
        else:
            lengths_table = self.format_lengths_table(lengths_file)
            lengths_table.to_sql("samples_length", con=engine, if_exists="append", index=False)

        return HttpResponse(self.messages, status=HTTP_201_CREATED)


class HydrographiesImport:

    def __init__(self, request):
        self.request = request
        self.survey_name = get_survey_name(self.request.FILES['hidro'].name)
        self.survey_object = Survey.objects.get(acronym=self.survey_name)
        self.hydrographies = get_file_dbf(request, "hidro")
        self.fields_hydrography = {
            "latitude": "LATITUD",
            "longitude": "LONGITUD",
            "date_time": "FECHA",
            "depth_probe": "SONDA",
            "cable": "CABLE",
            "depth": "PROF",
            "temperature_0": "TEMP0",
            "salinity_0": "SALI0",
            "sigma_0": "SIGMA0",
            "temperature_50": "TEMP50",
            "salinity_50": "SALI50",
            "sigma_50": "SIGMA50",
            "temperature_100": "TEMP100",
            "salinity_100": "SALI100",
            "sigma_100": "SIGMA100",
            "temperature": "TEMP",
            "salinity": "SALI",
            "sigma": "SIGMA",
            "comment": "OBSERV",
        }
        self.sampler_object = get_create_sampler_object("CTD")
        self.message = []

    def format_hydrography_table(self, hydrography_df):

        hydrography_df['latitude'] = hydrography_df["LATITUD"].apply(convert_position_camp_to_decimal)

        hydrography_df['longitude'] = hydrography_df["LONGITUD"].apply(convert_position_camp_to_decimal)

        hydrography_df['latitude'] = hydrography_df.apply(format_latitude_decimal, axis=1,
                                                          args=["LATITUD", "NOSU", "S"])

        hydrography_df['longitude'] = hydrography_df.apply(format_latitude_decimal, axis=1,
                                                           args=["LONGITUD", "NOSU", "W"])

        hydrography_df = hydrography_df.drop(['LATITUD', 'LONGITUD', 'NOSU'], axis=1)

        def unit_date_time(row, date_field, time_field):
            return datetime.strptime(str(row[date_field]) + " " + str(row[time_field]), '%Y-%m-%d %H.%M')

        hydrography_df['date_time'] = hydrography_df.apply(unit_date_time, axis=1, args=["FECHA", "HORA"])

        hydrography_df = hydrography_df.drop(['FECHA', 'HORA'], axis=1)

        # Create a reverse mapping from values to keys
        column_mapping = {value: key for key, value in self.fields_hydrography.items()}

        # Rename columns using the mapping (columns not in mapping will remain unchanged)
        hydrography_df = hydrography_df.rename(columns=column_mapping)

        return hydrography_df

    def import_hydrographies(self):
        """
        Function to import the CSV file with hydrography data.
        :return:
        """
        hydrographies_df = self.format_hydrography_table(self.hydrographies)

        # check there aren't already saved hydrographies of the survey
        if HaulHydrography.objects.filter(haul_id__station_id__survey_id__acronym=self.survey_name):
            self.message.append(
                "<p>hydrographies of this survey already saved in database. Remove all the hydrographies of this "
                "survey before try to import it again. None of the hydrographies has been saved.</p>")
        else:
            # station
            # The station of hydrography haul is the station of the trawl haul (which is stored in the 'haul' field
            # of hydrography file), so firstly we identify it:
            sampler_object = Sampler.objects.get(sampler="CTD")

            # gear
            # By default we use the same gear for all the hydrography hauls
            ctd_object, created = CTD.objects.get_or_create(name="1", brand="default brand", model="default model")

            def createHydroStation(row):
                station_object, created = Station.objects.get_or_create(
                    station=row['LANCE'],
                    survey=self.survey_object,
                )
                row['station'] = station_object
                return row

            def createHydroHaul(row, sampler_object, ctd_object):
                haul_object, created = Haul.objects.get_or_create(
                    haul=row['ESTN'],
                    sampler=sampler_object,
                    station=row['station'],
                    ctd=ctd_object,
                    sampler_type="CTD",
                )
                row['haul_id'] = haul_object.id
                return row

            hydrographies_df = hydrographies_df.apply(createHydroStation, axis=1)
            hydrographies_df = hydrographies_df.apply(createHydroHaul, axis=1, args=[sampler_object, ctd_object])

            columns = list(self.fields_hydrography.keys()) + ['haul_id']
            hydrographies_df = hydrographies_df[columns]

            # the empty values must be saved as Na, so:
            hydrographies_df = hydrographies_df.replace('', pd.NA)

            engine = create_engine('sqlite:///db.sqlite3', echo=True)
            hydrographies_df.to_sql("hauls_haulhydrography", con=engine, if_exists="append", index=False)

        return HttpResponse(self.message, status=HTTP_201_CREATED)


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

        # hauls = HaulsImport(self.request)
        # hauls_import = hauls.import_hauls_csv()

        # Is mandatory that NTALL will be imported before FAUNA file
        # ntall = NtallImport(self.request)
        # ntall_import = ntall.import_ntall_csv()

        # The catches table is filled first in the import of NTALL file. In this import only the
        # species measured has been saved. With the FAUNA file, only of species which haven't been
        # measured must be stored because it is used to_sql from pandas library.
        # faunas = FaunasImport(self.request)
        # faunas_import = faunas.import_data()

        # hydro = HydrographiesImport(self.request)
        # hydrography_import = hydro.import_hydrographies()

        return HttpResponse([stratification.content,
                             stratum.content,
                             survey_import.content,
                             # hauls_import.content,
                             # ntall_import.content,
                             # faunas_import.content,
                             # hydrography_import.content
                             ])

    def import_species(self):
        species = SpeciesImport(self.request)
        species_import = species.import_data()

        response = [species_import.content]

        return HttpResponse(response)

    def import_hydrographies(self):
        hydro = HydrographiesImport(self.request)
        hydrography_import = hydro.import_hydrographies()

        response = [hydrography_import.content]

        return HttpResponse(response)
