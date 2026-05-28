from dataclasses import dataclass
from typing import Callable, List, Tuple, Optional, Dict, Any
from .data_getters import get_trawl_data, get_hauls_data, get_hydrography_data, get_species_data
from .utils import format_to_ddmmyyyy, format_to_hhcommamm, convert_decimal_to_position_camp, get_sector, get_stratum, remove_zeros, format_validity, get_north_south, get_east_west, get_unit, get_increment

@dataclass
class ColumnConfig:
    """Configuration for a single CSV column"""
    csv_header: str                              # Name in CSV output
    df_column: str                               # Name in DataFrame
    transform: Optional[Callable] = None         # Optional transformation function
    default: Any = None                          # Default value if column missing
    cast: Optional[Callable] = None              # Type casting (e.g., int, str)


@dataclass
class ReportConfig:
    """Configuration for a complete report"""
    name: str                                    # Report identifier
    columns: List[ColumnConfig]                  # Column definitions
    data_getter: Optional[Callable]              # Function to fetch data
    data_getter_kwargs: Dict[str, Any]           # Kwargs for data getter
    groupby_cols: Optional[List[str]] = None     # Columns to group by before output
    agg_config: Optional[Dict[str, str]] = None  # Aggregation config for groupby
    post_process: Optional[Callable] = None      # Optional post-processing function


