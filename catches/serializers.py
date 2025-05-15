from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from catches.models import Catch
from samples.models import Sex, Length, SampledWeight
from samples.serializers import SampleWeightSerializer, LengthSerializer

from species.models import Sp
from species.serializers import SpSimpleSerializer


class CatchesVerboseSerializer(serializers.ModelSerializer):
    group = serializers.CharField(source='sp.group', read_only=True)
    catch_id = serializers.IntegerField(source='id')
    sp_id = serializers.IntegerField(source='sp.id', read_only=True)
    sp_code = serializers.CharField(source='sp.sp_code', read_only=True)
    sp_name = serializers.CharField(source='sp.sp_name', read_only=True)
    unit = serializers.CharField(source='sp.unit', read_only=True)
    increment = serializers.FloatField(source='sp.increment', read_only=True)
    sampled_weight = serializers.FloatField(
        source='samples.sampled_weight', required=False, read_only=True)

    # if not_measure_individuals is empty, convert to None
    def to_internal_value(self, data):
        if 'not_measured_individuals' in data and data['not_measured_individuals'] == "":
            data = data.copy()
            data['not_measured_individuals'] = None
        return super().to_internal_value(data)

    class Meta:
        model = Catch
        fields = ['catch_id', 'category', 'weight', 'not_measured_individuals', 'haul', 'haul_id', 'group', 'sp_id',
                  'sp_code', 'sp_name', 'unit', 'increment', 'sampled_weight',
                  ]

    # This is the validation of sampled weight when a new catch is created:
    def validate(self, data):
        sampled_weight = self.initial_data.get('sampled_weight')
        weight = data.get('weight')

        if sampled_weight and weight:
            if float(sampled_weight) > float(weight):
                raise serializers.ValidationError({
                    'sampled_weight': 'Sampled weight cannot be greater than total weight.'
                })

        return data


class SexCatchSerializer(serializers.ModelSerializer):
    lengths = LengthSerializer(many=True)

    class Meta:
        model = Sex
        fields = ['id', 'sex', 'catch', 'lengths', ]

    # This is a nested serializer, so we have to overwrite the create function
    def create(self, validated_data):
        # Firstly, get the data from the nested parts
        lengths_data = validated_data.pop('lengths')
        # Secondly, save the Sex
        sex = Sex.objects.create(**validated_data)
        # Then, save the nested parts in its own models
        for length in lengths_data:
            Length.objects.create(sex=sex, **length)
        # And finally, return the sex
        return sex
