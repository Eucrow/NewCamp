import csv
import pandas as pd
import numpy as np
from django.http import HttpResponse
from rest_framework.views import APIView

from surveys.models import Survey
from stations.models import Station
from hauls.models import Haul, HaulTrawl, Meteorology
from catches.models import Catch
from species.models import Sp, MeasurementType
from samples.models import Sex, SampledWeight, Length


def get_base_survey_data(acronym, include_trawl=False, include_meteorology=False):
    """
    Get base data (stations, hauls, catches) for a survey and return merged DataFrame.
    
    Args:
        acronym: Survey acronym
        include_trawl: Whether to include trawl data (default: False)
        include_meteorology: Whether to include meteorology data (default: False)
        
    Returns:
        tuple: (merged_df, survey, stations, hauls, catches) where:
            - merged_df: DataFrame with merged stations, hauls, and catches
            - survey: Survey object
            - stations: QuerySet of Station objects
            - hauls: QuerySet of Haul objects  
            - catches: QuerySet of Catch objects
    """
    # Get survey
    survey = Survey.objects.get(acronym=acronym)  # Get single object, not QuerySet
    survey_df = pd.DataFrame(list(Survey.objects.filter(acronym=acronym).values()))

    # Get stations
    stations = Station.objects.filter(survey=survey)
    stations_df = pd.DataFrame(list(stations.values('id', 'station')))

    # Merge survey and stations dataframes
    merged_df = pd.merge(survey_df, stations_df, left_on='id', right_on='id', how='left',
                         suffixes=('_survey', '_station'))

    # Get hauls
    hauls = Haul.objects.filter(station__in=stations, sampler_type="trawl")
    hauls_df = pd.DataFrame(list(hauls.values()))

    # Merge stations and hauls dataframes
    merged_hauls_df = pd.merge(merged_df, hauls_df, left_on='id', right_on='station_id', how='left',
                               suffixes=('_station', '_haul'))
    
    # Conditionally get and merge trawl data
    if include_trawl:
        trawls = HaulTrawl.objects.filter(haul_id__in=hauls)
        trawls_df = pd.DataFrame(list(trawls.values()))
        merged_hauls_df = pd.merge(merged_hauls_df, trawls_df, left_on='id_haul', right_on='id', how='left',
                                   suffixes=('', '_trawl'))
    
    # Conditionally get and merge meteorology data
    if include_meteorology:        
        meteorologies = Meteorology.objects.filter(haul_id__in=hauls)
        meteorologies_df = pd.DataFrame(list(meteorologies.values()))
        merged_hauls_df = pd.merge(merged_hauls_df, meteorologies_df, left_on='id_haul', right_on='id', how='left',
                                   suffixes=('', '_meteorology'))

    # Get catches
    catches = Catch.objects.filter(haul__in=hauls)
    catches_df = pd.DataFrame(
        list(catches.values('id', 'category', 'weight', 'haul_id', 'sp_id', 'not_measured_individuals')))

    # Merge hauls and catches dataframes
    merged_df = pd.merge(merged_hauls_df, catches_df, left_on='id_haul', right_on='haul_id', how='left',
                         suffixes=('', '_catch'))
    merged_df = merged_df.rename(columns={'id': 'catch_id'})

    # Get sampled weights
    sampled_weights = SampledWeight.objects.filter(catch__in=catches)
    sampled_weights_df = pd.DataFrame(list(sampled_weights.values('catch_id', 'sampled_weight')))

    # Merge catches and sampled weights dataframes
    merged_df = pd.merge(merged_df, sampled_weights_df, left_on='catch_id', right_on='catch_id', how='left',
                         suffixes=('', '_sampled'))

    # Get sexes
    sexes = Sex.objects.filter(catch__in=catches)
    sexes_df = pd.DataFrame(list(sexes.values('id', 'catch_id', 'sex')))
    sexes_df = sexes_df.rename(columns={'id': 'sex_id'})

    # Merge catches and sexes dataframes
    merged_df = pd.merge(merged_df, sexes_df, left_on='catch_id', right_on='catch_id', how='left')

    # Get lengths
    lengths = Length.objects.filter(sex__in=sexes)
    lengths_df = pd.DataFrame(list(lengths.values()))

    # Merge catches and lengths dataframes
    merged_df = pd.merge(merged_df, lengths_df, left_on='sex_id', right_on='sex_id', how='left',
                         suffixes=('', '_length'))

    # Get species
    species = Sp.objects.filter(id__in=catches.values_list('sp_id', flat=True))
    species_df = pd.DataFrame(list(species.values()))

    # Merge catches and species dataframes
    merged_df = pd.merge(merged_df, species_df, left_on='sp_id', right_on='id', how='left',
                         suffixes=('', '_species'))

    return merged_df

