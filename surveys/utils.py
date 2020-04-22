from surveys.models import Survey


def survey_exists(survey_name):
    """
    Check if a survey is already saved in database
    :param survey_name: acronym of the survey (N17, for example)
    :return: True if exists; False if don't
    """
    return Survey.objects.filter(acronym=survey_name).exists()