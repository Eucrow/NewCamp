import csv

import io

import pandas as pd
from django.core.exceptions import ObjectDoesNotExist

from sqlalchemy import create_engine

from django.http import HttpResponse
from django.shortcuts import get_object_or_404

from datetime import datetime

from rest_framework.status import HTTP_201_CREATED, HTTP_409_CONFLICT

from catches.models import Catch
from catches.serializers import CatchesSerializer
from hauls.models import Haul, HaulTrawl, HaulHydrography, Meteorology
from hauls.serializers import ImportHydrographyesSerializer
from newcamp.apps import convert_comma_to_dot, empty
from newcamp.settings import BASE_DIR
from samples.serializers import LengthsSerializer, SampledWeightsSerializer
from species.apps import categoryExists
from species.apps import specieExists
from species.models import Sp, Category
from stations.models import Station
from stations.apps import stationExists
from strata.models import Stratum
from stratifications.models import Stratification
from surveys.utils import survey_exists
from surveys.models import Survey
from samplers.models import Sampler
from faunas.models import Fauna
from faunas.serializers import FaunaSerializer
from samples.models import Length
from hauls.utils import haul_exists, get_survey_name, get_sampler_object_and_create


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


class SurveysImport:

    def __init__(self, request):
        self.request = request
        self.sectors_col_names = [1, 2, 3, 4, 5]
        self.sectors_names = ["MIÑO-FINISTERRE", "FINISTERRE-ESTA", "ESTACA-PEÑAS", "PEÑAS-AJO", "AJO-BIDASOA"]
        # dept_col_names "D" and "E" doesn't have data so the depths_names of them are "without depth 1" and "without
        # depth 2"
        self.depth_col_names = ["A", "B", "C", "D", "E"]
        self.depths_names = ["70-120", "120-200", "200-500", "without depth 1", "without depth 2"]

    def import_surveys_csv(self):
        """
        Function to import the CSV file with surveys info.
        :return: Http Response
        """
        file_object = self.request.FILES['camp']
        file_object.seek(0)
        survey_file = csv.DictReader(io.StringIO(file_object.read().decode('utf-8')), delimiter=';')

        surveys_added = []
        message = []

        for row in survey_file:

            if Survey.objects.filter(acronym=row['CLAV']).exists():
                return HttpResponse(
                    '<p>The survey ' + str(row['CLAV']) + ' already exists in newCamp.</p>',
                    status=300)

            tmp = Survey.objects.create()

            tmp.acronym = row['CLAV']
            tmp.description = row['IDENT']
            tmp.width_x = row['CUX']
            tmp.width_y = row['CUY']
            tmp.origin_x = convert_comma_to_dot(row['OCUX'])
            tmp.origin_y = convert_comma_to_dot(row['OCUY'])
            tmp.ship = row['BARCO']
            tmp.hauls_duration = row['DURLAN']
            tmp.ew = row['ESTOES']
            tmp.ns = row['NORSUR']
            tmp.area_sampled = row['AREBAR']
            tmp.unit_sample = row['UNISUP']

            tmp.save()

            survey_object = Survey.objects.get(acronym=row['CLAV'])

            # add stratification data
            stratification = Stratification()
            stratification.survey_id = survey_object.id
            stratification.stratification = "sector-profundidad"
            stratification.comment = "<p>In Demersales surveys, the stratification is a combination of sector and " \
                                     "depth.</p> "
            stratification.save()

            # add stratum data
            for s in self.sectors_col_names:
                for d in self.depth_col_names:

                    area_col = "C" + str(s) + d
                    # print(area_col)

                    depth_index = self.depth_col_names.index(d)
                    name_stratification = self.sectors_names[s - 1] + "-" + self.depths_names[depth_index]
                    # print(name_stratification)

                    area = row[area_col]

                    # some depth-sector doesn't have info (columns C1D, C1E...)
                    if not empty(area):
                        strata = Stratum()
                        strata.survey = survey_object
                        strata.stratification = Stratification.objects.get(survey=survey_object,
                                                                           stratification="sector-profundidad")
                        strata.area = row[area_col]

                        strata.stratum = name_stratification

                        strata.comment = "<p>In Demersales surveys, the stratification is a combination of sector and" \
                                         " depth.</p>"

                        strata.save()

                    else:
                        message.append("<p>There aren't areas of stratification " + area_col + ".</p>")

            surveys_added.append(row['CLAV'])

        message.append("<p>The survey " + ', '.join(surveys_added) + ' has been saved.</p>')
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
        self.stratification_object = Stratification.objects.get(survey=self.survey_object)
        self.fields_haul = {
            "haul": "LANCE",
            "gear": "ARTE",
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

    def get_stratum_id(self, row):
        """
        Get the stratum id. Used in pandas apply function.
        :param row: row of the apply function.
        :return: stratum id.
        """

        # There are some stratum which does not have areas, so I don't save it stratum database
        if row["ESTRATO"] != "":
            stratum = self.get_stratum_name(row["SECTOR"], row["ESTRATO"])
            stratum_object = Stratum.objects.get(survey=self.survey_object, stratum=stratum,
                                                 stratification=self.stratification_object)
            return stratum_object.id
        else:
            return None

    def get_station_id(self, row):
        """
        Get the station id. Used in pandas apply function.
        :param row: row of the apply function.
        :return: Station id.
        """

        # add station data
        # temporaly, in all demersales surveys, the station is the same than the haul
        if not Station.objects.filter(station=row['LANCE'], survey__acronym=self.survey_name).exists():
            station_new = Station()
            station_new.station = row['LANCE']
            station_new.sampler = self.sampler_object
            station_new.survey = self.survey_object
            station_new.save()

        station_object = get_object_or_404(Station, station=row['LANCE'], survey__acronym=self.survey_name)
        return station_object.id

    def get_haul_id(self, row):
        """
        Get the haul id. Used in pandas apply function.
        :param row: row of the apply function.
        :return: Station id.
        """
        haul_object = Haul.objects.get(haul=row['LANCE'],
                                       station_id=self.get_station_id(row),
                                       # stratum_id=self.get_stratum_id(row),
                                       sampler_id=self.sampler_object.id)
        return haul_object.id

    def format_haul_table(self, file):
        """
        Format table to save in database with to_sql function of pandas.
        Remove useless variables and add station_id and stratum_id.
        :param file: file hauls in pandas dataframe
        :return: pandas dataframe formatted
        """

        hauls_table = file

        hauls_table.loc[:, 'station_id'] = hauls_table.apply(self.get_station_id, axis=1)

        hauls_table.loc[:, 'stratum_id'] = hauls_table.apply(self.get_stratum_id, axis=1)

        hauls_table.loc[:, 'sampler_id'] = self.sampler_object.id

        fields = list(self.fields_haul.values())
        fields.extend(['station_id', 'stratum_id', 'sampler_id'])

        hauls_table = file[fields]

        new_fields = list(self.fields_haul.keys())
        new_fields.extend(['station_id', 'stratum_id', 'sampler_id'])

        hauls_table.columns = new_fields

        return hauls_table

    def format_haul_meteorology_table(self, file):
        """
        Format table to save in database with to_sql function of pandas.
        Remove useless variables and add station_id and stratum_id.
        :param file: file hauls in pandas dataframe
        :return: pandas dataframe formatted
        """
        meteo_table = file

        meteo_table.loc[:, 'haul_id'] = meteo_table.apply(self.get_haul_id, axis=1)

        fields = list(self.fields_meteorology.values())

        fields.extend(['haul_id'])

        meteo_table = file[fields]

        new_fields = list(self.fields_meteorology.keys())

        new_fields.extend(['haul_id'])

        meteo_table.columns = new_fields

        return meteo_table

    def format_haul_trawl_table(self, file):
        """
        Format table to save in database with to_sql function of pandas.
        Remove useless variables and add station_id and stratum_id.
        :param file: file hauls in pandas dataframe
        :return: pandas dataframe formatted
        """
        trawl_table = file

        # add haul_id variable
        trawl_table.loc[:, 'haul_id'] = trawl_table.apply(self.get_haul_id, axis=1)

        # format some variables
        trawl_table["HORA_L"] = trawl_table["HORA_L"].astype(str)
        trawl_table['shooting_date_time'] = trawl_table[["FECHA", "HORA_L"]].agg(' '.join, axis=1)
        trawl_table['shooting_date_time'] = pd.to_datetime(trawl_table['shooting_date_time'], format='%d/%m/%Y %H.%M')

        trawl_table["HORA_V"] = trawl_table["HORA_V"].astype(str)
        trawl_table['hauling_date_time'] = trawl_table[["FECHA", "HORA_V"]].agg(' '.join, axis=1)
        trawl_table['hauling_date_time'] = pd.to_datetime(trawl_table['hauling_date_time'], format='%d/%m/%Y %H.%M')

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
                       'hauling_latitude', 'hauling_longitude'])

        trawl_table = file[fields]

        new_fields = list(self.fields_trawl.keys())

        new_fields.extend(
            ['haul_id', 'shooting_date_time', 'hauling_date_time', 'shooting_latitude', 'shooting_longitude',
             'hauling_latitude', 'hauling_longitude'])

        trawl_table.columns = new_fields

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
            hauls_table.to_sql("hauls_haul", con=engine, if_exists="append", index_label="id")

            # meteorology
            meteo_table = self.format_haul_meteorology_table(hauls_file)
            meteo_table.to_sql("hauls_meteorology", con=engine, if_exists="append", index_label="id")

            # trawl
            trawl_table = self.format_haul_trawl_table(hauls_file)
            trawl_table.to_sql("hauls_haultrawl", con=engine, if_exists="append", index_label="id")

            return HttpResponse(self.message, status=HTTP_201_CREATED)