REPORT_CONFIGS = {
    'fauna': ReportConfig(
        name='fauna',
        columns=[
            ColumnConfig('LANCE', 'haul', cast=int),
            ColumnConfig('GRUPO', 'group', cast=int),
            ColumnConfig('ESP', 'sp_code', cast=int),
            ColumnConfig('PESO_GR', 'weight', cast=int),
            ColumnConfig('NUMERO', 'individuals', cast=int),
        ],
        data_getter=get_trawl_data,
        data_getter_kwargs={'include_meteorology': False},
    ),
    'lengths': ReportConfig(
        name='lengths',
        columns=[
            ColumnConfig('LANCE', 'haul', cast=int),
            ColumnConfig('GRUPO', 'group', cast=int),
            ColumnConfig('ESP', 'sp_code', cast=int),
            ColumnConfig('CATE', 'category', cast=int),
            ColumnConfig('SEXO', 'sex', cast=int),
            ColumnConfig('PESO_M', 'sampled_weight', cast=int),
            ColumnConfig('PESO_GR', 'weight', cast=int),
            ColumnConfig('TALLA', 'length_converted', cast=int),
            ColumnConfig('NUMER', 'number_individuals', cast=int),
        ],
        data_getter=get_trawl_data,
        data_getter_kwargs={},
    ),
    
    'hauls': ReportConfig(
        name='hauls',
        columns=[
            ColumnConfig('LANCE', 'haul'),
            ColumnConfig('FECHA', 'shooting_date_time', transform=format_to_ddmmyyyy),
            ColumnConfig('ARTE', 'trawl_id', cast=int),
            ColumnConfig('VALIDEZ', 'valid', transform=format_validity),
            ColumnConfig('HORA_L', 'shooting_date_time', transform=format_to_hhcommamm, cast=str),
            ColumnConfig('LATITUD_L', 'shooting_latitude', transform=convert_decimal_to_position_camp, default=''),
            ColumnConfig('NSL', 'shooting_latitude', transform=get_north_south, default=''),
            ColumnConfig('LONGITUD_L', 'shooting_longitude',  transform=convert_decimal_to_position_camp, default=''),
            ColumnConfig('EWL', 'shooting_longitude', transform=get_east_west, default=''),
            ColumnConfig('PROF_L', 'shooting_depth', cast=int),
            ColumnConfig('HORA_V', 'hauling_date_time', transform=format_to_hhcommamm),
            ColumnConfig('LATITUD_V', 'hauling_latitude', transform=convert_decimal_to_position_camp, default=''),
            ColumnConfig('NSV', 'hauling_latitude', transform=get_north_south, default=''),
            ColumnConfig('LONGITUD_V', 'hauling_longitude', transform=convert_decimal_to_position_camp, default=''),
            ColumnConfig('EWV', 'hauling_longitude', transform=get_east_west, default=''),
            ColumnConfig('PROF_V', 'hauling_depth', cast=int),
            ColumnConfig('RUMBO', 'course', cast=int, default=''),
            ColumnConfig('VELOCIDAD', 'velocity', default=''),
            ColumnConfig('CABLE', 'cable', cast=int, default=''),
            ColumnConfig('MALLETAS', 'sweep', cast=int, default=''),
            ColumnConfig('DISTA_P', 'otter_boards_distance', default=''),
            ColumnConfig('ABERT_H', 'horizontal_aperture', default=''),
            ColumnConfig('ABERT_V', 'vertical_aperture', default=''),
            ColumnConfig('CUADRICULA', 'sampling_rectangle', default=''),
            ColumnConfig('RECORRIDO', 'track', cast=int, default=''),
            ColumnConfig('DIR_VIENTO', 'wind_direction', default=''),
            ColumnConfig('VEL_VIENTO', 'wind_velocity', default=''),
            ColumnConfig('EST_MAR', 'sea_state', default=''),
            ColumnConfig('SECTOR', 'stratum', transform=get_sector),
            ColumnConfig('ESTRATO', 'stratum', transform=get_stratum),
            ColumnConfig('TEMP', 'temperature', default='TEMP'),
            ColumnConfig('SALI', 'salinity', default='SALI'),
            ColumnConfig('ESTN', 'station', default=''),
            ColumnConfig('OBSERV', 'comment', default=''),
        ],
        data_getter=get_hauls_data,
        data_getter_kwargs={'include_hidrography': True, 'include_meteorology': True},
    ),
    
    'hydrography': ReportConfig(
        name='hydrography',
        columns=[
            ColumnConfig('ESTN', 'station'),
            ColumnConfig('LATITUD', 'latitude', transform=convert_decimal_to_position_camp),
            ColumnConfig('NOSU', 'latitude', transform=get_north_south),
            ColumnConfig('LONGITUD', 'longitude', transform=convert_decimal_to_position_camp),
            ColumnConfig('ESWE', 'longitude', transform=get_east_west),
            ColumnConfig('FECHA', 'date_time', transform=format_to_ddmmyyyy),
            ColumnConfig('HORA', 'date_time', transform=format_to_hhcommamm),
            ColumnConfig('SONDA', 'depth_probe', cast=int),
            ColumnConfig('CABLE', 'cable', cast=int),
            ColumnConfig('PROF', 'depth', cast=int),
            ColumnConfig('TEMP0', 'temperature_0'),
            ColumnConfig('SALI0', 'salinity_0'),
            ColumnConfig('SIGMA0', 'sigma_0'),
            ColumnConfig('TEMP50', 'temperature_50'),
            ColumnConfig('SALI50', 'salinity_50'),
            ColumnConfig('SIGMA50', 'sigma_50'),
            ColumnConfig('TEMP100', 'temperature_100'),
            ColumnConfig('SALI100', 'salinity_100'),
            ColumnConfig('SIGMA100', 'sigma_100'),
            ColumnConfig('TEMP', 'temperature'),
            ColumnConfig('SALI', 'salinity'),
            ColumnConfig('SIGMA', 'sigma'),
            ColumnConfig('LANCE', 'haul'),
            ColumnConfig('OBSERV', 'comment'),
        ],
        data_getter=get_hydrography_data,
        data_getter_kwargs={},
        post_process=remove_zeros,
    ),
    
    'species': ReportConfig(
        name='species',
        columns=[
            ColumnConfig('GRUPO', 'group'),
            ColumnConfig('FAMILIA', None, default=''),
            ColumnConfig('ESP', 'sp_code'),
            ColumnConfig('ESPECIE', 'sp_name'),
            ColumnConfig('AUTOR', None, default=''),
            ColumnConfig('NOMBREE', 'spanish_name'),
            ColumnConfig('NOMBREI', None, default=''),
            ColumnConfig('A', 'a_param'),
            ColumnConfig('B', 'b_param'),
            ColumnConfig('LINF', None, default=''),
            ColumnConfig('K', None, default=''),
            ColumnConfig('T0', None, default=''),
            ColumnConfig('MED', 'measurement_name', transform=get_unit),
            ColumnConfig('INCREM', 'increment', transform=get_increment),
            ColumnConfig('NODC', None, default=''),
            ColumnConfig('GT', None, default=''),
            ColumnConfig('APHIA', 'APHIA', cast=int),
        ],
        data_getter=get_species_data,
        data_getter_kwargs={},
    ),
}


