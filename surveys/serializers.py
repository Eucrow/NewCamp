from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField

from surveys.models import Survey
from stations.models import Station

# from strata.serializers import StrataSerializer
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

class StationSerializer(serializers.ModelSerializer):

    # station_id = serializers.PrimaryKeyRelatedField(queryset=Survey.objects.all(), source='Station.id')

    class Meta:
        model = Station
        fields = ['station', 'station_id']

class SurveySerializer(serializers.ModelSerializer):
    # strata = StrataSerializer(many=True, read_only=True)
    stratification = StratificationSerializer(many=True, read_only=True)
    # station = StationSerializer(many=True, read_only=True)

    class Meta:
        model = Survey
        fields = ['id', 'acronym', 'description', 'ship', 'stratification']
        depth = 2






class SurveyAcronymsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Survey
        fields = ['id', 'description',]
        # depth = 1
