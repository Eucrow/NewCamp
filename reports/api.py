import csv
import pandas as pd
import numpy as np
from dataclasses import dataclass
from typing import Callable, List, Tuple, Optional, Dict, Any
from django.http import HttpResponse
from rest_framework.views import APIView

from surveys.models import Survey
from stations.models import Station
from hauls.models import Haul, HaulTrawl, Meteorology, HaulHydrography
from catches.models import Catch
from species.models import Sp, MeasurementType
from samples.models import Sex, SampledWeight, Length


# ============================================================================
# REPORT CONFIGURATION
# ============================================================================

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


# Report configurations - centralized column and ordering definitions
REPORT_CONFIGS = {
    'fauna': ReportConfig(
        name='fauna',
        columns=[
            ColumnConfig('acronym', 'acronym'),
            ColumnConfig('haul', 'haul'),
            ColumnConfig('group', 'group', cast=int),
            ColumnConfig('code', 'sp_code', cast=int),
            ColumnConfig('weight', 'weight', cast=int),
            ColumnConfig('number_individuals', 'individuals', cast=int),
        ],
        data_getter=None,  # Set after function definitions
        data_getter_kwargs={'include_meteorology': False},
    ),
    
    'lengths': ReportConfig(
        name='lengths',
        columns=[
            ColumnConfig('acronym', 'acronym'),
            ColumnConfig('haul', 'haul'),
            ColumnConfig('group', 'group'),
            ColumnConfig('code', 'sp_code'),
            ColumnConfig('category', 'category'),
            ColumnConfig('sex', 'sex'),
            ColumnConfig('sampled_weight', 'sampled_weight', cast=int),
            ColumnConfig('weight', 'weight'),
            ColumnConfig('length', 'length_converted', cast=int),
            ColumnConfig('number_individuals', 'number_individuals', cast=int),
        ],
        data_getter=None,
        data_getter_kwargs={},
    ),
    
    'hauls': ReportConfig(
        name='hauls',
        columns=[
            ColumnConfig('acronym', 'acronym'),
            ColumnConfig('station', 'station'),
            ColumnConfig('haul', 'haul'),
            ColumnConfig('FECHA', None, default='GEAR'),
            ColumnConfig('ARTE', None, default='ARTE'),
            ColumnConfig('valid', 'valid'),
            ColumnConfig('shooting_date_time', 'shooting_date_time', default=''),
            ColumnConfig('shooting_latitude', 'shooting_latitude', default=''),
            ColumnConfig('shooting_longitude', 'shooting_longitude', default=''),
            ColumnConfig('shooting_depth', 'shooting_depth', default=''),
            ColumnConfig('hauling_date_time', 'hauling_date_time', default=''),
            ColumnConfig('hauling_latitude', 'hauling_latitude', default=''),
            ColumnConfig('hauling_longitude', 'hauling_longitude', default=''),
            ColumnConfig('hauling_depth', 'hauling_depth', default=''),
            ColumnConfig('course', 'course', default=''),
            ColumnConfig('velocity', 'velocity', default=''),
            ColumnConfig('cable', 'cable', default=''),
            ColumnConfig('sweep', 'sweep', default=''),
            ColumnConfig('otter_boards_distance', 'otter_boards_distance', default=''),
            ColumnConfig('horizontal_aperture', 'horizontal_aperture', default=''),
            ColumnConfig('vertical_aperture', 'vertical_aperture', default=''),
            ColumnConfig('CUADRICULA', 'sampling_rectangle', default=''),
            ColumnConfig('track', 'track', default=''),
            ColumnConfig('wind_direction', 'wind_direction', default=''),
            ColumnConfig('wind_velocity', 'wind_velocity', default=''),
            ColumnConfig('sea_state', 'sea_state', default=''),
            ColumnConfig('SECTOR', None, default='SECTOR'),
            ColumnConfig('ESTRATO', None, default='ESTRATO'),
            ColumnConfig('TEMP', None, default='TEMP'),
            ColumnConfig('SALI', None, default='SALI'),
            ColumnConfig('station_name', 'station', default=''),
            ColumnConfig('comment', 'comment', default=''),
        ],
        data_getter=None,
        data_getter_kwargs={'include_meteorology': True},
    ),
    
    'hydrography': ReportConfig(
        name='hydrography',
        columns=[
            ColumnConfig('acronym', 'acronym'),
            ColumnConfig('station', 'station'),
            ColumnConfig('haul', 'haul'),
            ColumnConfig('latitude', 'latitude'),
            ColumnConfig('longitude', 'longitude'),
            ColumnConfig('datetime', 'date_time'),
            ColumnConfig('depth_probe', 'depth_probe'),
            ColumnConfig('cable', 'cable'),
            ColumnConfig('depth', 'depth'),
            ColumnConfig('temperature_0', 'temperature_0'),
            ColumnConfig('salinity_0', 'salinity_0'),
            ColumnConfig('sigma_0', 'sigma_0'),
            ColumnConfig('temperature_50', 'temperature_50'),
            ColumnConfig('salinity_50', 'salinity_50'),
            ColumnConfig('sigma_50', 'sigma_50'),
            ColumnConfig('temperature_100', 'temperature_100'),
            ColumnConfig('salinity_100', 'salinity_100'),
            ColumnConfig('sigma_100', 'sigma_100'),
            ColumnConfig('temperature', 'temperature'),
            ColumnConfig('salinity', 'salinity'),
            ColumnConfig('sigma', 'sigma'),
            ColumnConfig('comment', 'comment'),
        ],
        data_getter=None,
        data_getter_kwargs={},
    ),
    
    'species': ReportConfig(
        name='species',
        columns=[
            ColumnConfig('group', 'group'),
            ColumnConfig('family', None, default='FAMILY'),
            ColumnConfig('sp_code', 'sp_code'),
            ColumnConfig('sp_name', 'sp_name'),
            ColumnConfig('author', None, default='AUTHOR'),
            ColumnConfig('spanish_name', 'spanish_name'),
            ColumnConfig('english_name', None, default='english_name'),
            ColumnConfig('a_param', 'a_param'),
            ColumnConfig('b_param', 'b_param'),
            ColumnConfig('linf', None, default='linf'),
            ColumnConfig('k_param', None, default='k_param'),
            ColumnConfig('t0', None, default='t0'),
            ColumnConfig('med', None, default='med'),
            ColumnConfig('increm', None, default='increm'),
            ColumnConfig('nodc', None, default='nodc'),
            ColumnConfig('gt', None, default='gt'),
            ColumnConfig('aphia', 'APHIA'),
        ],
        data_getter=None,
        data_getter_kwargs={},
    ),
}


