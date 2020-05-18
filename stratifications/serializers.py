from rest_framework import serializers

# from surveys.serializers import SurveySerializer
from stratifications.models import Stratification


class StratificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stratification
        fields = ['stratification', 'comment']
        depth = 1