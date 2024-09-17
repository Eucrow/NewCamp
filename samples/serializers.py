from rest_framework import serializers
from samples.models import Length, SampledWeight


# from not_measured_individuals.models import notMeasuredIndividual


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


class LengthDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for individual length details
    """

    class Meta:
        model = Length
        fields = ['length', 'number_individuals']


class LengthSexRetrieveSerializer(serializers.Serializer):
    """
    Serializer to retrieve lengths by sex with measurement_type_id
    """
    measurement_type_id = serializers.IntegerField()
    lengths = LengthDetailSerializer(many=True)


class LengthSexCreateSerializer(serializers.ModelSerializer):
    """

    """

    class Meta:
        model = Length
        fields = ['length', 'number_individuals', ]

# class individualSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = notMeasuredIndividual
#         fields = ['catch_id', 'number_individuals', ]
