from rest_framework import serializers

from samples.models import Sex


class SexesSerializer(serializers.ModelSerializer):
    '''
    Sex serializer.
    '''

    class Meta:
        model = Sex
        fields = ['id', 'sex', 'catch', ]


class SexSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sex
        fields = ['id', 'sex', 'catch_id', ]
