import csv
from django.http import HttpResponse
from rest_framework.views import APIView

from surveys.models import Survey
from stations.models import Station
from hauls.models import Haul
from catches.models import Catch
from species.models import Sp
from samples.models import Sex, SampledWeight, Length


class ReportCsvApi(APIView):
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
            ['acronym', 'Station ID', 'Haul ID', 'station', 'haul', 'valid', 'category', 'weight',
             'not_measured_individuals', 'species', 'group', 'code', 'sampled_weight', 'sex',
             'measurement_type', 'length', 'number_individuals'])

        # Write data
        for station in stations:
            hauls = Haul.objects.filter(station=station)
            for haul in hauls:
                catches = Catch.objects.filter(haul=haul)
                for catch in catches:
                    species = Sp.objects.get(pk=catch.sp_id)
                    try:
                        sampled_weight = SampledWeight.objects.get(pk=catch.id)
                        sampled_weight_value = sampled_weight.sampled_weight
                    except SampledWeight.DoesNotExist:
                        sampled_weight_value = None
                    sexes = Sex.objects.filter(catch=catch)
                    for sex in sexes:
                        lengths = Length.objects.filter(sex=sex)
                        for length in lengths:
                            writer.writerow(
                                [survey.acronym, station.station, haul.id, station.station, haul.haul,
                                 haul.valid, catch.category, catch.weight, catch.not_measured_individuals,
                                 species.sp_name,
                                 species.group, species.sp_code, sampled_weight_value, sex.sex,
                                 sex.measurement_type_id, length.length, length.number_individuals])

        return response
