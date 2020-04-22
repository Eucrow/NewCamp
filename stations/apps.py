from django.apps import AppConfig

from stations.models import Station


class StationsConfig(AppConfig):
    name = 'stations'


def stationExists(station, survey_id):
    """
    Detech if a station of a survey are in the database
    :param station:
    :param survey_id:
    :return: True if exists, False if don't
    """
    return Station.objects.filter(station=station, survey=survey_id).exists()

