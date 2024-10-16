import csv
from django.http import HttpResponse
from rest_framework.views import APIView

from surveys.models import Survey
from stations.models import Station
from hauls.models import Haul
from catches.models import Catch
from species.models import Sp, MeasurementType
from samples.models import Sex, SampledWeight, Length


class ReportLengthsCSVApi(APIView):
    # def get(self, request, **kwargs):
    def get(self, request, survey_id):

        # survey_id = request.GET.get('survey_id')
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
