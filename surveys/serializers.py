from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField

from surveys.models import Survey
from stations.models import Station

from strata.serializers import StrataSerializer
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
    strata = StrataSerializer(many=True, read_only=True)
    stratification = StratificationSerializer()
    # station = StationSerializer(many=True, read_only=True)

    class Meta:
        model = Survey
        fields = ['id', 'acronym', 'description', 'ship', 'stratification', 'strata']
        depth = 3






class SurveyAcronymsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Survey
        fields = ['id', 'description',]
        # depth = 1
