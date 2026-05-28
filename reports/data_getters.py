import pandas as pd

from surveys.models import Survey
from stations.models import Station
from hauls.models import Haul, HaulTrawl, Meteorology, HaulHydrography
from strata.models import Stratum
from catches.models import Catch
from species.models import Sp
from samples.models import Sex, SampledWeight, Length

def get_survey_stations_data(acronym):
    """
    Get base data (survey, stations) for a survey and return merged DataFrame.
    
    Args:
        acronym: Survey acronym
        
    Returns:
        tuple: (merged_df, survey, stations, hauls, catches) where:
            - merged_df: DataFrame with merged stations, hauls, and catches
            - survey: Survey object
            - stations: QuerySet of Station objects
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
    base_df, survey, stations = get_survey_stations_data(acronym)
    
    
    hauls = Haul.objects.filter(station__in=stations, trawl_id__isnull=False)
    
    hauls_df = pd.DataFrame(list(hauls.values(
        'id','haul','valid','sampler_type','ctd_id','sampler_id','station_id','trawl_id',
        'special','stratum_id', 'stratum__stratum'
    )))

    # Handle empty QuerySet
    if hauls_df.empty:
        hauls_df = pd.DataFrame(columns=['id','haul','valid','sampler_type','ctd_id','sampler_id','station_id','trawl_id',
        'special','stratum_id', 'stratum__stratum'])

    hauls_df = hauls_df.rename(columns={'id': 'haul_id', 'stratum__stratum': 'stratum'})
    
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


def get_hauls_data(acronym, include_hidrography=True, include_meteorology=False):
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
    base_df, survey, stations = get_survey_stations_data(acronym)    
    
    # Get hauls and stratum for the stations
    hauls = Haul.objects.filter(station__in=stations).select_related('stratum__stratum')


    hauls_df = pd.DataFrame(list(hauls.values(
        'id','haul','valid','sampler_type','ctd_id','sampler_id','station_id','trawl_id',
        'special','stratum_id', 'stratum__stratum'
    )))

    # Handle empty QuerySet
    if hauls_df.empty:
        hauls_df = pd.DataFrame(columns=['id','haul','valid','sampler_type','ctd_id','sampler_id','station_id','trawl_id',
        'special','stratum_id', 'stratum__stratum'])

    hauls_df = hauls_df.rename(columns={'id': 'haul_id', 'stratum__stratum': 'stratum'})

    # Merge stations and hauls dataframes
    stations_hauls_df = pd.merge(base_df, hauls_df, left_on='station_id', right_on='station_id', how='left',
                         suffixes=('_station', '_haul'))
    stations_hauls_df = stations_hauls_df.rename(columns={'id': 'haul_id'})

    # Get haul trawls
    # When a QuerySet is empty, pd.DataFrame(list(...)) produces a DataFrame with no columns
    # Check if empty and define required columns to ensure consistent structure for merge
    trawls = HaulTrawl.objects.filter(haul__station__in=stations)
    
    trawls_df = pd.DataFrame(list(trawls.values()))
    print(f"DEBUG: trawls_df shape: {trawls_df.shape}")
    if trawls_df.empty:
        trawls_df = pd.DataFrame(columns=['id', 'haul_id', 'shooting_date_time', 'shooting_latitude',
                                          'shooting_longitude', 'shooting_depth', 'hauling_date_time',
                                          'hauling_latitude', 'hauling_longitude', 'hauling_depth',
                                          'course', 'velocity', 'cable', 'sweep',
                                          'otter_boards_distance', 'horizontal_aperture', 'vertical_aperture',
                                          'sampling_rectangle', 'track', 'comment'])
    stations_hauls_trawls_df = pd.merge(stations_hauls_df, trawls_df, left_on='haul_id', right_on='haul_id', how='left',
                         suffixes=('', '_trawl'))
    stations_hauls_trawls_df = stations_hauls_trawls_df[stations_hauls_trawls_df['trawl_id'].notna()]
    
    
    if include_hidrography:
        # Get hydrography data
        hydrographies = HaulHydrography.objects.filter(haul__station__in=stations)
        
        hydrographies_df = pd.DataFrame(list(hydrographies.values()))
        print(f"DEBUG: hydrographies_df shape: {hydrographies_df.shape}")

        if hydrographies_df.empty:
            hydrographies_df = pd.DataFrame(columns=['id', 'haul_id', 'latitude', 'longitude', 'date_time',
                                                    'depth_probe', 'cable', 'depth',
                                                    'temperature_0', 'salinity_0', 'sigma_0',
                                                    'temperature_50', 'salinity_50', 'sigma_50',
                                                    'temperature_100', 'salinity_100', 'sigma_100',
                                                    'temperature', 'salinity', 'sigma', 'comment'])
        stations_hauls_hydrographies_df = pd.merge(stations_hauls_df, hydrographies_df, left_on='haul_id', right_on='haul_id', how='left',
                                suffixes=('', '_hydrography'))
        stations_hauls_hydrographies_df = stations_hauls_hydrographies_df[stations_hauls_hydrographies_df['ctd_id'].notna()]

    # Conditionally get and merge meteorology data
    # When a QuerySet is empty, pd.DataFrame(list(...)) produces a DataFrame with no columns
    # Check if empty and define required columns to ensure consistent structure for merge
    if include_meteorology:
        meteorologies = Meteorology.objects.filter(haul_id__in=hauls)
        meteorologies_df = pd.DataFrame(list(meteorologies.values()))
        if meteorologies_df.empty:
            meteorologies_df = pd.DataFrame(columns=['id', 'haul_id', 'wind_direction', 'wind_velocity', 'sea_state'])
        stations_hauls_meteorologies_df = pd.merge(stations_hauls_df, meteorologies_df, left_on='haul_id', right_on='id', how='left',
                             suffixes=('', '_meteorology'))

    # Select only temperature and salinity columns from hydrographies
    hydro_temp_salinity_cols = ['haul', 'temperature', 'salinity']
    hydro_subset = stations_hauls_hydrographies_df[[col for col in hydro_temp_salinity_cols if col in stations_hauls_hydrographies_df.columns]]
  
    
    merged_df = pd.merge(stations_hauls_trawls_df, hydro_subset, on='haul', how='left')

     
    return merged_df

def get_hydrography_data(acronym):
    """
    Get hidrography data for a survey and return DataFrame.
    
    Args:
        acronym: Survey acronym
    Returns:
        tuple: (merged_df, survey, stations, hauls) where:
            - merged_df: DataFrame with merged stations, hauls, trawls, and meteorology
            - survey: Survey object
            - stations: QuerySet of Station objects
            - hauls: QuerySet of Haul objects  
    """
    base_df, survey, stations = get_survey_stations_data(acronym)
    
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

def get_species_data():
    """
    Get species data merged with measurement types and return DataFrame.
    
    Returns:
        DataFrame with species and measurement type information
    """
    # Get species with related measurement types using Django ORM
    species = Sp.objects.select_related('measurement_type').all()
    
    # Convert to DataFrame with related measurement_type fields
    species_list = list(species.values(
        'id', 'group', 'sp_code', 'sp_name', 'spanish_name', 'a_param', 'b_param', 'APHIA',
        'measurement_type_id', 'measurement_type__name', 'measurement_type__increment',
        'measurement_type__conversion_factor'
    ))
    
    species_df = pd.DataFrame(species_list)
    
    # Rename measurement_type columns for clarity
    species_df = species_df.rename(columns={
        'measurement_type__name': 'measurement_name',
        'measurement_type__increment': 'increment',
        'measurement_type__conversion_factor': 'conversion_factor'
    })
    
    return species_df
