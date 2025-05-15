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

    # This is the validation of sampled weight, both when is created and when is updated.
    def validate(self, data):
        sampled_weight = data.get('sampled_weight') or self.initial_data.get('sampled_weight')
        weight = self.initial_data.get('weight')

        if sampled_weight is not None and weight is not None:
            if float(sampled_weight) > float(weight):
                raise serializers.ValidationError({
                    'sampled_weight': 'Sampled weight cannot be greater than total weight.'
                })

        return data


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
