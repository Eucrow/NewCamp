import csv
import pandas as pd
import numpy as np
from django.http import HttpResponse
from rest_framework.views import APIView

from surveys.models import Survey
from stations.models import Station
from hauls.models import Haul
from catches.models import Catch
from species.models import Sp, MeasurementType
from samples.models import Sex, SampledWeight, Length


def get_base_survey_data(acronym):
    """
    Get base data (stations, hauls, catches) for a survey and return merged DataFrame.
    
    Args:
        acronym: Survey acronym
        
    Returns:
        tuple: (merged_df, survey, stations, hauls, catches) where:
            - merged_df: DataFrame with merged stations, hauls, and catches
            - survey: Survey object
            - stations: QuerySet of Station objects
            - hauls: QuerySet of Haul objects  
            - catches: QuerySet of Catch objects
    """
    # Get survey
    survey = Survey.objects.get(acronym=acronym)
    
    # Get stations
    stations = Station.objects.filter(survey=survey)
    stations_df = pd.DataFrame(list(stations.values('id', 'station')))

    # Get hauls
    hauls = Haul.objects.filter(station__in=stations, sampler_type="trawl")
    hauls_df = pd.DataFrame(list(hauls.values('id', 'haul', 'station_id')))

    # Merge stations and hauls dataframes
    merged_hauls_df = pd.merge(stations_df, hauls_df, left_on='id', right_on='station_id', how='left',
                               suffixes=('_station', '_haul'))
    merged_hauls_df = merged_hauls_df[['station_id', 'station', 'id_haul', 'haul']]

    # Get catches
    catches = Catch.objects.filter(haul__in=hauls)
    catches_df = pd.DataFrame(list(catches.values('id', 'category', 'weight', 'haul_id', 'sp_id', 'not_measured_individuals')))

    # Merge hauls and catches dataframes
    merged_df = pd.merge(merged_hauls_df, catches_df, left_on='id_haul', right_on='haul_id', how='left',
                         suffixes=('', '_catch'))
    merged_df = merged_df.rename(columns={'id': 'catch_id'})
    
    return merged_df, survey, stations, hauls, catches


class ReportLengthsCSVApi(APIView):
    def get(self, request, acronym):
        # Get base data using shared helper function
        merged_df, survey, stations, hauls, catches = get_base_survey_data(acronym)

        # create response
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="report.csv"'

        # create writer
        writer = csv.writer(response)
        writer.writerow(
            ['acronym', 'Station ID', 'Haul ID', 'station', 'haul', 'valid',
             'species', 'group', 'code', 'category', 'weight',
             'sampled_weight', 'not_measured_individuals', 'sex',
             'measurement_type', 'measurement', 'length', 'number_individuals'])

        # Write data
        for station in stations:
            hauls = Haul.objects.filter(station=station)
            for haul in hauls:
                catches = Catch.objects.filter(haul=haul)
                for catch in catches:
                    species = Sp.objects.get(pk=catch.sp_id)
                    measurements = MeasurementType.objects.get(sp=species)
                    try:
                        sampled_weight = SampledWeight.objects.get(catch_id=catch.id)
                        sampled_weight_value = sampled_weight.sampled_weight
                    except SampledWeight.DoesNotExist:
                        sampled_weight_value = None

                    sexes = Sex.objects.filter(catch=catch)

                    if sexes.exists():
                        for sex in sexes:
                            lengths = Length.objects.filter(sex=sex)
                            for length in lengths:
                                length_converted = length.length / measurements.conversion_factor
                                writer.writerow(
                                    [survey.acronym, station.station, haul.id, station.station, haul.haul,
                                     haul.valid, species.sp_name,
                                     species.group, species.sp_code, catch.category, catch.weight,
                                     sampled_weight_value, catch.not_measured_individuals, sex.sex,
                                     sex.measurement_type_id, measurements.name, length_converted,
                                     length.number_individuals])
                    else:
                        writer.writerow(
                            [survey.acronym, station.station, haul.id, station.station, haul.haul,
                             haul.valid, species.sp_name,
                             species.group, species.sp_code, catch.category, catch.weight,
                             sampled_weight_value, catch.not_measured_individuals])

        return response


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
        merged_df, survey, stations, hauls, catches = get_base_survey_data(acronym)
        merged_df = merged_df[
            ['station_id', 'station', 'id_haul', 'haul', 'catch_id', 'sp_id', 'category', 'weight',
             'not_measured_individuals']]

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
        lengths_df = pd.DataFrame(list(lengths.values('sex_id', 'number_individuals')))

        # Merge catches and lengths dataframes
        merged_df = pd.merge(merged_df, lengths_df, left_on='sex_id', right_on='sex_id', how='left',
                             suffixes=('', '_length'))

        # Get species
        species = Sp.objects.filter(id__in=catches.values_list('sp_id', flat=True))
        species_df = pd.DataFrame(list(species.values('id', 'group', 'sp_code')))

        # Merge catches and species dataframes
        merged_df = pd.merge(merged_df, species_df, left_on='sp_id', right_on='id', how='left',
                             suffixes=('', '_species'))

        grouped_df = merged_df.groupby(['station', 'haul', 'group', 'sp_code', 'category']).agg({
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

        grouped_df = grouped_df.groupby(['station', 'haul', 'group', 'sp_code', ]).agg({
            'weight': 'sum',
            'not_measured_individuals': 'first',
            'individuals': 'sum'
        }).reset_index()

        for row in grouped_df.itertuples(index=False):
            writer.writerow([survey.acronym, row.haul, int(row.group), int(row.sp_code), int(row.weight),
                             int(row.individuals)])

        return response
