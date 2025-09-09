import csv
import pandas as pd
from django.http import HttpResponse
from rest_framework.views import APIView
from django.db.models import Sum

import catches
from conn_r import models
from surveys.models import Survey
from stations.models import Station
from hauls.models import Haul
from catches.models import Catch
from species.models import Sp, MeasurementType
from samples.models import Sex, SampledWeight, Length


class ReportLengthsCSVApi(APIView):
    # def get(self, request, **kwargs):
    def get(self, request, survey_id):
        survey = Survey.objects.get(pk=survey_id)
        stations = Station.objects.filter(survey=survey)

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
    # def get(self, request, **kwargs):
    def get(self, request, survey_id):

        survey = Survey.objects.get(pk=survey_id)
        stations = Station.objects.filter(survey=survey)

        # create response
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="report.csv"'

        # create writer
        writer = csv.writer(response)
        writer.writerow(
            ['acronym', 'haul', 'group', 'code', 'weight', 'number_individuals'])

        # get species data
        species = Sp.objects.all()
        species_df = pd.DataFrame(list(species.values('id', 'group', 'sp_code')))

        # Write data
        for station in stations:
            hauls = Haul.objects.filter(station=station, sampler_type="trawl")
            for haul in hauls:
                catches = Catch.objects.filter(haul=haul)
                catches_df = pd.DataFrame(list(catches.values()))
                if catches_df.empty:
                    break

                # Get all SampledWeight objects for these catches
                sampled_weights = SampledWeight.objects.filter(catch__in=catches)
                sampled_weights_df = pd.DataFrame(list(sampled_weights.values()))

                # Get all Sex objects for these catches
                sexes = Sex.objects.filter(catch__in=catches)
                sexes_df = pd.DataFrame(list(sexes.values()))

                # Get all Lengths objects for these catches
                lengths = Length.objects.filter(sex__in=sexes)
                lengths_df = pd.DataFrame(list(lengths.values()))

                # Merge dataframes
                merged_df = pd.merge(catches_df, species_df, left_on='sp_id', right_on='id', how='left',
                                     suffixes=('', '_species'))

                if not sexes_df.empty:
                    merged_df = pd.merge(merged_df, sexes_df, left_on='id', right_on='catch_id', how='left',
                                         suffixes=('_catch', '_sex'))
                    
                if not sampled_weights_df.empty:
                    merged_df = pd.merge(merged_df, sampled_weights_df, left_on='catch_id', right_on='catch_id',
                                         how='left', suffixes=('', '_sampled'))
                else:
                    merged_df['sampled_weight'] = None

                # Sum the measured individuals per catch
                if not lengths_df.empty:
                    measured_lengths_df = lengths_df.groupby('sex_id')['number_individuals'].sum().reset_index()
                    merged_df = pd.merge(merged_df, measured_lengths_df, left_on='id_sex', right_on='sex_id',
                                         how='left', suffixes=('', '_measured'))

                # Group by sex
                grouped_df = merged_df.groupby(['category', 'sp_id']).agg({
                    'group': 'first',
                    'sp_code': 'first',
                    'weight': 'first',
                    'not_measured_individuals': 'first',
                    'number_individuals': 'sum',
                    'sampled_weight': 'first'
                }).reset_index()

                # Calculate measured individuals
                grouped_df['measured_individuals'] = grouped_df.apply(
                    lambda row: int(round(row['number_individuals'] * (row['weight'] / row['sampled_weight'])))
                    if pd.notnull(row['sampled_weight']) and row['sampled_weight'] != row['weight']
                    else int(round(row['number_individuals'])), axis=1
                )

                for row in grouped_df.itertuples(index=False):
                    writer.writerow([survey.acronym, haul.haul, row.group, row.sp_code, row.weight,
                                 row.measured_individuals])

        return response
