from rest_framework import serializers

from surveys.serializers import SurveySerializer
from hauls.models import Haul


class StratificationSerializer(serializers.ModelSerializer):
    survey = SurveySerializer(read_only=True)

    class Meta:
        model = Haul
        fields = '__all__'
        # depth = 1