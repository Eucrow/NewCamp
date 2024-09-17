import csv

import io

import pandas as pd

import re

from sqlalchemy import create_engine

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist

from datetime import datetime

from rest_framework.status import HTTP_201_CREATED, HTTP_409_CONFLICT

from catches.models import Catch
from hauls.models import Haul, HaulTrawl, HaulHydrography, Meteorology
from hauls.serializers import ImportHydrographyesSerializer
from newcamp.apps import convert_comma_to_dot, empty
from species.models import Sp, MeasurementType
from stations.models import Station
from strata.models import Stratum
from stratifications.models import Stratification
from gears.models import Trawl, CTD
from surveys.models import Survey
from samplers.models import Sampler
from samples.models import Length, SampledWeight, Sex
from hauls.utils import get_survey_name, get_sampler_object_and_create


def get_type_survey(filename):
    """
    Get the type of survey (Demersales or Porcupine) from a filename with the format CAMP???.csv,
    where ??? is D or P followed by two digits.
    If the first ? is other character, return "Unknown"
    :param filename: String with the filename.
    :return: "Demersales", "Porcupine" or "Unknown".
    """
    type_survey = filename[4:5]
    if type_survey == "N":
        return "Demersales"
    elif type_survey == "P":
        return "Porcupine"
    else:
        return "Unknown"


def convert_str_float(s):
    try:
        return float(s.replace(',', '.'))
    except ValueError:
        return ""


def convert_position_camp_to_decimal(value_camp):
    """
    Convert the incorrect coordinates saved in old camp to decimal coordinates
    The old camp save the coordinates in 43.1428, where 43 are degrees and 1428
    are 14.28 minutes
    :param value_camp: coordinate to transform
    :return: decimal coordinates
    """
    splitted = str(value_camp).split('.')
    degree = int(splitted[0])
    minute = int(splitted[1]) / 6000
    decimal = degree + minute
    decimal = round(decimal, 4)
    return decimal


def fix_year_date(d):
    """
    In case of a date have four digits in year, remove century digits to avoid
    save data as 1900 years. For example, convert 1/1/1919 to 1/1/19.
    :param d: date to fix as string
    :return: date fixed as string
    """

    if re.search(r'\/.{4}$', d):
        r = d[:len(d) - 4] + d[len(d) - 2:len(d)]
        return r
    else:
        return d


def species_exists(file):
    """
    Check if all the species of file are stored in database.
    :param file: File with columns 'GRUPO' and 'ESP' to check.
    :return: True if all the species are stored, False if doesn't.
    """

    uniques_sp = file[['GRUPO', 'ESP']].drop_duplicates()

    def sp_exists(row):
        return Sp.objects.filter(group=row['GRUPO'], sp_code=row['ESP']).exists()

    uniques_sp['exists'] = uniques_sp.apply(sp_exists, axis=1)

    if uniques_sp['exists'].all():
        return True
    else:
        return False


def species_not_exists_in_db(file):
    """
    Find species wich does not are saved in Species table.
    :param file: File with columns 'GRUPO' and 'ESP' to check.
    :return: Dataframe with species which are not saved in Species table.
    """
    uniques_sp = file[['GRUPO', 'ESP']].drop_duplicates()

    def sp_exists(row_sp):
        return Sp.objects.filter(group=row_sp['GRUPO'], sp_code=row_sp['ESP']).exists()

    uniques_sp['exists'] = uniques_sp.apply(sp_exists, axis=1)

    uniques_sp = uniques_sp[(uniques_sp.exists == False)]

    mes = []

    for index, row in uniques_sp.iterrows():
        mes.append('Gruop: ' + str(row['GRUPO']) + ' Species: ' + str(row['ESP']))

    return mes


def get_sp_id(row):
    """
    Get the species id. Used in pandas apply function.
    :param row: Row of the apply function
    :return: Species id.
    """
    try:
        return Sp.objects.get(group=row['GRUPO'], sp_code=row['ESP']).id
    except ObjectDoesNotExist:
        raise ValueError(
            "Sp object with group " + str(row['GRUPO']) + " and sp_code " + str(row['ESP']) + " does not exists")


