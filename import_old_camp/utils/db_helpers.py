"""Database query helper functions."""
from typing import Optional, Any, Dict

from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Model
from django.shortcuts import get_object_or_404

from catches.models import Catch
from hauls.models import Haul
from newcamp.utils import get_create_sampler_object
from samples.models import Sex
from ships.models import Ship
from species.models import Sp
from stations.models import Station


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


def get_haul_id(row, survey_name):
    """
    Get the haul id. Used in pandas apply function.
    :param row: row of the apply function.
    :param survey_name: name of survey.
    :return: Station id.
    """

    sampler_object = get_create_sampler_object(sampler_name='ARRASTRE')

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


def get_ship(datras_id):
    """
    Get the ship object by its datras_id.
    :param datras_id: The datras_id of the ship.
    :return: The ship object.
    """
    ship = Ship.objects.get(datras_id=datras_id)
    return ship

# def get_category_id(row):
#     """
#     Get the species id. Used in pandas apply function.
#     :param row: Row of the apply function
#     :return: Species id.
#     """
#     sp_id = get_sp_id(row)
#     cat_id = Category.objects.get(sp_id=sp_id, category_name=row['CATE']).id
#     return cat_id


# def get_or_create_object(model_class: Model, **kwargs) -> tuple:
#     """Generic get or create helper."""
#     try:
#         return model_class.objects.get_or_create(**kwargs)
#     except Exception as e:
#         raise Exception(f"Error with {model_class.__name__}: {e}")
