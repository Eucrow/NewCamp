import re
from hauls.models import Haul
from samplers.models import Sampler


def get_survey_name(filename):
    """
    Return the name of the survey from the filename of the file to import.
    :param filename: filename.
    :return: string with the acronym of the survey (N16, N17, P16, P17...)
    """
    reg_exp = r'^(CAMP|FAUNA|HIDRO|LANCE|NTALL).\d{2}'

    try:
        if re.match(reg_exp, filename):
            position_digit = re.search(r"\d", filename).start()
            camp_name = filename[position_digit-1: position_digit+2]
            return camp_name
        else:
            raise Exception('The filename doesn\'t like a CAMP file. Remember the file must be saved as csv. Example: '
                            '\'FAUNAN18.csv\'.')

    except Exception as error:
        raise error


def haul_exists(haul, station_id, survey_id):
    """
    Detect if a haul of a survey are in the database
    :param station_id:
    :param haul:
    :param survey_id:
    :return: True if exists, False if don't
    """
    return Haul.objects.filter(haul=haul, station_id=station_id,station__survey_id=survey_id).exists()


def get_sampler_object_and_create(sampler_name):
    """
    Get sampler object. If the object doesn't exists in Sampler table, create it.
    Temporarily, in all Demersales surveys, the sampler of hydrography is saved with "CTD". The sampler of trawl hauls
    is saved as "ARRASTRE".
    :param sampler_name: The acronym of the sampler.
    :return: Sampler Object
    """
    if not Sampler.objects.filter(sampler=sampler_name).exists():
        sampler_new = Sampler()
        sampler_new.sampler = sampler_name
        sampler_new.save()

    return Sampler.objects.get(sampler=sampler_name)

