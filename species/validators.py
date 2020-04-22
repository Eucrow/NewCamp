from django.core.exceptions import ValidationError


def group_validator(value):
    """
    Check if the group field is correct
    """
    if value < 1 or value > 10:
        raise ValidationError('group between 1 to 9')

    return True