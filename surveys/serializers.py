from rest_framework import serializers

from surveys.models import Survey

from stratifications.serializers import StratificationSerializer
# from stations.serializers import StationSerializer

    # , Stratum, Area, Sector


# class StratumSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Stratum
#         fields = ('depth',)
#
#
# class SectorSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Sector
#         fields = ('grid', 'name',)
#
#
# class AreaSerializer(serializers.ModelSerializer):
#     depth = StratumSerializer()
#     name = SectorSerializer()
#
#     class Meta:
#         model = Area
#         fields = ('depth', 'name',)


class SurveySerializer(serializers.ModelSerializer):
    stratification = StratificationSerializer()

    class Meta:
        model = Survey
        fields = ['id', 'acronym', 'description', 'start_date', 'end_date', 'width_x', 'width_y', 'origin_x',
                  'origin_y', 'ship', 'hauls_duration', 'unit_sample', 'stratification']

class SurveyAcronymsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Survey
        fields = ['id', 'description',]
