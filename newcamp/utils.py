import re
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
            camp_name = filename[position_digit - 1: position_digit + 2]
            return camp_name
        else:
            raise Exception('The filename doesn\'t like a CAMP file. Remember the file must be saved as csv. Example: '
                            '\'FAUNAN18.csv\'.')

    except Exception as error:
        raise error


def get_create_sampler_object(sampler_name):
    """
    Get sampler object. If the object doesn't exists in Sampler table, create it.
    Temporarily, in all Demersales surveys, the sampler of hydrography is saved with "CTD".
    The sampler of trawl hauls is saved as "ARRASTRE".
    :param sampler_name: The acronym of the sampler.
    :return: Sampler Object
    """
    from samplers.models import Sampler  # Import here to avoid circular imports

    sampler_obj, created = Sampler.objects.get_or_create(
        sampler=sampler_name,
        defaults={'sampler': sampler_name}
    )
    return sampler_obj