# def get_category_id(row):
#     """
#     Get the species id. Used in pandas apply function.
#     :param row: Row of the apply function
#     :return: Species id.
#     """
#     sp_id = get_sp_id(row)
#     cat_id = Category.objects.get(sp_id=sp_id, category_name=row['CATE']).id
#     return cat_id


def get_station_id(row, survey_name):
    """
    Get the station id. Used in pandas apply function.
    :param row: row of the apply function.
    :param survey_name: name of survey.
    :return: Station id.
    """

    # add station data
    # temporaly, in all demersales surveys, the station is the same than the haul
    station_object = get_object_or_404(Station, station=row['LANCE'], survey__acronym=survey_name)
    return station_object.id


def get_haul_id(row, survey_name):
    """
    Get the haul id. Used in pandas apply function.
    :param row: row of the apply function.
    :param survey_name: name of survey.
    :return: Station id.
    """

    sampler_object = get_sampler_object_and_create(sampler_name='ARRASTRE')

    haul_object = Haul.objects.get(haul=row['LANCE'],
                                   station_id=get_station_id(row, survey_name),
                                   sampler_id=sampler_object.id)
    return haul_object.id


def get_catch_id(row, survey_name):
    """
    Get the catch id. Used in pandas apply function.
    :param row: row of the apply function.
    :param survey_name: name of survey.
    :return: Catch id.
    """

    haul_id = get_haul_id(row, survey_name)
    specie = get_sp_id(row)
    category = row['CATE']

    catch_id = Catch.objects.get(haul_id=haul_id, sp_id=specie, category=category).id

    return catch_id


def get_sex_id(row):
    """
    Get the sexes id of catches. Used in pandas apply function.
    :return: Sex id.
    """
    sex_id = Sex.objects.get(catch_id=row['catch_id'], sex=row['SEXO']).id

    return sex_id


def fill_measurement_type():
    """
    Fill the measurement type table with the values of the old camp. Only if the data doesn't exist.
    :return: HttpResponse
    """
    MeasurementType.objects.get_or_create(name="mm", increment=1, conversion_factor=1)
    MeasurementType.objects.get_or_create(name="cm", increment=10, conversion_factor=10)
    MeasurementType.objects.get_or_create(name="1/2cm", increment=5, conversion_factor=10)


def get_unit_name(unit, increment):
    """
    Get the unit name from the code of the species. Used in pandas apply function.
    :param unit: Unit of measurement.
    :param increment: Increment of the measurement.
    :return: Unit of the species.
    """

    if (unit == 1) & (increment == 1):
        return "cm"
    # there are some cases where unit is 1 and the increment is 0, but it shouldn't be, so I set it to cm:
    elif (unit == 1) & (increment == 0):
        return "cm"
    # there are some cases where unit is 1 and the increment is 2, but it shouldn't be, so I set it to cm:
    elif (unit == 1) & (increment == 2):
        return "cm"
    elif (unit == 2) & (increment == 1):
        return "mm"
    elif (unit == 2) & (increment == 5):
        return "1/2cm"
    # there are some cases where unit is 2 and the increment is 0, but it shouldn't be, so I set it to mm:
    elif (unit == 2) & (increment == 0):
        return "mm"
    # there are some cases where unit is 0 and the increment is 1, but it shouldn't be, so I set it to cm:
    elif (unit == 0) & (increment == 1):
        return "cm"