class FaunasImport:

    def __init__(self, request):
        self.request = request
        self.survey_name = get_survey_name(self.request.FILES['fauna'].name)
        self.survey_object = Survey.objects.get(acronym=self.survey_name)
        self.sampler_object = get_sampler_object_and_create(sampler_name="ARRASTRE")
        self.faunas = self.get_file("fauna")
        self.stations = self.get_stations()
        self.hauls = self.get_hauls()
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

    def get_duplicated(self):
        """
        Check LANCE, GRUPO, ESP duplicates in the import file.
        :return: If there are any duplicated data, returns a boolean Series denoting duplicated rows. Otherwise
        return False
        """
        return self.faunas.duplicated(subset=['LANCE', 'GRUPO', 'ESP'], keep=False)

    def get_stations(self):
        """
        Get the stations from the import file (without duplicate hauls, only unique elements)
        Importing the demersales files, the station is the same as the haul
        :return: all stations
        """
        return set(self.faunas['LANCE'])

    def get_hauls(self):
        """
        Get the hauls from the import file (without duplicate hauls, only unique elements)
        :return: all hauls
        """
        return set(self.faunas['LANCE'])

    def get_station_id(self, row):
        """
        Get the station id. Used in pandas apply function.
        :param row: row of the apply function.
        :return: Station id.
        """

        # add station data
        # temporaly, in all demersales surveys, the station is the same than the haul
        if not Station.objects.filter(station=row['LANCE'], survey__acronym=self.survey_name).exists():
            station_new = Station()
            station_new.station = row['LANCE']
            station_new.sampler = self.sampler_object
            station_new.survey = self.survey_object
            station_new.save()

        station_object = get_object_or_404(Station, station=row['LANCE'], survey__acronym=self.survey_name)
        return station_object.id

    def get_haul_id(self, row):
        """
        Get the haul id. Used in pandas apply function.
        :param row: row of the apply function.
        :return: Station id.
        """
        haul_object = Haul.objects.get(haul=row['LANCE'],
                                       station_id=self.get_station_id(row),
                                       # stratum_id=self.get_stratum_id(row),
                                       sampler_id=self.sampler_object.id)
        return haul_object.id

    def species_exists(self, file):
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

    def species_not_exists_in_db(self, file):
        """
        Find species wich does not are saved in Species table.
        :param file: File with columns 'GRUPO' and 'ESP' to check.
        :return: Dataframe with species which are not saved in Specie table.
        """
        uniques_sp = file[['GRUPO', 'ESP']].drop_duplicates()

        def sp_exists(row):
            return Sp.objects.filter(group=row['GRUPO'], sp_code=row['ESP']).exists()

        uniques_sp['exists'] = uniques_sp.apply(sp_exists, axis=1)

        uniques_sp = uniques_sp[(uniques_sp.exists == False)]

        mes=[]

        for index, row in uniques_sp.iterrows():
            mes.append('Gruop: ' + str(row['GRUPO']) + ' Species: ' + str(row['ESP']))

        return mes

    def get_sp_id(self, row):
        """
        Get the species id. Used in pandas apply function.
        :param row: Row of the apply function
        :return: Species id.
        """
        sp_id = Sp.objects.get(group=row['GRUPO'], sp_code=row['ESP']).id
        return sp_id

    def get_category_id(self, row):
        """
        Get the species id. Used in pandas apply function.
        :param row: Row of the apply function
        :return: Species id.
        """
        sp_id = self.get_sp_id(row)

        cat_id = Category.objects.get(sp_id=sp_id, category_name="1").id
        return cat_id


    def format_catch_table(self, file):

        catches_table = file

        if self.species_exists(file):
            catches_table['specie_id'] = catches_table.apply(self.get_sp_id, axis=1)
            catches_table['category_id'] = catches_table.apply(self.get_category_id, axis=1)
            catches_table['haul_id'] = catches_table.apply(self.get_haul_id, axis=1)
            catches_table['weight'] = catches_table['PESO_GR']

            catches_table = catches_table[['specie_id', 'category_id', 'haul_id', 'weight']]

            return catches_table
        else:
            not_exists = self.species_not_exists_in_db(file)
            raise TypeError(
                ["The next species are not previously saved in species master. Add it before import file again:", not_exists])

    def import_faunas_csv(self):
        """
        Import csv file with faunas data
        Before save data in database, make this validations:
        - Does survey exists in the database?
        - Does hauls exists in the database?
        - Does stations exists in the database?
        - Does the species exists in the database?
        If all of this are correct, make this one too before save:
        - Are there any haul-specie duplicated in the imported data?
        :return: http response
        """

        # Does survey exists in the database?
        # if not survey_exists(self.survey_name):
        #     self.errors.append('La campaña ' + self.survey_name + ' no está dada de alta.\n')

        # Does station exists in the database?
        # for station in self.stations:
        #     if not stationExists(station, self.survey_object.id):
        #         self.errors.append('La estación ' + str(station) + ' no está dada de alta.\n')
        #         continue

        # Does hauls exists in the database?
        # for haul in self.hauls:
        #     # When the data is imported from old CAMP files, the station is the same that the haul:
        #     station_id = Station.objects.get(survey_id=self.survey_object.id, station=haul).id
        #     if not haul_exists(haul, station_id, self.survey_object.id):
        #         self.errors.append('El lance ' + str(haul) + ' no está dado de alta.\n')
        #         continue

        # Does the species exists in the database?
        # for index, row in self.faunas.iterrows():
        #     if not specieExists(row['GRUPO'], row['ESP']):
        #         self.errors.append(
        #             'La especie ' + str(row['ESP']) + ' del grupo ' + str(row['GRUPO']) + ' no está dada de alta.\n')
        #         continue

        # Are there any haul-specie duplicated in the imported data?
        # duplicated = self.get_duplicated()
        # if any(duplicated):
        #     dup = self.faunas[duplicated]
        #     for index, row in dup.iterrows():
        #         self.errors.append(
        #             '<p>la especie ' + str(row['ESP']) + ' del grupo ' + str(row['GRUPO']) + ' del lance ' + str(
        #                 row['LANCE']) + ' está duplicada en el archivo.</p>')

        # if self.errors:  # this mean: if errors is not empty
        #     self.messages = self.errors + self.messages
        #     self.messages.append(
        #         '<p>Debido a los errores anteriores no se ha añadido ningún dato. Corrige el fichero e '
        #         'inténtalo de nuevo.</p>')
        # else:  # at this point, all the previous checks are done, so the data are saved
        # for index, row in self.faunas.iterrows():
        #     # When the data is imported from old CAMP files, the station is the same that the haul:
        #     station_object = Station.objects.get(station=row['LANCE'], survey__acronym=self.survey_name)
        #     haul_object = Haul.objects.get(station=station_object, haul=row['LANCE'])
        #     print(row['LANCE'])
        #     specie_object = Sp.objects.get(group=row['GRUPO'], sp_code=row['ESP'])
        #     station_object = Station.objects.get(survey=self.survey_object.id, station=row['LANCE'])
        #     self.save_fauna(row, self.survey_object, station_object, haul_object, specie_object)
        #     print('<p>Se ha añadido la especie ' + specie_object.sp_name + ' al lance ' + str(haul_object.haul)
        #           + ' de la campaña ' + self.survey_object.acronym + '.</p>')

        # catches_file = self.get_file("fauna")
        catches_file = self.faunas
        # Create your engine.
        engine = create_engine('sqlite:///db.sqlite3', echo=True)

        # check there aren't already saved
        if Catch.objects.filter(haul_id__station_id__survey_id__acronym=self.survey_name):
            self.messages.append(
                "<p>Catches of this survey already saved in database. Remove all the catches of this "
                "survey before try to import it again. None of the catches has been saved.</p>")
            return HttpResponse(self.messages, status=HTTP_409_CONFLICT)

        else:
            catches_table = self.format_catch_table(catches_file)
            catches_table.to_sql("catches_catch", con=engine, if_exists="append", index_label="id")

            return HttpResponse(self.messages, status=HTTP_201_CREATED)


