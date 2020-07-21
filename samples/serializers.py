from rest_framework import serializers

from samples.models import Length, SampledWeight, Sex

class SampleWeightSerializer(serializers.ModelSerializer):
    """
    Sample Weights serializer
    """

    class Meta:
        model = SampledWeight
        fields = ['sampled_weight', ]


class LenghtSerializer(serializers.ModelSerializer):
    """
    Lengths serializer
    """
    class Meta:
        model = Length
        fields = ['length', 'number_individuals']


class LengthsBySexSerializer(serializers.ModelSerializer):
    """
    Lengths By Sex serializer.
    """
    lengths = LenghtSerializer(many=True)

    class Meta:
        model = Sex
        fields = ['sex', 'lengths']