# ============================================================================
# HELPER FUNCTIONS FOR REPORTS
# ============================================================================

def get_column_value(row, col_config: ColumnConfig) -> Any:
    """Extract value from row based on column configuration"""
    # If no df_column specified, use default value
    if col_config.df_column is None:
        return col_config.default
    
    # Get value from row, use default if not present
    value = getattr(row, col_config.df_column, col_config.default)
    
    # Apply transformation if provided
    if col_config.transform:
        value = col_config.transform(value)
    
    # Cast type if needed
    if col_config.cast and value is not None:
        try:
            value = col_config.cast(value)
        except (ValueError, TypeError):
            value = col_config.default
    
    return value


def generate_csv_response(filename: str, headers: List[str]) -> Tuple[HttpResponse, csv.writer]:
    """Generate HTTP response and CSV writer for streaming"""
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = f'attachment; filename="{filename}"'
    writer = csv.writer(response)
    writer.writerow(headers)
    return response, writer


def process_report_data(config: ReportConfig, acronym: Optional[str] = None) -> pd.DataFrame:
    """
    Process data according to report configuration
    """
    # Get data using the configured getter function
    if config.data_getter:
        if acronym:
            merged_df = config.data_getter(acronym, **config.data_getter_kwargs)
        else:
            merged_df = config.data_getter(**config.data_getter_kwargs)
    else:
        # Special case for species report or when no getter specified
        merged_df = pd.DataFrame(list(Sp.objects.all().values()))
    
    # Post-processing if needed
    if config.post_process:
        merged_df = config.post_process(merged_df)
    
    return merged_df