class NtallImport:

    def __init__(self, request):
        self.request = request
        self.message = []
        self.sampler_object = get_sampler_object_and_create(sampler_name='ARRASTRE')
        self.survey_name = get_survey_name(self.request.FILES['ntall'].name)
        self.survey_object = Survey.objects.get(acronym=self.survey_name)
        self.csv_file = get_file(self.request, "ntall")

    def save_catches(self):
        """
        Function to import the CSV file with catches info.
        To import again the file, first must truncate the table.
        :return:
        """

        categories = self.csv_file[['LANCE', 'GRUPO', 'ESP', 'CATE', 'PESO_GR']]

        csv_catches = categories.drop_duplicates()

        # for row in uniques:
        for index, row in csv_catches.iterrows():
            tmp = {}

            station_object = Station.objects.get(survey=self.survey_object, sampler=self.sampler_object,
                                                 station=row['LANCE'])
            haul_object = Haul.objects.get(station=station_object, haul=row['LANCE'])
            # print("<p>lance: ", row['LANCE'], " grupo: ", row['GRUPO'], " especie: ", row['ESP'], "</p>")
            species_object = Sp.objects.get(group=row['GRUPO'], sp_code=row["ESP"])
            tmp["weight"] = row["PESO_GR"]
            tmp["haul"] = haul_object.pk
            tmp["specie"] = species_object.pk

            # add category
            if not categoryExists(row["CATE"], tmp["specie"]):
                category = Category.objects.create(category_name=row["CATE"], sp=species_object).pk
                tmp["category"] = category
            else:
                category = Category.objects.get(category_name=row["CATE"], sp=species_object.pk).pk
                tmp["category"] = category

            # check if haul/species/category already exists
            if Catch.objects.filter(category=tmp["category"],
                                    specie=tmp["specie"],
                                    haul=tmp["haul"]).exists():
                self.message.append('<p>The category ' + str(tmp["category"]) +
                                    ' of ' + str(species_object.sp_name) +
                                    ', haul ' + str(haul_object.haul) +
                                    ' already exists.</p>')
            else:
                serializer = CatchesSerializer(data=tmp)

                serializer.is_valid(raise_exception=True)

                serializer.save()

                self.message.append(
                    '<p>The retained weight of the species ' + str(species_object.sp_name) +
                    ' in haul ' + str(haul_object.haul) +
                    ' has been added to the database.</p>')

        return HttpResponse(self.message, status=HTTP_201_CREATED)

    def save_lengths(self):

        csv_lengths = self.csv_file[0:20]

        # for index, row in self.csv_file.iterrows():
        for index, row in csv_lengths.iterrows():
            haul_object = Haul.objects.get(station__survey__acronym=self.survey_name, haul=row['LANCE'])
            specie_object = Sp.objects.get(group=row["GRUPO"], sp_code=row["ESP"])
            category_object = Category.objects.get(sp=specie_object, category_name=row['CATE'])
            catch_object = Catch.objects.get(haul=haul_object, specie=specie_object, category=category_object)

            if Length.objects.filter(catch=catch_object, sex=row['SEXO'], length=row["TALLA"]).exists():
                self.message.append('Ya existen tallas para  ' + str(catch_object.specie.sp_code) + ' sexo ' +
                                    str(row['SEXO']) + '\n')
            else:

                tmp = {"catch": catch_object.pk,
                       "sex": row["SEXO"],
                       "length": row["TALLA"],
                       "number_individuals": row["NUMER"]
                       }

                serializer = LengthsSerializer(data=tmp)

                serializer.is_valid(raise_exception=True)

                serializer.save()

                # self.message.append('Se ha añadido la la talla de la especie ' + str(specie_object) + '\n')

        return HttpResponse(self.message, status=HTTP_201_CREATED)

    def save_sampled_weight(self):

        csv_samples_weight = self.csv_file[['LANCE', 'CATE', 'GRUPO', 'ESP', 'SEXO', 'PESO_M', 'PESO_GR']]
        csv_samples_weight = csv_samples_weight.drop_duplicates()

        for index, row in csv_samples_weight.iterrows():

            # If sampled weight is equal to catch, then there aren't sample. Else, a sample has been taken
            if row['PESO_M'] != row['PESO_GR']:

                haul_object = Haul.objects.get(station__survey__acronym=self.survey_name, haul=row['LANCE'])
                specie_object = Sp.objects.get(group=row["GRUPO"], sp_code=row["ESP"])
                category_object = Category.objects.get(sp=specie_object, category_name=row['CATE']) or False

                if category_object is False:
                    self.message.append('No existe esa categoría')
                else:
                    catch_object = Catch.objects.get(haul=haul_object, specie=specie_object, category=category_object)

                    tmp = {"catch": catch_object.pk,
                           "category": category_object.pk,
                           "sampled_weight": row["PESO_M"]}

                    serializer = SampledWeightsSerializer(data=tmp)

                    serializer.is_valid(raise_exception=True)

                    serializer.save()

                    # self.message.append('Se ha añadido el peso muestra de la especie ' + str(specie_object.pk) + '\n')

        return HttpResponse(self.message, status=HTTP_201_CREATED)

    def import_ntall(self):

        save_catches = self.save_catches()
        save_sampled_weights = self.save_sampled_weight()
        save_lengths = self.save_lengths()

        response = [save_catches, save_sampled_weights.content, save_lengths.content]
        return HttpResponse(response)


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

        datetime_text = row["FECHA"] + " " + str(row["HORA"])
        tmp["date_time"] = datetime.strptime(datetime_text, '%d/%m/%Y %H.%M')

        to_round = ["temperature_0", "salinity_0", "temperature_50", "salinity_50", "temperature_100",
                    "salinity_100", "temperature", "salinity"]
        for r in to_round:
            tmp[r] = round(tmp[r], 3)

        # haul
        haul_object = get_object_or_404(Haul, haul=row["LANCE"])

        # station
        # The station of hydrography haul is the station of the trawl haul (which is stored in the 'haul' field
        # of hidrography file), so firstly we identify it:
        sampler_trawl_object = Sampler.objects.get(sampler="ARRASTRE")

        # Check if there are a Station with the same acronym than haul already stored, and if it isn't, create it:
        # try:
        station_object = Station.objects.get(station=row["LANCE"], sampler=sampler_trawl_object,
                                             survey=self.survey_object)

        if HaulHydrography.objects.filter(station=station_object).exists():
            self.message.append(
                '<p>Hydrography station ' + str(row['ESTN']) + 'whith haul trawl ' + str(row['LANCE']) +
                'is already in database so it hasn\'t been saved. Remember the hydrography station in newCamp is the '
                'trawl haul.</p>')
        else:
            serializer = ImportHydrographyesSerializer(data=tmp)
            serializer.is_valid(raise_exception=True)
            serializer.save(station=station_object, trawl_haul=haul_object)

            self.message.append(
                '<p>hydro station: ' + str(row['ESTN']) + ' has been saved as ' + str(station_object.station) + '</p>')

    def import_hydrographies_csv(self):
        """
        Function to import the CSV file with hydrography data.
        :return:
        """

        hydrographies_file = get_file(self.request, "hidro")

        saved_hydrographies = hydrographies_file.apply(self.save_hydrographies, axis=1)

        return HttpResponse(self.message, status=HTTP_201_CREATED)


