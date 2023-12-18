from rest_framework import serializers

from stratifications.models import Stratification
from surveys.models import Survey

from stratifications.serializers import StratificationSerializer


class SurveySerializer(serializers.ModelSerializer):
    stratification_id = serializers.IntegerField(source='stratification.id')
    stratification = serializers.CharField(source='stratification.stratification', read_only=True)

    class Meta:
        model = Survey
        fields = ['id', 'acronym', 'description', 'start_date', 'end_date', 'width_x', 'width_y', 'origin_x',
                  'origin_y', 'ship', 'hauls_duration', 'comment', 'stratification_id', 'stratification']

    def create(self, validated_data):
        stratification_id = validated_data.pop('stratification').pop('id')
        stratification = Stratification.objects.get(id=stratification_id)
        survey = Survey.objects.create(stratification=stratification, **validated_data)
        return survey

    def update(self, instance, validated_data):
        stratification_id = validated_data.pop('stratification', None).pop('id', None)
        if stratification_id is not None:
            stratification = Stratification.objects.get(id=stratification_id)
            instance.stratification = stratification
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class SurveyAcronymsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = ['id', 'description', ]
