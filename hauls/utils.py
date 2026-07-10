from hauls.models import Haul


def haul_exists(haul, station_id, survey_id):
    """
    Detect if a haul of a survey are in the database
    :param station_id:
    :param haul:
    :param survey_id:
    :return: True if exists, False if don't
    """
    return Haul.objects.filter(haul=haul, station_id=station_id, station__survey_id=survey_id).exists()