class FaunasImport:

    def __init__(self, request):
        self.request = request
        self.survey_name = get_survey_name(self.request.FILES['fauna'].name)
        self.survey_object = Survey.objects.get(acronym=self.survey_name)
        self.sampler_object = get_sampler_object_and_create(sampler_name="ARRASTRE")
        self.faunas = self.get_file("fauna")
        self.messages = []
        self.errors = []

    def get_file(self, file_key):
        """
        Get file from request in pandas dataframe format
        :param file_key: Key of the request to get
        :return: Pandas dataframe with the content of the file
        """
        new_file = self.request.FILES[file_key]
        return pd.read_csv(new_file, sep=";", decimal=",")

    def format_catch_table(self, file):
        catches_table = file

        # The catches table is filled firstly in the import of NTALL file. In this importation only the
        # species measured has been saved. With the FAUNA file, only species which hasn't been
        # measured must be stored because is used to_sql from pandas library.

        def anti_join(x, y, on):
            """Return rows in x which are not present in y"""
            ans = pd.merge(left=x, right=y, how='left', indicator=True, on=on)
            ans = ans.loc[ans._merge == 'left_only', :]
            return ans

        # previously saved in catches table:
        in_catches = Catch.objects.filter(haul__station__survey=self.survey_object).values()
        in_catches = pd.DataFrame(list(in_catches))
        in_catches = in_catches[['sp_id', 'category', 'haul_id']].drop_duplicates()

        # def get_cat_1_id(row):
        #     sp = Sp.objects.get(group=row['GRUPO'], sp_code=row['ESP'])
        #     cat_id = get_or_create_categories(sp=sp, category_name='1').id
        #     return cat_id

        # catches_table['category_id'] = catches_table.apply(get_cat_1_id, axis=1)
        # The category must be always 1 because only the measured species can have more than
        # one category, an those one are stored previously, when FAUNA file is imported.
        catches_table['category'] = 1
        catches_table['sp_id'] = catches_table.apply(get_sp_id, axis=1)
        catches_table['haul_id'] = catches_table.apply(get_haul_id, axis=1, args=[self.survey_name])
        catches_table['weight'] = catches_table['PESO_GR']

        catches_table = catches_table[['haul_id', 'sp_id', 'category', 'weight']]

        # catches to save = all catches in faunas file - previously saved in catches table
        catches_to_save_table = anti_join(catches_table, in_catches, ['sp_id', 'category', 'haul_id'])

        catches_to_save_table = catches_to_save_table[['sp_id', 'category', 'haul_id', 'weight']]

        return catches_to_save_table

    def import_faunas_csv(self):
        """
        Import csv file with faunas data.
        :return: http response
        """

        # catches_file = self.get_file("fauna")
        catches_file = self.faunas

        # Create your engine.
        engine = create_engine('sqlite:///db.sqlite3', echo=True)

        # Cant' check if there aren't already saved, because in the format_catch_table are selected the
        # catches which aren't saved yet because they don't had been measured
        catches_table = self.format_catch_table(catches_file)
        catches_table.to_sql("catches_catch", con=engine, if_exists="append", index=False)

        return HttpResponse(self.messages, status=HTTP_201_CREATED)


class SpeciesImport:

    def __init__(self, request):
        self.request = request
        self.message = []
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

    fill_measurement_type()

    def get_file(self, file_key):
        """
        Get file from request in pandas dataframe format
        :param file_key: Key of the request to get
        :return: Pandas dataframe with the content of the file
        """
        new_file = self.request.FILES[file_key]
        return pd.read_csv(new_file, sep=";", decimal=",")

    def format_species_table(self, file):
        species_df = file

        # select variables
        species_df = species_df[list(self.fields_species.values())]

        # change variable names
        species_df.columns = self.fields_species.keys()

        species_df['comment'] = ""

        species_df['measurement_type_id'] = ""

        # species_df['id'] = range(0, 0 + len(species_df))

        return species_df

    def get_measurement_type(self, row):
        """
        Get the measurement type id. Used in pandas apply function.
        :param row: row of the apply function
        :return: Measurement type id.
        """
        unit_name = get_unit_name(row['unit'], row['increment'])
        # print(row['unit'], row['increment'])
        try:
            measurement_type = MeasurementType.objects.get(name=unit_name)
            return measurement_type.id
        except ObjectDoesNotExist:
            raise ValueError("MeasurementType object with name {} does not exist".format(unit_name))

    def import_species_csv(self):
        """
        Import csv file with species data.
        If the species_sp table is already filled, overwrite it.
        :return: HttpResponse
        """

        species_file = self.get_file("species")

        # Create your engine.
        engine = create_engine('sqlite:///db.sqlite3', echo=True)

        # species
        species_table = self.format_species_table(species_file)

        species_table['measurement_type_id'] = species_table.apply(self.get_measurement_type, axis=1)
        species_table = species_table.drop(columns=['unit', 'increment'], axis=1)

        # Previously use the argument if_exists="replace" to avoid partial saving of new species files.
        # But in this way, the primary key is not generated (to_sql not allow it) and change the original
        # structure without primary key.
        # At the end, I use if_exists="append" to maintain the original primary key.
        species_table.to_sql("species_sp", con=engine, if_exists="append", index="id")

        return HttpResponse(self.message, status=HTTP_201_CREATED)