class OldCampImport:
    def __init__(self):
        self.sectors_col_names = [1, 2, 3, 4, 5]
        self.sectors_names = ["MIÑO-FINISTERRE", "FINISTERRE-ESTA", "ESTACA-PEÑAS", "PEÑAS-AJO", "AJO-BIDASOA"]
        # dept_col_names "D" and "E" doesn't have data so the depths_names of them are "without depth 1" and "without
        # depth 2"
        self.depth_col_names = ["A", "B", "C", "D", "E"]
        self.depths_names = ["70-120", "120-200", "200-500", "without depth 1", "without depth 2"]

    def importComplete(self):
        survey = SurveysImport(self.request)
        survey_import = survey.import_surveys_csv()

        hauls = HaulsImport(self.request)
        hauls_import = hauls.import_hauls_csv()

        faunas = FaunasImport(self.request)
        faunas_import = faunas.import_faunas_csv()
        #
        # ntall = NtallImport(self.request)
        # ntall_import = ntall.import_ntall()
        #
        # hydro = HydrographiesImport(self.request)
        # hydrography_import = hydro.import_hydrographies_csv()

        # response = [survey_import.content, hauls_import.content, faunas_import.content, ntall_import.content,
        #             hydrography_import.content]
        response = [survey_import.content, hauls_import.content, faunas_import.content]

        return HttpResponse(response)

    def importSpecies(self):
        species = SpeciesImport(self.request)
        species_import = species.import_species_csv()

        response = [species_import.content]

        return HttpResponse(response)


