from rest_framework import serializers
from samples.models import Length, SampledWeight
from not_measured_individuals.models import notMeasuredIndividual


class SampleWeightSerializer(serializers.ModelSerializer):
    """
    Sample Weights serializer
    """

    class Meta:
        model = SampledWeight
        fields = ['id', 'sampled_weight', 'catch_id', ]


class LengthSerializer(serializers.ModelSerializer):
    class Meta:
        model = Length
        fields = ['sex_id', 'length', 'number_individuals', ]


class LengthSexSerializer(serializers.ModelSerializer):
    """
    Lengths serializer by sex
    """
    sex_id = serializers.IntegerField(source='sex.id')
    sex = serializers.IntegerField(source='sex.sex')
    catch_id = serializers.IntegerField(source='sex.catch_id')
    length_id = serializers.IntegerField(source='id')

    class Meta:
        model = Length
        fields = ['catch_id', 'sex_id', 'sex', 'length_id', 'length', 'number_individuals', ]


class individualSerializer(serializers.ModelSerializer):
    class Meta:
        model = notMeasuredIndividual
        fields = ['catch_id', 'number_individuals', ]
