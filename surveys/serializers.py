from rest_framework import serializers

from surveys.models import Survey

from stratifications.serializers import StratificationSerializer


class SurveySerializer(serializers.ModelSerializer):
    # stratification = StratificationSerializer()

    class Meta:
        model = Survey
        # fields = ['id', 'acronym', 'description', 'start_date', 'end_date', 'width_x', 'width_y', 'origin_x',
        #           'origin_y', 'ship', 'hauls_duration', 'unit_sample', 'stratification']
        fields = ['id', 'acronym', 'description', 'start_date', 'end_date', 'width_x', 'width_y', 'origin_x',
                  'origin_y', 'ship', 'hauls_duration', 'unit_sample']

class SurveyAcronymsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Survey
        fields = ['id', 'description',]
