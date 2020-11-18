import pandas as pd

from django.http import HttpResponse
from rest_framework.status import HTTP_201_CREATED

from species.models import Sp
from hauls.models import Haul
from stations.models import Station
from samplers.models import Sampler
from catches.models import Catch

from species.apps import getSpeciesIdFromGroupEsp, categoryExists

from catches.serializers import CatchesVerboseSerializer
from surveys.models import Survey




# class CatchesImport(object):
#
#     def get_name(self):
#         """
#         Return the name of the survey from the filename
#         :return: string with the acronym of the survey (N16, N17...)
#         """
#         filename = self.request.FILES['file'].name
#         return filename[5:8]
#
#     def import_catches_csv(self):
#         """
#         Function to import the CSV file with catches info.
#         To import again the file, first must truncate the table.
#         :param file: file to import
#         :return:
#         """
#
#         objfile = self.request.FILES['file']
#
#         csv_file = pd.read_csv(objfile, sep=";")
#
#         categories = csv_file[['LANCE', 'GRUPO', 'ESP', 'PESO_GR']]
#
#         uniques = categories.drop_duplicates()
#
#         sampler_object = Sampler.objects.get(sampler='ARRASTRE')
#         survey_name = self.get_name()
#         survey_object = Survey.objects.get(acronym=survey_name)
#
#         message = []
#
#         # for row in uniques:
#         for index, row in uniques.iterrows():
#             tmp = {}
#
#             station_object = Station.objects.get(survey=survey_object, sampler=sampler_object, station=row['LANCE'])
#             haul_object = Haul.objects.get(station = station_object, haul=row['LANCE'])
#             species_object = Sp.objects.get(group=row['GRUPO'], sp_code=row["ESP"])
#             tmp["weight"] = row["PESO_GR"]
#             tmp["haul"] = haul_object.pk
#             tmp["specie"] = species_object.pk
#
#             # add category
#             if not categoryExists("1", tmp["specie"]):
#                 category = Category.objects.create(category_name="1", sp=species_object).pk
#                 tmp["category"] = category
#             else:
#                 category = Category.objects.get(category_name="1", sp=species_object.pk).pk
#                 tmp["category"] = category
#
#             # check if haul/species/category already exists
#             if Catch.objects.filter(category=tmp["category"],
#                                     specie=tmp["specie"],
#                                     haul=tmp["haul"]).exists():
#                 message.append('The category ' + str(tmp["category"]) +
#                                ' of ' + str(tmp["specie"]) + ', haul ' + str(tmp["haul"]) +
#                                ' already exists.\n')
#             else:
#                 serializer = CatchesSerializer(data=tmp)
#
#                 serializer.is_valid(raise_exception=True)
#
#                 serializer.save()
#
#                 message.append('Se ha añadido el peso capturado de la especie ' + str(tmp["specie"]) + '\n' )
#
#         return HttpResponse(message, status=HTTP_201_CREATED)
