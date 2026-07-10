"""Data conversion utilities for import operations."""
import pandas as pd
import re
from typing import Optional, Union


def convert_str_float(value: Union[str, float, None]) -> Optional[float]:
    """Convert string to float, handling comma as decimal separator."""
    if not value or pd.isna(value):
        return None
    try:
        return float(str(value).replace(',', '.'))
    except (ValueError, AttributeError):
        return None


def convert_position_camp_to_decimal(value: str) -> float:
    """
    Convert the incorrect coordinates saved in old camp to decimal coordinates
    The old camp save the coordinates in 43.1428, where 43 are degrees and 1428
    are 14.28 minutes
    :param value: coordinate to transform
    :return: decimal coordinates
    """
    split = str(value).split('.')
    degree = int(split[0])
    minute = int(split[1]) / 6000
    decimal = degree + minute
    decimal = round(decimal, 4)
    return decimal


def format_latitude_decimal(row, coor_var, cardinal_var, cardinal_value):
    """
    Change the format of latitude by LATITUD var and cardinal points var. To use in apply.
    :param row: row of apply.
    :param coor_var: coordinate variable.
    :param cardinal_var: variable which contain the cardinal point of the coordinates (NSL, NSV, EWL, EWV)
    :param cardinal_value: cardinal value (string) which indicates if the coordinates are negatives.
    :return: coordinate converted.
    """
    row[coor_var] = convert_position_camp_to_decimal(row[coor_var])
    if row[cardinal_var] == cardinal_value:
        row[coor_var] = (-1) * row[coor_var]
    return round(row[coor_var], 4)


def fix_year_date(value):
    """
    In case of a date have four digits in year, remove century digits to avoid
    save data as 1900 years. For example, convert 1/1/1919 to 1/1/19.
    :param value: date to fix as string
    :return: date fixed as string
    """

    if re.search(r'\/.{4}$', value):
        r = value[:len(value) - 4] + value[len(d) - 2:len(value)]
        return r
    else:
        return value
