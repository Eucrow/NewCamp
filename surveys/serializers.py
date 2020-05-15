from rest_framework import serializers

from surveys.models import Survey
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

    class Meta:
        model = Survey
        fields = '__all__'
        depth = 1

class SurveyAcronymsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Survey
        fields = ['id', 'description',]
        # depth = 1
