import warnings


def convert_comma_to_dot(s):
    '''
    Change comma in dots in of a sting
    :param s: string
    :return: the string with the comma changed in dots
    '''
    if not empty(s):
        s = s.strip().replace(',', '.')
        return float(s)
    else:
        warnings.warn(str(s) + " is empty.")


def empty(value):
    '''
    Check if numeric variable is empty
    :param value: variable to check
    :return: True if the value is empty
    '''
    try:
        value = float(value)
    except ValueError:
        pass
    return not bool(value)