class SpeciesImport:

    # def import_species_csv(self):
    #     """
    #     Function to import the CSV file with species info.
    #     To import again the file, first must truncate the table.
    #     :param file: file to import
    #     :return:
    #     """
    #
    #     objfile = self.request.FILES['file']
    #
    #     objfile.seek(0)
    #     '''seek(0) move the pointer to read the file to the first position. I do this to be
    #     sure that the file is readed from the beginig'''
    #     csv_file = csv.DictReader(io.StringIO(objfile.read().decode('utf-8')), delimiter=';')
    #
    #     message = []
    #
    #     for row in csv_file:
    #         tmp = {}
    #         tmp["group"] = row["GRUPO"]
    #         tmp["sp_code"] = row["ESP"]
    #         tmp["sp_name"] = row["ESPECIE"]
    #         #tmp["family"] = row["FAMILIA"]
    #         #tmp["author"] = row["AUTOR"]
    #         tmp["spanish_name"] = row["NOMBREE"]
    #         #tmp["english_name"] = row["NOMBREI"]
    #         if not empty(row["A"]):
    #             tmp["a_param"] = float(row["A"].replace(',', '.'))
    #         if not empty(row["B"]):
    #             tmp["b_param"] = float(row["B"].replace(',', '.'))
    #         if not empty(row["LINF"]):
    #             tmp["l_infinity"] = float(row["LINF"].replace(',','.'))
    #         if not empty(row["K"]):
    #             tmp["k"] = float(row["K"].replace(',','.'))
    #         if not empty(row["T0"]):
    #             tmp["t_zero"] = float(row["T0"].replace(',','.'))
    #         tmp["unit"] = row["MED"]
    #         tmp["increment"] = row["INCREM"]
    #         #tmp["nodc"] = row["NODC"] or 0
    #         tmp["trophic_group"] = row["GT"] or 0
    #         tmp["APHIA"] = row["APHIA"] or 0
    #
    #         serializer = SpeciesSerializer(data=tmp)
    #
    #         serializer.is_valid(raise_exception=True)
    #
    #         serializer.save()
    #
    #         message.append('Se ha añadido la especie ' + row['ESPECIE'])
    #
    #     return HttpResponse(message, status=HTTP_201_CREATED)

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
            "l_infinity": "LINF",
            "k": "K",
            "t_zero": "T0",
            "unit": "MED",
            "increment": "INCREM",
            "trophic_group": "GT",
            "APHIA": "APHIA",
        }


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

        return species_df

    def get_sp_id(self, row):
        """
        Get the species id. Used in pandas apply function.
        :param row: Row of the apply function
        :return: Species id.
        """
        sp_id = Sp.objects.get(group=row['GRUPO'], sp_code=row['ESP']).id
        return sp_id

    def format_categories_table(self, file):
        categories_df = file

        # when import old camp file, when a species is imported is mandatory generate at least one
        # category for this species in category table. By defaul, the category name is "1"

        categories_df['sp_id'] = categories_df.apply(self.get_sp_id, axis=1)
        categories_df['category_name'] = "1"

        categories_df = categories_df[['category_name', 'sp_id']]

        return categories_df

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
        species_table.to_sql("species_sp", con=engine, if_exists="replace", index_label="id")

        # categories
        categories_table = self.format_categories_table(species_file)
        categories_table.to_sql("species_category", con=engine, if_exists="replace", index_label="id")

        return HttpResponse(self.message, status=HTTP_201_CREATED)