from rest_framework import serializers
from rest_framework.fields import SerializerMethodField

from catches.models import Catch
from samples.models import Sex, Length, SampledWeight
from samples.serializers import SampleWeightSerializer, LengthSerializer2
# from sexes.serializers import SexesExistsSerializer
# from species.serializers import CategorySerializer
from species.models import Sp
from species.serializers import SpSimpleSerializer


class CatchSerializer(serializers.ModelSerializer):
    sp_name = serializers.CharField(source='sp.sp_name', read_only=True)
    group = serializers.IntegerField(source='sp.group', read_only=True)
    sp_code = serializers.IntegerField(source='sp.sp_code', read_only=True)
    catch_id = serializers.IntegerField(source='id', read_only=True)

    class Meta:
        model = Catch
        fields = ['catch_id', 'haul_id', 'group', 'sp_code',
                  'weight', 'sp_name', 'category']


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

    class Meta:
        model = Catch
        fields = ['catch_id', 'weight', 'category', 'haul', 'haul_id', 'group', 'sp_id', 'sp_code',
                  'sp_name', 'unit', 'increment', 'sampled_weight']


class SexCatchSerializer(serializers.ModelSerializer):
    lengths = LengthSerializer2(many=True)

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
