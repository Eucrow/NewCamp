from django.http import HttpResponse
from rest_framework.status import HTTP_201_CREATED

from faunas.models import Fauna
from faunas.serializers import FaunaSerializer
from stations.models import Station
from hauls.models import Haul
from species.models import Sp
from surveys.utils import survey_exists
from surveys.models import Survey
from hauls.apps import haulExists
from species.apps import specieExists
from stations.apps import stationExists

import pandas as pd


# class FaunasImport(object):
#
#     def get_duplicated(self):
#         """
#         Check LANCE, GRUPO, ESP duplicates in the import file.
#         :return: If there are any duplicated data, returns a boolean Series denoting duplicated rows. Otherwise
#         return False
#         """
#         # if any(self.faunas.duplicated(subset=['LANCE', 'GRUPO', 'ESP'])):
#         return self.faunas.duplicated(subset=['LANCE', 'GRUPO', 'ESP'], keep=False)
#         # else:
#         #     return False
#
#     def get_name(self):
#         """
#         Return the name of the survey from the filename
#         :return: string with the acronym of the survey (N16, N17...)
#         """
#         filename = self.request.FILES['file'].name
#         return filename[5:8]
#
#     def import_file(self):
#         new_faunas = self.request.FILES['file']
#         return pd.read_csv(new_faunas, sep=";")
#
#     def get_stations(self):
#         """
#         Get the stations from the import file (without duplicate hauls, only unique elements)
#         Importing the demersales files, the station is the same as the haul
#         :return: all stations
#         """
#         return set(self.faunas['LANCE'])
#
#     def get_hauls(self):
#         """
#         Get the hauls from the import file (without duplicate hauls, only unique elements)
#         :return: all hauls
#         """
#         return set(self.faunas['LANCE'])
#
#     def save_fauna(self, row, survey_object, station_object, haul_object, specie_object):
#         """
#         Save fauna data to database.
#         :param row: Serie of data from .iterrows() function (see pandas)
#         :param survey_object: object with survey data
#         :param station_object: object with station data
#         :param haul_object: object with haul data
#         :param specie_object: object with specie data
#         :return:
#         """
#         tmp = {}
#         tmp["weight"] = row["PESO_GR"]
#         tmp["number"] = row["NUMERO"]
#
#         serializer = FaunaSerializer(data=tmp)
#
#         serializer.is_valid(raise_exception=True)
#
#         serializer.save(survey=survey_object, station=station_object, haul=haul_object, specie=specie_object)
#
#         self.messages.append('Se ha añadido la especie ' + specie_object.sp_name + ' al lance ' + str(haul_object.haul)
#                              + ' de la campaña ' + survey_object.acronym + '.\n')
#
#     def import_faunas_csv(self):
#         """
#         Import csv file with faunas data
#         Before save data in database, make this validations:
#         - Does survey exists in the database?
#         - Does hauls exists in the database?
#         - Does stations exists in the database?
#         - Does the species exists in the database?
#         If all of this are correct, make this one too before save:
#         - Are there any haul-specie duplicated in the imported data?
#         :return: http response
#         """
#
#         self.survey_name = self.get_name()
#         self.survey_object = Survey.objects.get(acronym=self.survey_name)
#         self.faunas = self.import_file()
#         self.stations = self.get_stations()
#         self.hauls = self.get_hauls()
#         self.messages = []
#         self.errors = []
#
#         # Does survey exists in the database?
#         if not surveyExists(self.survey_name):
#             self.errors.append('La campaña ' + self.survey_name + ' no está dada de alta.\n')
#
#         # Does station exists in the database?
#         for station in self.stations:
#             if not stationExists(station, self.survey_object.id):
#                 self.errors.append('La estación ' + str(station) + ' no está dada de alta.\n')
#                 continue
#
#         # Does hauls exists in the database?
#         for haul in self.hauls:
#             if not haulExists(haul, self.survey_object.id):
#                 self.errors.append('El lance ' + str(haul) + ' no está dado de alta.\n')
#                 continue
#
#         # Does the species exists in the database?
#         for index, row in self.faunas.iterrows():
#             if not specieExists(row['GRUPO'], row['ESP']):
#                 self.errors.append(
#                     'La especie ' + str(row['ESP']) + ' del grupo ' + str(row['GRUPO']) + ' no está dado de alta.\n')
#                 continue
#
#         # Are there any haul-specie duplicated in the imported data?
#         duplicated = self.get_duplicated()
#         if any(duplicated):
#             dup = self.faunas[duplicated]
#             for index, row in dup.iterrows():
#                 self.errors.append(
#                     'la especie ' + str(row['ESP']) + ' del grupo ' + str(row['GRUPO']) + ' del lance ' + str(
#                         row['LANCE']) + ' está duplicada en el archivo.\n')
#
#         # Are there any catch of the specie and haul saved previously in database?
#         # This is only checked if there aren't any errors in the previous steps:
#         if not self.errors:
#             for index, row in self.faunas.iterrows():
#                 haul_object = Haul.objects.get(survey=self.survey_object.id, haul=row['LANCE'])
#                 specie_object = Sp.objects.get(group=row['GRUPO'], sp_code=row['ESP'])
#
#                 if Fauna.objects.filter(survey=self.survey_object.id, haul=haul_object.id, specie=specie_object.id):
#                     self.errors.append('La especie ' + str(row["GRUPO"]) + " " + str(row["ESP"]) + ' del lance ' +
#                                        str(row['LANCE']) + ' ya está metida para la campaña ' +
#                                        self.survey_object.acronym + '.\n')
#
#         if self.errors:  # this mean: if errors is not empty
#             self.messages = self.errors + self.messages
#             self.messages.append('Debido a los errores anteriores no se ha añadido ningún dato. Corrige el fichero e '
#                                  'inténtalo de nuevo.')
#         else: # at this point, all the previous checks are done, so the data are saved
#             for index, row in self.faunas.iterrows():
#                 haul_object = Haul.objects.get(survey=self.survey_object.id, haul=row['LANCE'])
#                 specie_object = Sp.objects.get(group=row['GRUPO'], sp_code=row['ESP'])
#                 station_object = Station.objects.get(survey=self.survey_object.id, station=row['LANCE'])
#                 self.save_fauna(row, self.survey_object, station_object, haul_object, specie_object)
#
#         return HttpResponse(self.messages, status=HTTP_201_CREATED)