class SurveysImport:

    def __init__(self, request):
        self.request = request

    def import_surveys_csv(self):
        """
        Function to import the CSV file with surveys info.
        :return: Http Response
        """
        file_object = self.request.FILES['camp']
        file_object.seek(0)
        survey_file = csv.DictReader(io.StringIO(file_object.read().decode('utf-8')), delimiter=';')

        stratification_name = get_type_survey(file_object.name) + "-sector-profundidad"

        stratification_id = Stratification.objects.get(stratification=stratification_name).id

        surveys_added = []
        message = []

        for row in survey_file:

            if Survey.objects.filter(acronym=row['CLAV']).exists():
                return HttpResponse(
                    '<p>The survey ' + str(row['CLAV']) + ' already exists in newCamp.</p>',
                    status=300)

            # save survey model
            tmp = Survey()
            tmp.acronym = row['CLAV']
            tmp.description = row['IDENT']
            tmp.width_x = row['CUX']
            tmp.width_y = row['CUY']
            tmp.origin_x = convert_comma_to_dot(row['OCUX'])
            tmp.origin_y = convert_comma_to_dot(row['OCUY'])
            tmp.ship = row['BARCO']
            tmp.hauls_duration = row['DURLAN']
            # tmp.area_sampled = row['AREBAR']
            # tmp.unit_sample = row['UNISUP']
            if tmp.start_date is not None: tmp.start_date = datetime.strptime(fix_year_date(row['COMI']),
                                                                              '%d/%m/%y').date()
            if tmp.end_date is not None: tmp.end_date = datetime.strptime(fix_year_date(row['FINA']), '%d/%m/%y').date()
            tmp.stratification_id = stratification_id

            tmp.save()

            surveys_added.append(row['CLAV'])

        message.append("<p>The survey " + ', '.join(surveys_added) + ' has been saved.</p>')
        return HttpResponse(message, status=HTTP_201_CREATED)


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
            stratification=stratification_name,
            comment="In Demersales surveys, the stratification is a combination of geographic sector and depth."
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
    file_object = request.FILES['camp']
    file_object.seek(0)
    survey_file = csv.DictReader(io.StringIO(file_object.read().decode('utf-8')), delimiter=';')

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
        self.sampler_object = get_sampler_object_and_create(sampler_name="ARRASTRE")
        self.stratification_name = get_type_survey(self.request.FILES['camp'].name) + "-sector-profundidad"
        self.stratification_object = Stratification.objects.get(stratification=self.stratification_name)

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
            "grid": "CUADRICULA",
            "track": "RECORRIDO",
            "comment": "OBSERV",
        }

    def get_file(self, file_key):
        """
        Get file from request in pandas dataframe format
        :param file_key: Key of the request to get
        :return: Pandas dataframe with the content of the file
        """
        new_file = self.request.FILES[file_key]
        return pd.read_csv(new_file, sep=";", decimal=",", keep_default_na=False,
                           converters={'DISTA_P': convert_str_float,
                                       'ABERT_H': convert_str_float,
                                       'ABERT_V': convert_str_float})

    def get_stratum_name(self, row_sector, row_stratum):
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
        if row["ESTRATO"] != "":
            stratum = self.get_stratum_name(row["SECTOR"], row["ESTRATO"])
            stratum_object = Stratum.objects.get(stratum=stratum,
                                                 stratification=self.stratification_object)
            return stratum_object.id
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

        fields = list(self.fields_haul.values())
        fields.extend(['station_id', 'stratum_id', 'sampler_id', 'trawl_id', 'sampler_type'])

        hauls_table = file[fields]

        new_fields = list(self.fields_haul.keys())
        new_fields.extend(['station_id', 'stratum_id', 'sampler_id', 'trawl_id', 'sampler_type'])

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
                return float(row['wind_velocity'].replace(',', '.'))

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

        # format some variables
        trawl_table["HORA_L"] = trawl_table["HORA_L"].astype(str)
        trawl_table['shooting_date_time'] = trawl_table[["FECHA", "HORA_L"]].agg(' '.join, axis=1)
        trawl_table['shooting_date_time'] = pd.to_datetime(trawl_table['shooting_date_time'], format='%d/%m/%Y %H.%M')

        trawl_table["HORA_V"] = trawl_table["HORA_V"].astype(str)
        trawl_table['hauling_date_time'] = trawl_table[["FECHA", "HORA_V"]].agg(' '.join, axis=1)
        trawl_table['hauling_date_time'] = pd.to_datetime(trawl_table['hauling_date_time'], format='%d/%m/%Y %H.%M')

        def convert_velocity(row):
            try:
                return float(row['VELOCIDAD'].replace(',', '.'))
            except ValueError:
                return ""

            # if not pd.isna(row['wind_velocity']):
            #     return float(row['wind_velocity'].replace(',', '.'))

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

        trawl_table = file[fields]

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

        hauls_file = self.get_file("lance")

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
        self.sampler_object = get_sampler_object_and_create(sampler_name='ARRASTRE')
        self.survey_name = get_survey_name(self.request.FILES['ntall'].name)
        self.survey_object = Survey.objects.get(acronym=self.survey_name)
        self.ntall = self.get_file("ntall")
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

    def get_file(self, file_key):
        """
        Get file from request in pandas dataframe format
        :param file_key: Key of the request to get
        :return: Pandas dataframe with the content of the file
        """
        new_file = self.request.FILES[file_key]
        return pd.read_csv(new_file, sep=";", decimal=",")

    def get_sp_unit(self, row):
        """
        Get the species unit. Used in pandas apply function.
        :param row: row of the apply function
        :return: Species unit
        """
        sp = Sp.objects.get(group=row['GRUPO'], sp_code=row['ESP'])
        return sp.unit

    def get_measurement_factor(self, row):
        """
        Get the measurement factor of the species. Used in pandas apply function.
        :param row: row of the apply function
        :return: Measurement factor
        """
        sp = Sp.objects.get(group=row['GRUPO'], sp_code=row['ESP'])
        return sp.measurement_type.conversion_factor

    def get_measurement_type(self, grupo, esp):
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
        self.sampler_object = get_sampler_object_and_create("CTD")
        self.message = []

    def save_hydrographies(self, row):

        tmp = {}

        for k, v in self.fields_hydrography.items():
            if row[v] != "":
                tmp[k] = row[v]

        latitude = convert_position_camp_to_decimal(tmp["latitude"])
        if row["NOSU"] == "S":
            tmp["latitude"] = (-1) * latitude
        elif row["NOSU"] == "N":
            tmp["latitude"] = latitude

        longitude = convert_position_camp_to_decimal(tmp["longitude"])
        if row["ESWE"] == "W":
            tmp["longitude"] = (-1) * longitude
        elif row["ESWE"] == "E":
            tmp["longitude"] = longitude

        datetime_text = str(row["FECHA"]) + " " + str(row["HORA"])
        tmp["date_time"] = datetime.strptime(datetime_text, '%d/%m/%Y %H.%M')

        # to_round = ["temperature_0", "salinity_0", "temperature_50", "salinity_50", "temperature_100",
        #             "salinity_100", "temperature", "salinity"]
        # for r in to_round:
        #     if r in tmp:
        #         tmp[r] = round(tmp[r].astype(int), 3)

        # station
        # The station of hydrography haul is the station of the trawl haul (which is stored in the 'haul' field
        # of hydrography file), so firstly we identify it:
        sampler_object = Sampler.objects.get(sampler="CTD")

        # gear
        # By default we use the same gear for all the hydrography hauls
        ctd_object, created = CTD.objects.get_or_create(name="1", brand="default brand", model="default model")

        # Check if there are a Station with the same acronym as haul already stored, and if it isn't, create it:
        # try:
        # station_object = Station.objects.get(station=row["LANCE"], survey=self.survey_object)
        station_object, created = Station.objects.get_or_create(
            station=row['LANCE'],
            survey=self.survey_object,
        )

        # haul
        haul_object, created = Haul.objects.get_or_create(
            haul=row['ESTN'],
            sampler=sampler_object,
            station=station_object,
            ctd=ctd_object,
            sampler_type="CTD",
        )

        if HaulHydrography.objects.filter(haul=haul_object).exists():
            self.message.append(
                '<p>Hydrography haul ' + str(row['ESTN']) + 'is already in database so it hasn\'t been saved.</p>')
        else:
            serializer = ImportHydrographyesSerializer(data=tmp)
            serializer.is_valid(raise_exception=True)
            serializer.save(haul=haul_object)

            self.message.append(
                '<p>hydro station: ' + str(row['ESTN']) + ' has been saved as ' + str(station_object.station) + '</p>')

    def get_file(self, file_key):
        """
        Get file from request in pandas dataframe format
        :param file_key: Key of the request to get
        :return: Pandas dataframe with the content of the file
        """
        new_file = self.request.FILES[file_key]
        return pd.read_csv(new_file, sep=";", decimal=",")

    def import_hydrographies_csv(self):
        """
        Function to import the CSV file with hydrography data.
        :return:
        """

        hydro_file = self.get_file("hidro")
        hydro_file.fillna(0, inplace=True)

        # check there aren't already saved hydrographies of the survey
        if HaulHydrography.objects.filter(haul_id__station_id__survey_id__acronym=self.survey_name):
            self.message.append(
                "<p>hydrographies of this survey already saved in database. Remove all the hydrographies of this "
                "survey before try to import it again. None of the hydrographies has been saved.</p>")
        else:
            saved_hydrographies = hydro_file.apply(self.save_hydrographies, axis=1)

        return HttpResponse(self.message, status=HTTP_201_CREATED)


