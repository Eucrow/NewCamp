import pandas as pd

from django.http import HttpResponse
from rest_framework.status import HTTP_201_CREATED

from catches.models import Catch
from species.apps import getSpeciesIdFromGroupEsp

from samples.serializers import LengthsSerializer, SampledWeightsSerializer
from surveys.models import Survey
from hauls.models import Haul
from species.models import Sp, Category
from samples.models import Length


# class LengthsImport(object):
#
#     def __init__(self):
#         self.survey_object = Survey.objects.get(acronym=self.survey_name)
#         self.survey_name = self.get_name()
#
#     def get_name(self):
#         """
#         Return the name of the survey from the filename
#         :return: string with the acronym of the survey (N16, N17...)
#         """
#         filename = self.request.FILES['file'].name
#         return filename[5:8]
#
#     def import_lengths_csv(self):
#         """
#         Function to import the CSV file with lengths info.
#         To import again the file, first must truncate the table.
#         :param file: file to import
#         :return:
#         """
#
#         objfile = self.request.FILES['file']
#
#         csv_file = pd.read_csv(objfile, sep=";")
#
#         message = []
#
#         survey_name = self.get_name()
#
#         for index, row in csv_file.iterrows():
#
#             haul_object = Haul.objects.get(station__survey__acronym=survey_name, haul=row['LANCE'])
#             specie_object = Sp.objects.get(group=row["GRUPO"], sp_code=row["ESP"])
#             category_object = Category.objects.get(sp=specie_object, category_name=row['CATE'])
#             catch_object = Catch.objects.get(haul=haul_object, specie=specie_object, category=category_object)
#
#             if Length.objects.filter(catch=catch_object, sex=row['SEXO'], length=row["TALLA"]).exists():
#                 message.append('Ya existen tallas para  ' + str(catch_object.specie.sp_code) + ' sexo ' +
#                                str(row['SEXO']) + '\n')
#             else:
#
#                 tmp = {"catch": catch_object.pk,
#                        "sex": row["SEXO"],
#                        "length": row["TALLA"],
#                        "number_individuals": row["NUMER"]
#                        }
#
#                 serializer = LengthsSerializer(data=tmp)
#
#                 serializer.is_valid(raise_exception=True)
#
#                 serializer.save()
#
#                 message.append('Se ha añadido la la talla de la especie ' + str(specie_object) + '\n' )
#
#         return HttpResponse(message, status=HTTP_201_CREATED)
#
#     def import_sampled_weight_csv(self):
#         """
#         Function to import the CSV file with sampled weight info.
#         To import again the file, first must truncate the table.
#         :param file: file to import
#         :return:
#         """
#
#         objfile = self.request.FILES['file']
#
#         csv_file = pd.read_csv(objfile, sep=";")
#
#         uniques = csv_file[['LANCE', 'CATE', 'GRUPO', 'ESP', 'SEXO', 'PESO_M', 'PESO_GR']]
#         uniques = uniques.drop_duplicates()
#
#         message = []
#
#         survey_name = self.get_name()
#
#         for index, row in uniques.iterrows():
#
#             # If sampled weight is equal to catch, then there aren't sample. Else, a sample has been taken
#             if row['PESO_M'] != row['PESO_GR']:
#
#                 haul_object = Haul.objects.get(station__survey__acronym=survey_name, haul=row['LANCE'])
#                 specie_object = Sp.objects.get(group=row["GRUPO"], sp_code=row["ESP"])
#                 category_object = Category.objects.get(sp=specie_object, category_name=row['CATE']) or False
#
#                 if category_object is False:
#                     message.append('No existe esa categoría')
#                 else:
#                     catch_object = Catch.objects.get(haul=haul_object, specie=specie_object, category=category_object)
#
#                     tmp = {"catch": catch_object.pk,
#                            "sampled_weight": row["PESO_M"]}
#
#                     serializer = SampledWeightsSerializer(data=tmp)
#
#                     serializer.is_valid(raise_exception=True)
#
#                     serializer.save()
#
#                     message.append('Se ha añadido el peso muestra de la especie ' + str(specie_object.pk) + '\n' )
#
#         return HttpResponse(message, status=HTTP_201_CREATED)
