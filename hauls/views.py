import csv
import io
from datetime import datetime

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND

from surveys.models import Survey
# from surveys.views import SurveysImport
from surveys.utils import survey_exists

from newcamp.apps import convert_comma_to_dot, empty

from hauls.models import Haul
from hauls.serializers import ImportHaulSerializer

from strata.models import Stratum
from stratifications.models import Stratification

from samplers.models import Sampler
from stations.models import Station


# class HaulsImport(object):
#
#     def convert_position_camp_to_decimal(self, value_camp):
#         """
#         Convert the incorrect coordinates saved in old camp to decimal coordinates
#         The old camp save the coordinates in 43.1428, where 43 are degrees and 1428
#         are 14.28 minutes
#         :param value_camp: coordinate to transform
#         :return: decimal coordinates
#         """
#         splitted = value_camp.split(',')
#         degree = int(splitted[0])
#         minute = int(splitted[1]) / 6000
#         decimal = degree + minute
#         decimal = round(decimal, 4)
#         return decimal
#
#     def get_stratum_name(self, row_sector, row_stratum):
#         sector_name = self.sectors_names[int(row_sector) - 1]
#         depth_index = self.depth_col_names.index(row_stratum)
#         depth_name = self.depths_names[depth_index]
#
#         stratum_name = sector_name + "-" + depth_name
#         return stratum_name
#
#     def import_hauls_csv(self):
#         """
#         Import csv file with trips data
#         :param objfile: file to import
#         :return:
#         """
#         objfile = self.request.FILES['lance']
#         objfile.seek(0)
#         '''seek(0) move the pointer to read the file to the first position. I do this to be
#         sure that the file is readed from the beginig'''
#         csv_file = csv.DictReader(io.StringIO(objfile.read().decode('utf-8')), delimiter=';')
#
#         # get survey id from filename:
#         filename = objfile._name
#         survey_name = filename[5:8]
#
#         message = []
#
#         '''in case the survey doesn't exists:'''
#         if not surveyExists(survey_name):
#             message.append('La campaña ' + survey_name + ' no existe.')
#             return HttpResponse(message, status=HTTP_404_NOT_FOUND)
#
#         survey_object = get_object_or_404(Survey, acronym=survey_name)
#
#         for row in csv_file:
#
#             # if Haul.objects.filter(haul=row['LANCE'], survey=survey_object.id).exists():
#             if Haul.objects.filter(haul=row['LANCE'],
#                                    station__survey__acronym=survey_object.acronym).exists():
#                 message.append('El lance ' + row['LANCE'] + ' ya está metido para la campaña ' +
#                                survey_object.acronym + '.')
#             else:
#
#                 tmp = {}
#                 tmp["haul"] = row['LANCE']
#                 tmp["date"] = datetime.strptime(row["FECHA"], '%d/%m/%Y').date()
#                 tmp["gear"] = row["ARTE"]
#                 tmp["valid"] = row["VALIDEZ"]
#                 tmp["shooting_date_time"] = datetime.strptime(row["HORA_L"], '%H,%M').time()
#
#                 shooting_latitude = self.convert_position_camp_to_decimal(row["LATITUD_L"])
#
#                 if row["NSL"] == "S":
#                     tmp["shooting_latitude"] = (-1) * shooting_latitude
#                 elif row["NSL"] == "N":
#                     tmp["shooting_latitude"] = shooting_latitude
#
#                 shooting_longitude = self.convert_position_camp_to_decimal(row["LONGITUD_L"])
#
#                 if row["EWL"] == "W":
#                     tmp["shooting_longitude"] = (-1) * shooting_longitude
#                 elif row["EWL"] == "E":
#                     tmp["shooting_longitude"] = shooting_longitude
#
#                 tmp["shooting_depth"] = row["PROF_L"]
#                 tmp["hauling_date_time"] = datetime.strptime(row["HORA_V"], '%H,%M').time()
#
#                 hauling_latitude = self.convert_position_camp_to_decimal(row["LATITUD_V"])
#
#                 if row["NSV"] == "S":
#                     tmp["hauling_latitude"] = (-1) * hauling_latitude
#                 elif row["NSL"] == "N":
#                     tmp["hauling_latitude"] = hauling_latitude
#
#                 hauling_longitude = self.convert_position_camp_to_decimal(row["LONGITUD_V"])
#
#                 if row["EWV"] == "W":
#                     tmp["hauling_longitude"] = (-1) * hauling_longitude
#                 elif row["EWL"] == "E":
#                     tmp["hauling_longitude"] = hauling_longitude
#
#                 tmp["hauling_depth"] = row["PROF_V"]
#                 tmp["course"] = row["RUMBO"]
#                 tmp["velocity"] = convert_comma_to_dot(row["VELOCIDAD"])
#                 tmp["cable"] = row["CABLE"]
#                 tmp["sweep"] = row["MALLETAS"]
#
#                 if not empty(row["DISTA_P"]):
#                     tmp["otter_boards_distance"] = convert_comma_to_dot(row["DISTA_P"])
#
#                 if not empty(row["ABERT_H"]):
#                     tmp["horizontal_aperture"] = convert_comma_to_dot(row["ABERT_H"])
#
#                 if not empty(row["ABERT_V"]):
#                     tmp["vertical_aperture"] = convert_comma_to_dot(row["ABERT_V"])
#
#                 tmp["grid"] = row["CUADRICULA"]
#
#                 if not empty(row["RECORRIDO"]):
#                     tmp["track"] = row["RECORRIDO"]
#
#                 tmp["wind_direction"] = row["DIR_VIENTO"]
#                 tmp["wind_velocity"] = convert_comma_to_dot(row["VEL_VIENTO"])
#                 tmp["sea_state"] = row["EST_MAR"]
#
#                 stratification_object = Stratification.objects.get(survey=survey_object)
#
#                 # There are some stratum which does not have areas, so I don't save it stratum database
#                 if row["ESTRATO"] != "":
#                     stratum = self.get_stratum_name(row["SECTOR"], row["ESTRATO"])
#                     stratum_object = Stratum.objects.get(survey=survey_object, stratum=stratum,
#                                                          stratification=stratification_object)
#                     tmp["stratum"] = stratum_object
#
#                 if not empty(row["ESTN"]):
#                     tmp["ESTN"] = row["ESTN"]
#
#                 tmp["comments"] = row["OBSERV"]
#
#                 # add sampler data
#                 # temporaly, in all demersales surveys, the sampler is saved with "ARRASTRE"
#                 # if there aren't create the "ARRASTRE" sampler, create it:
#                 if not Sampler.objects.filter(sampler="ARRASTRE").exists():
#                     sampler_new = Sampler()
#                     sampler_new.sampler = "ARRASTRE"
#                     sampler_new.save()
#
#                 sampler_object = Sampler.objects.get(sampler="ARRASTRE")
#
#                 message.append("the sampler has been saved as ARRASTRE\n")
#
#                 # add station data
#                 # temporaly, in all demersales surveys, the station is the same than the haul
#                 station_new = Station()
#                 station_new.station = row['LANCE']
#                 station_new.sampler = sampler_object
#                 station_new.survey = survey_object
#                 station_new.save()
#
#                 serializer = ImportHaulSerializer(data=tmp)
#
#                 serializer.is_valid(raise_exception=True)
#
#                 serializer.save(station=station_new)
#
#                 message.append(
#                     'Se ha añadido el lance ' + row['LANCE'] + ' a la campaña ' + survey_object.acronym + '.\n')
#
#         return HttpResponse(message, status=HTTP_201_CREATED)
