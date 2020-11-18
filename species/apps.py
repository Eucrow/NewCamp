from django.apps import AppConfig
from django.shortcuts import get_object_or_404

from species.models import Sp

import csv


class SpeciesConfig(AppConfig):
    name = 'species'


def specieExists(group, sp_code):
    """
    Check if a specie exists
    :param group:
    :param sp:
    :return: True if exists, False if doesn't
    """
    return Sp.objects.filter(group=group, sp_code=sp_code).exists()


def getSpeciesIdFromGroupEsp(group, sp):
    """
    Get the specie from group code and esp code
    :param group:
    :param esp:
    :return: specie code
    """
    specie = get_object_or_404(Sp, group=group, sp_code=sp)
    return specie.pk


def importSpeciesCSV(file):
    """
    Function to import the CSV file with species info.
    To import again the file, first must truncate the database.
    :param file: file to import
    :return:
    """
    with open(file, newline='') as csvfile:
        file_read = csv.reader(csvfile, delimiter=';')

        for row in file_read:
            tmp = Sp.objects.create()
            tmp.group = row[0]
            tmp.sp_code = row[2]
            tmp.sp_name = row[3]
            tmp.family = row[1]
            tmp.author = row[4]
            tmp.spanish_name = row[5]
            tmp.english_name = row[6]
            tmp.a_param = float(row[7].replace(',', '.'))
            tmp.b_param = float(row[8].replace(',', '.'))
            # tmp.lower_limit = float(row[9].replace(',','.'))
            # tmp.K = float(row[10].replace(',','.'))
            # tmp.to = float(row[11].replace(',','.'))
            # tmp.increment = row[13]
            tmp.nodc = row[9] or 0
            tmp.trophic_group = row[10] or 0
            tmp.APHIA = row[11] or 0
            tmp.save()
