

from newcamp.constants import SECTORS_REVERSE, DEPTHS_REVERSE

def remove_zeros(df):
    """Global post-processor: replace zeros (int and float) with empty strings"""
    return df.applymap(lambda x: '' if (isinstance(x, (int, float)) and x == 0) else x)

def format_to_ddmmyyyy(value):
    """Format datetime timestamp to DD/MM/YYYY string"""
    if value is None:
        return ''
    try:
        return value.strftime('%d/%m/%Y')
    except:
        return ''
    
def format_to_hhcommamm(value):
    """Format datetime timestamp to hour.minutes decimal format without leading zeros"""
    if value is None:
        return ''
    
    try:
        hour = value.hour
        minute = value.minute
        return f"{hour},{minute}"
    except:
        return ''

def convert_decimal_to_position_camp(value_decimal):
    """
    Convert decimal coordinates back to old camp format
    Reverse of convert_position_camp_to_decimal
    The old camp format is DD.MMMM where DD are degrees and MMMM are minutes
    :param value_decimal: decimal coordinate to transform
    :return: camp format coordinate
    """
    if value_decimal is None:
        return ''
    
    try:
        value_decimal = float(value_decimal)
        degree = abs(int(value_decimal))
        decimal_part = value_decimal - int(value_decimal)
        minutes = abs(int(decimal_part * 6000))
        return f"{degree},{minutes:04d}"
    except:
        return ''
    
def get_north_south(value_decimal):
    """Determine if latitude is north or south based on sign"""
    if value_decimal is None:
        return ''
    
    try:
        value_decimal = float(value_decimal)
        return 'N' if value_decimal >= 0 else 'S'
    except:
        return ''
    
def get_east_west(value_decimal):
    """Determine if longitude is east or west based on sign"""
    if value_decimal is None:
        return ''
    
    try:
        value_decimal = float(value_decimal)
        return 'E' if value_decimal >= 0 else 'W'
    except:
        return ''

def format_validity(value):
    """Format validity based on value (example logic, adjust as needed)"""
    if value == True:
        return 1
    elif value == False:
        return 0
    else:
        return 3


def get_unit(value):
    """Map unit to measurement type"""
    # cm
    if value == "cm" : # cm in old camp is code 1
        unit = 1
        return unit
    # mm
    elif value == "mm": # mm in old camp is code 2
        unit = 2
        return unit
    # 1/2 cm
    elif value == "1/2cm": #1/2 cm in old camp is code 2 (mm) with increment 5
        unit = 2
        return unit
    else:
        return None
    
def get_increment(value):
    """Map increment to measurement type"""
    # cm
    if value == 10 : # cm in old camp had increment 1
        increment = 1
        return increment
    # mm
    elif value == 1: # mm in old camp had increment 1
        increment = 1
        return increment
    # 1/2 cm
    elif value == 5: #1/2 cm in old camphad increment 5
        increment = 5
        return increment
    else:
        return None
    
def get_sector(value):
    """Extract sector ID from station name"""
    if value is None:
        return None
    
    try:
        sector_name = value.split("-")[0] + "-" + value.split("-")[1]
        return SECTORS_REVERSE.get(sector_name)
    except Exception:
        return None
    
def get_stratum(value):
    """Extract stratum ID from station name"""
    if value is None:
        return None
    
    try:
        stratum_name = value.split("-")[2] + "-" + value.split("-")[3]
        return DEPTHS_REVERSE.get(stratum_name)
    except Exception:
        return None