class OldCampImport:
    """
    Import all the tables from old CAMP in newCamp tables.
    The files required are CAMPXXx.csv, LANCEXXX.csv, FAUNAXXX.csv, NTALLXXX.csv and HIDROXXX.csv
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
        all_species = Sp.objects.all()

        stratification_name = get_type_survey(self.request.FILES['camp'].name) + "-sector-profundidad"

        stratification = create_stratification(stratification_name)

        stratum = create_stratum(self.request)

        survey = SurveysImport(self.request)
        survey_import = survey.import_surveys_csv()

        hauls = HaulsImport(self.request)
        hauls_import = hauls.import_hauls_csv()

        # Is mandatory that NTALL will be imported before FAUNA file
        ntall = NtallImport(self.request)
        ntall_import = ntall.import_ntall_csv()

        # The catches table is filled firstly in the import of NTALL file. In this importation only the
        # species measured has been saved. With the FAUNA file, only of species which hasn't been
        # measured must be stored because is used to_sql from pandas library.
        faunas = FaunasImport(self.request)
        faunas_import = faunas.import_faunas_csv()

        hydro = HydrographiesImport(self.request)
        hydrography_import = hydro.import_hydrographies_csv()

        return HttpResponse([stratification.content,
                             stratum.content,
                             survey_import.content,
                             hauls_import.content,
                             ntall_import.content,
                             faunas_import.content,
                             hydrography_import.content
                             ])

    def import_species(self):
        species = SpeciesImport(self.request)
        species_import = species.import_species_csv()

        response = [species_import.content]

        return HttpResponse(response)