def get_base_survey_data(acronym):
    """
    Get base data (stations, hauls, catches) for a survey and return merged DataFrame.
    
    Args:
        acronym: Survey acronym
        include_trawl: Whether to include trawl data (default: False)
        include_meteorology: Whether to include meteorology data (default: False)
        include_hydrography: Whether to include hydrography data (default: False)
        
    Returns:
        tuple: (merged_df, survey, stations, hauls, catches) where:
            - merged_df: DataFrame with merged stations, hauls, and catches
            - survey: Survey object
            - stations: QuerySet of Station objects
            - hauls: QuerySet of Haul objects  
            - catches: QuerySet of Catch objects
    """
    # Get the survey
    survey = Survey.objects.get(acronym=acronym)
    survey_df = pd.DataFrame(list(Survey.objects.filter(acronym=acronym).values()))
    survey_df = survey_df.rename(columns={'id': 'survey_id'})

    # Get stations
    stations = Station.objects.filter(survey=survey)
    stations_df = pd.DataFrame(list(stations.values()))
    stations_df = stations_df.rename(columns={'id': 'station_id'})

    # Merge survey and stations dataframes
    merged_df = pd.merge(survey_df, stations_df, left_on='survey_id', right_on='survey_id', how='left',
                         suffixes=('_survey', '_station'))

    return merged_df, survey, stations


