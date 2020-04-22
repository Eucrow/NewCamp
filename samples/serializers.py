from rest_framework import serializers

from samples.models import Length, SampledWeight


class LengthsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Length
        fields = '__all__'


class SampledWeightsSerializer(serializers.ModelSerializer):

    class Meta:
        model = SampledWeight
        fields = '__all__'
