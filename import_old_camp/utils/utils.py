import os
import tempfile

import pandas as pd
from dbfread import DBF

from import_old_camp.utils.db_helpers import species_exists, species_not_exists_in_db


def get_file_dbf(request, file_key):
    """Get a DBF file from request as pandas dataframe"""
    new_file = request.FILES[file_key]

    # Write to temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix='.dbf') as tmp_file:
        for chunk in new_file.chunks():
            tmp_file.write(chunk)
        tmp_file_path = tmp_file.name

    try:
        table = DBF(tmp_file_path, encoding='latin-1')
        df = pd.DataFrame(list(table))
    finally:
        # Clean up temp file
        os.unlink(tmp_file_path)

    return df


def get_type_survey(filename):
    """
    Get the type of survey (Demersales or Porcupine) from a filename with the format CAMP???.csv,
    where ??? is D or P followed by two digits.
    If the first ? is another character, return "Unknown"
    :param filename: String with the filename.
    :return: "Demersales", "Porcupine" or "Unknown".
    """
    type_survey = filename[4:5]
    if type_survey == "N":
        return "Demersales"
    elif type_survey == "P":
        return "Porcupine"
    else:
        return "Unknown"


def get_unit_name(unit, increment):
    """
    Get the unit name from the code of the species. Used in pandas apply function.
    :param unit: Unit of measurement.
    :param increment: Increment of the measurement.
    :return: Unit of the species.
    """

    if (unit == 1) & (increment == 1):
        return "cm"
    # there are some cases where unit is 1 and the increment is 0, but it shouldn't be, so I set it to cm:
    elif (unit == 1) & (increment == 0):
        return "cm"
    # there are some cases where unit is 1 and the increment is 2, but it shouldn't be, so I set it to cm:
    elif (unit == 1) & (increment == 2):
        return "cm"
    elif (unit == 2) & (increment == 1):
        return "mm"
    elif (unit == 2) & (increment == 5):
        return "1/2cm"
    # there are some cases where unit is 2 and the increment is 0, but it shouldn't be, so I set it to mm:
    elif (unit == 2) & (increment == 0):
        return "mm"
    # there are some cases where unit is 0 and the increment is 1, but it shouldn't be, so I set it to cm:
    elif (unit == 0) & (increment == 1):
        return "cm"


def all_species_exists_in_file(file):
    # check if all species exists
    if not species_exists(file):
        not_exists = species_not_exists_in_db(file)
        missing_species = ", ".join(map(str, not_exists))  # Join species names into a single string
        return False, missing_species
    else:
        return True, None