def get_trawl_data(acronym, include_meteorology=False):
    """
    Get and merge trawl data for a survey from multiple related models.
    
    Filters hauls by sampler_type="trawl" and aggregates all related data including
    stations, hauls, trawls, meteorology (optional), catches, species, lengths, sexes,
    and sampled weights into a single merged DataFrame.
    
    Args:
        acronym (str): Survey acronym to filter data by
        include_meteorology (bool, optional): Whether to include meteorology data. 
                                            Defaults to False.
    
    Returns:
        pd.DataFrame: Merged DataFrame containing:
            - Survey and station information
            - Haul metadata and trawl characteristics (shooting/hauling coordinates, depth, etc.)
            - Meteorology data (wind, sea state) - only if include_meteorology=True
            - Catch information (category, weight, species)
            - Species details (code, group, etc.)
            - Length measurements by sex
            - Sampled weights (for scaling calculations)
    
    Note:
        - Only includes hauls with sampler_type="trawl" (excludes CTD)
        - Uses left joins to preserve all haul records even if related data is missing
        - Returns empty DataFrame if no trawl hauls exist for the survey
    
    Raises:
        Survey.DoesNotExist: If the survey acronym doesn't match any Survey in database
    """
    base_df, survey, stations = get_base_survey_data(acronym)
    print(f"DEBUG: Survey acronym = '{acronym}'")
    print(f"DEBUG: Survey found = {survey}")
    print(f"DEBUG: Stations count = {stations.count()}")
    
    
    hauls = Haul.objects.filter(station__in=stations, sampler_type="trawl")
    print(f"DEBUG: Hauls count = {hauls.count()}")
    print(f"DEBUG: All hauls (no filter) = {Haul.objects.all().count()}")
    
    
    hauls_df = pd.DataFrame(list(hauls.values()))
    # Merge stations and hauls dataframes
    merged_df = pd.merge(base_df, hauls_df, left_on='station_id', right_on='station_id', how='left',
                         suffixes=('_station', '_haul'))
    merged_df = merged_df.rename(columns={'id': 'haul_id'})

    # Get haul trawls
    trawls = HaulTrawl.objects.filter(haul_id__in=hauls)
    trawls_df = pd.DataFrame(list(trawls.values()))
    merged_df = pd.merge(merged_df, trawls_df, left_on='haul_id', right_on='id', how='left',
                         suffixes=('', '_trawl'))

    # Conditionally get and merge meteorology data
    if include_meteorology:
        meteorologies = Meteorology.objects.filter(haul_id__in=hauls)
        meteorologies_df = pd.DataFrame(list(meteorologies.values()))
        merged_df = pd.merge(merged_df, meteorologies_df, left_on='haul_id', right_on='id', how='left',
                             suffixes=('', '_meteorology'))
    # # Get catches
    catches = Catch.objects.filter(haul__in=hauls)
    catches_df = pd.DataFrame(
        list(catches.values('id', 'category', 'weight', 'haul_id', 'sp_id', 'not_measured_individuals')))
    catches_df = catches_df.rename(columns={'id': 'catch_id'})

    # # Merge hauls and catches dataframes
    merged_df = pd.merge(merged_df, catches_df, left_on='haul_id', right_on='haul_id', how='left',
                         suffixes=('', '_catch'))

    # # Get sampled weights
    sampled_weights = SampledWeight.objects.filter(catch__in=catches)
    sampled_weights_df = pd.DataFrame(list(sampled_weights.values('catch_id', 'sampled_weight')))

    # # Merge catches and sampled weights dataframes
    merged_df = pd.merge(merged_df, sampled_weights_df, left_on='catch_id', right_on='catch_id', how='left',
                         suffixes=('', '_sampled'))

    # # Get sexes
    sexes = Sex.objects.filter(catch__in=catches)
    sexes_df = pd.DataFrame(list(sexes.values('id', 'catch_id', 'sex')))
    sexes_df = sexes_df.rename(columns={'id': 'sex_id'})

    # # Merge catches and sexes dataframes
    merged_df = pd.merge(merged_df, sexes_df, left_on='catch_id', right_on='catch_id', how='left')

    # # Get lengths
    lengths = Length.objects.filter(sex__in=sexes)
    lengths_df = pd.DataFrame(list(lengths.values()))

    # # Merge catches and lengths dataframes
    merged_df = pd.merge(merged_df, lengths_df, left_on='sex_id', right_on='sex_id', how='left',
                         suffixes=('', '_length'))

    # # Get species
    species = Sp.objects.filter(id__in=catches.values_list('sp_id', flat=True))
    species_df = pd.DataFrame(list(species.values()))

    # # Merge catches and species dataframes
    merged_df = pd.merge(merged_df, species_df, left_on='sp_id', right_on='id', how='left',
                         suffixes=('', '_species'))

    return merged_df