class ReportCampFaunaCSVApi(APIView):

    def get(self, request, acronym):
        # Create response
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="report.csv"'

        # Create writer
        writer = csv.writer(response)
        writer.writerow(
            ['acronym', 'haul', 'group', 'code', 'weight', 'number_individuals'])

        # Get base data using helper function
        merged_df = get_base_survey_data(acronym)

        grouped_df = merged_df.groupby(['acronym', 'station', 'haul', 'group', 'sp_code', 'category']).agg({
            'weight': 'first',
            'not_measured_individuals': 'first',
            'number_individuals': 'sum',
            'sampled_weight': 'first'
        }).reset_index()

        # With a apply it would be easyly understood, but with numphy is extremely faster
        # Step 1: Create boolean conditions
        needs_scaling = (
                pd.notnull(grouped_df['sampled_weight']) &
                (grouped_df['sampled_weight'] != 0) &
                (grouped_df['sampled_weight'] != grouped_df['weight']) &
                pd.notnull(grouped_df['number_individuals'])
        )

        has_measured = pd.notnull(grouped_df['number_individuals'])

        # Step 2: Apply vectorized conditional logic with proper NaN handling
        grouped_df['individuals'] = np.where(
            # Condition: Need to scale based on sampled weight
            needs_scaling,

            # Action: Scale the measurements
            (grouped_df['number_individuals'] *
             (grouped_df['weight'] / grouped_df['sampled_weight'])).round(),

            # Alternative: Use measured individuals OR not_measured_individuals
            np.where(
                has_measured,  # If we have measured data
                grouped_df['number_individuals'].round(),
                grouped_df['not_measured_individuals'].fillna(0)
            )
        )

        grouped_df['individuals'] = grouped_df['individuals'].fillna(0).astype(int)

        grouped_df = grouped_df.groupby(['acronym', 'station', 'haul', 'group', 'sp_code', ]).agg({
            'weight': 'sum',
            'not_measured_individuals': 'first',
            'individuals': 'sum'
        }).reset_index()

        for row in grouped_df.itertuples(index=False):
            writer.writerow([row.acronym, row.haul, int(row.group), int(row.sp_code), int(row.weight),
                             int(row.individuals)])

        return response


class ReportCampLengthsCSVApi(APIView):
    def get(self, request, acronym):
        # Get base data using shared helper function
        merged_df = get_base_survey_data(acronym)

        # Get measurements
        measurements = MeasurementType.objects.all()
        measurements_df = pd.DataFrame(list(measurements.values()))

        # create response
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="report.csv"'

        # create writer
        writer = csv.writer(response)
        writer.writerow(
            ['acronym', 'haul', 'group', 'code', 'category', 'sex',
             'sampled_weight', 'weight', 'length', 'number_individuals'])

        merged_df = pd.merge(merged_df, measurements_df, left_on='measurement_type_id', right_on='id', how='left',
                             suffixes=('', '_measurement'))

        merged_df['length_converted'] = (merged_df['length'].fillna(0) / merged_df['conversion_factor']).fillna(0)
        merged_df['number_individuals'] = merged_df['number_individuals'].fillna(0)
        merged_df['sampled_weight'] = np.where(
            merged_df['sampled_weight'].isnull(),
            merged_df['weight'].fillna(0).astype(int),
            merged_df['sampled_weight'].fillna(0).astype(int)
        )

        # Write data
        for row in merged_df.itertuples(index=False):
            writer.writerow(
                [row.acronym, row.haul, row.group, row.sp_code, row.category, row.sex,
                 row.sampled_weight, row.weight, int(row.length_converted), int(row.number_individuals)])


        return response


class ReportCampHaulsCSVApi(APIView):
    def get(self, request, acronym):

        # Get base data using shared helper function with trawl data
        merged_df = get_base_survey_data(acronym, include_trawl=True, include_meteorology=True)

        # Create response
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="report.csv"'

        # Create writer
        writer = csv.writer(response)

        # LANCE;FECHA;ARTE;VALIDEZ;HORA_L;LATITUD_L;NSL;LONGITUD_L;EWL;PROF_L;HORA_V;LATITUD_V;NSV;LONGITUD_V;EWV;PROF_V;
        # RUMBO;VELOCIDAD;CABLE;MALLETAS;DISTA_P;ABERT_H;ABERT_V;CUADRICULA;RECORRIDO;
        # DIR_VIENTO;VEL_VIENTO;EST_MAR;SECTOR;ESTRATO;TEMP;SALI;ESTN;OBSERV << FALTAN LOS DATOS DE METEOROLOGIA
# hay que añadir gear
        writer.writerow(
            ['acronym', 'station', 'haul','FECHA', 'ARTE', 'valid',
             'shooting_date_time', 'shooting_latitude', 'shooting_longitude', 'shooting_depth',
             'hauling_date_time', 'hauling_latitude', 'hauling_longitude', 'hauling_depth',
             'course', 'velocity', 'cable', 'sweep',
             'otter_boards_distance', 'horizontal_aperture', 'vertical_aperture',
             'CUADRICULA', 'track',
             'wind_direction', 'wind_velocity', 'sea_state',
             'SECTOR', 'ESTRATO', 'TEMP', 'SALI', 'station',
             'comment'])
        

        # Write data
        for row in merged_df.itertuples(index=False):
            writer.writerow([
                row.acronym, row.station, row.haul, 'GEAR', row.valid,
                getattr(row, 'shooting_date_time', ''), getattr(row, 'shooting_latitude', ''), getattr(row, 'shooting_longitude', ''), getattr(row, 'shooting_depth', ''),
                getattr(row, 'hauling_date_time', ''), getattr(row, 'hauling_latitude', ''), getattr(row, 'hauling_longitude', ''), getattr(row, 'hauling_depth', ''),
                getattr(row, 'course', ''), getattr(row, 'velocity', ''), getattr(row, 'cable', ''), getattr(row, 'sweep', ''),
                getattr(row, 'otter_boards_distance', ''), getattr(row, 'horizontal_aperture', ''), getattr(row, 'vertical_aperture', ''),
                getattr(row, 'sampling_rectangle', ''), getattr(row, 'track', ''),
                getattr(row, 'wind_direction', ''), getattr(row, 'wind_velocity', ''), getattr(row, 'sea_state', ''),
                'SECTOR', 'ESTRATO', 'TEMP', 'SALI', row.station,
                getattr(row, 'comment', '')
            ])



        return response