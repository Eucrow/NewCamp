from rest_framework import serializers

# from surveys.serializers import SurveySerializer
from stratifications.models import Stratification
from strata.serializers import StrataSerializer


class StratificationSerializer(serializers.ModelSerializer):
    strata = StrataSerializer(many=True, read_only=True)

    class Meta:
        model = Stratification
        fields = ['stratification', 'comment', 'strata']
        # depth = 1