def get_hauls_data(acronym, include_meteorology=False):
    """
    Get trawl data (stations, hauls, trawls, meteorology) for a survey and return merged DataFrame.
    
    Args:
        acronym: Survey acronym
    Returns:
        tuple: (merged_df, survey, stations, hauls) where:
            - merged_df: DataFrame with merged stations, hauls, trawls, and meteorology
            - survey: Survey object
            - stations: QuerySet of Station objects
            - hauls: QuerySet of Haul objects  
    """
    base_df, survey, stations = get_base_survey_data(acronym)
    print(f"DEBUG: Survey acronym = '{acronym}'")
    print(f"DEBUG: Survey found = {survey}")
    print(f"DEBUG: Stations count = {stations.count()}")
    
    
    hauls = Haul.objects.filter(station__in=stations, trawl_id__isnull=False)
    print(f"DEBUG: Hauls count = {hauls.count()}")

    
    hauls_df = pd.DataFrame(list(hauls.values()))
    # Merge stations and hauls dataframes
    merged_df = pd.merge(base_df, hauls_df, left_on='station_id', right_on='station_id', how='left',
                         suffixes=('_station', '_haul'))
    merged_df = merged_df.rename(columns={'id': 'haul_id'})

    # Get haul trawls
    # When a QuerySet is empty, pd.DataFrame(list(...)) produces a DataFrame with no columns
    # Check if empty and define required columns to ensure consistent structure for merge
    trawls = HaulTrawl.objects.filter(haul_id__in=hauls)
    trawls_df = pd.DataFrame(list(trawls.values()))
    if trawls_df.empty:
        trawls_df = pd.DataFrame(columns=['id', 'haul_id', 'shooting_date_time', 'shooting_latitude',
                                          'shooting_longitude', 'shooting_depth', 'hauling_date_time',
                                          'hauling_latitude', 'hauling_longitude', 'hauling_depth',
                                          'course', 'velocity', 'cable', 'sweep',
                                          'otter_boards_distance', 'horizontal_aperture', 'vertical_aperture',
                                          'sampling_rectangle', 'track', 'comment'])
    merged_df = pd.merge(merged_df, trawls_df, left_on='haul_id', right_on='id', how='left',
                         suffixes=('', '_trawl'))

    # Conditionally get and merge meteorology data
    # When a QuerySet is empty, pd.DataFrame(list(...)) produces a DataFrame with no columns
    # Check if empty and define required columns to ensure consistent structure for merge
    if include_meteorology:
        meteorologies = Meteorology.objects.filter(haul_id__in=hauls)
        meteorologies_df = pd.DataFrame(list(meteorologies.values()))
        if meteorologies_df.empty:
            meteorologies_df = pd.DataFrame(columns=['id', 'haul_id', 'wind_direction', 'wind_velocity', 'sea_state'])
        merged_df = pd.merge(merged_df, meteorologies_df, left_on='haul_id', right_on='id', how='left',
                             suffixes=('', '_meteorology'))
    
    return merged_df

def get_hydrography_data(acronym):
    """
    Get trawl data (stations, hauls, trawls, meteorology) for a survey and return merged DataFrame.
    
    Args:
        acronym: Survey acronym
    Returns:
        tuple: (merged_df, survey, stations, hauls) where:
            - merged_df: DataFrame with merged stations, hauls, trawls, and meteorology
            - survey: Survey object
            - stations: QuerySet of Station objects
            - hauls: QuerySet of Haul objects  
    """
    base_df, survey, stations = get_base_survey_data(acronym)

    hauls = Haul.objects.filter(station__in=stations, sampler_type="CTD")
    hauls_df = pd.DataFrame(list(hauls.values()))
    hauls_df = hauls_df.rename(columns={'id': 'haul_id'})
    # Merge stations and hauls dataframes
    merged_df = pd.merge(base_df, hauls_df, left_on='station_id', right_on='station_id', how='left',
                         suffixes=('_station', '_haul'))
    # Get hydrography data
    hydrographies = HaulHydrography.objects.filter(haul_id__in=hauls)
    hydrographies_df = pd.DataFrame(list(hydrographies.values()))
    merged_hauls_df = pd.merge(merged_df, hydrographies_df, left_on='haul_id', right_on='haul_id', how='left',
                               suffixes=('', '_hydrography'))

    return merged_hauls_df


# Update REPORT_CONFIGS with the actual function references
REPORT_CONFIGS['fauna'].data_getter = get_trawl_data
REPORT_CONFIGS['lengths'].data_getter = get_trawl_data
REPORT_CONFIGS['hauls'].data_getter = get_hauls_data
REPORT_CONFIGS['hydrography'].data_getter = get_hydrography_data


# ============================================================================
# API VIEWS (Refactored)
# ============================================================================

