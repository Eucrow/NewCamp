from rest_framework import serializers

from ships.models import Ship
from stratifications.models import Stratification
from surveys.models import Survey

from stratifications.serializers import StratificationSerializer


class SurveySerializer(serializers.ModelSerializer):
    stratification = serializers.PrimaryKeyRelatedField(queryset=Stratification.objects.all())
    ship = serializers.PrimaryKeyRelatedField(queryset=Ship.objects.all())
    stratification_name = serializers.CharField(source='stratification.stratification', read_only=True)
    ship_name = serializers.CharField(source='ship.name', read_only=True)

    class Meta:
        model = Survey
        fields = ['id', 'acronym', 'description', 'start_date', 'end_date', 'width_x', 'width_y', 'origin_x',
                  'origin_y', 'ship', 'ship_name', 'hauls_duration', 'comment', 'stratification',
                  'stratification_name']


class SurveyAcronymsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = ['id', 'description', ]