class ReportCampFaunaCSVApi(APIView):

    def get(self, request, acronym):
        config = REPORT_CONFIGS['fauna']
        headers = [col.csv_header for col in config.columns]
        response, writer = generate_csv_response('report.csv', headers)
        
        merged_df = process_report_data(config, acronym)
        
        # Group and aggregate (fauna-specific logic)
        grouped_df = merged_df.groupby(['acronym', 'station', 'haul', 'group', 'sp_code', 'category']).agg({
            'weight': 'first',
            'not_measured_individuals': 'first',
            'number_individuals': 'sum',
            'sampled_weight': 'first'
        }).reset_index()
        
        # Calculate individuals with scaling
        needs_scaling = (
            pd.notnull(grouped_df['sampled_weight']) &
            (grouped_df['sampled_weight'] != 0) &
            (grouped_df['sampled_weight'] != grouped_df['weight']) &
            pd.notnull(grouped_df['number_individuals'])
        )
        
        has_measured = pd.notnull(grouped_df['number_individuals'])
        
        grouped_df['individuals'] = np.where(
            needs_scaling,
            (grouped_df['number_individuals'] *
             (grouped_df['weight'] / grouped_df['sampled_weight'])).round(),
            np.where(
                has_measured,
                grouped_df['number_individuals'].round(),
                grouped_df['not_measured_individuals'].fillna(0)
            )
        )
        
        grouped_df['individuals'] = grouped_df['individuals'].fillna(0).astype(int)
        
        grouped_df = grouped_df.groupby(['acronym', 'station', 'haul', 'group', 'sp_code']).agg({
            'weight': 'sum',
            'not_measured_individuals': 'first',
            'individuals': 'sum'
        }).reset_index()
        
        # Write rows using configuration
        for row in grouped_df.itertuples(index=False):
            row_data = [get_column_value(row, col) for col in config.columns]
            writer.writerow(row_data)
        
        return response


class ReportCampLengthsCSVApi(APIView):
    def get(self, request, acronym):
        config = REPORT_CONFIGS['lengths']
        headers = [col.csv_header for col in config.columns]
        response, writer = generate_csv_response('report.csv', headers)
        
        merged_df = process_report_data(config, acronym)
        
        # Get measurements
        measurements = MeasurementType.objects.all()
        measurements_df = pd.DataFrame(list(measurements.values()))
        
        merged_df = pd.merge(merged_df, measurements_df, left_on='measurement_type_id', right_on='id', how='left',
                             suffixes=('', '_measurement'))
        
        merged_df['length_converted'] = (merged_df['length'].fillna(0) / merged_df['conversion_factor']).fillna(0)
        merged_df['number_individuals'] = merged_df['number_individuals'].fillna(0)
        merged_df['sampled_weight'] = np.where(
            merged_df['sampled_weight'].isnull(),
            merged_df['weight'].fillna(0).astype(int),
            merged_df['sampled_weight'].fillna(0).astype(int)
        )
        
        # Write rows using configuration
        for row in merged_df.itertuples(index=False):
            row_data = [get_column_value(row, col) for col in config.columns]
            writer.writerow(row_data)
        
        return response


class ReportCampHaulsCSVApi(APIView):
    def get(self, request, acronym):
        config = REPORT_CONFIGS['hauls']
        headers = [col.csv_header for col in config.columns]
        response, writer = generate_csv_response('report.csv', headers)
        
        merged_df = process_report_data(config, acronym)
        
        # Write rows using configuration
        for row in merged_df.itertuples(index=False):
            row_data = [get_column_value(row, col) for col in config.columns]
            writer.writerow(row_data)
        
        return response


class ReportCampHydrographyCSVApi(APIView):
    def get(self, request, acronym):
        config = REPORT_CONFIGS['hydrography']
        headers = [col.csv_header for col in config.columns]
        response, writer = generate_csv_response('report.csv', headers)
        
        merged_df = process_report_data(config, acronym)
        
        # Write rows using configuration
        for row in merged_df.itertuples(index=False):
            row_data = [get_column_value(row, col) for col in config.columns]
            writer.writerow(row_data)
        
        return response
    

class ReportCampSpeciesCSVApi(APIView):
    def get(self, request):
        config = REPORT_CONFIGS['species']
        headers = [col.csv_header for col in config.columns]
        response, writer = generate_csv_response('report.csv', headers)
        
        # Get species data
        merged_df = pd.DataFrame(list(Sp.objects.all().values()))
        
        # Write rows using configuration
        for row in merged_df.itertuples(index=False):
            row_data = [get_column_value(row, col) for col in config.columns]
            writer.writerow(row_data)
        
        return response
