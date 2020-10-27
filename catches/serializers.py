from rest_framework import serializers

from catches.models import Catch
from samples.models import Sex, Length
from samples.serializers import SampleWeightSerializer, SexSerializer, LengthSerializer2
from species.serializers import CategorySerializer

class CatchSerializer(serializers.ModelSerializer):

    class Meta:
        model = Catch
        fields = ['id', 'weight', 'category_id', 'haul_id']

class CatchesVerboseSerializer(serializers.ModelSerializer):

    category = CategorySerializer()

    # 'samples' must be the related_name of a one to one field on SampleWeight model.
    samples = SampleWeightSerializer(required=True)

    # 'sexes' must be the related_name of a foreing key field on the Sex model.
    sexes = SexSerializer(many=True)

    class Meta:
        model = Catch
        fields = ['id', 'weight', 'haul', 'haul_id', 'category', 'samples', 'sexes', ]

    # # Override the to_representation method, which format the output of the serializer
    def to_representation(self, instance):
        # instance is the model object. Create the custom json format by accessing instance attributes normally and
        # return it

        data = super(CatchesVerboseSerializer, self).to_representation(instance)

        data['category'] = instance.category.category_name
        data['category_id'] = instance.category.id
        data['group'] = instance.category.sp.group
        data['sp_id'] = instance.category.sp.id
        data['sp_code'] = instance.category.sp.sp_code
        data['sp_name'] = instance.category.sp.sp_name

        data.update()

        return data

# Create a serializer from scratch
# class CatchesSerializer(serializers.Serializer):
#
#     weight = serializers.IntegerField()
#     haul = serializers.IntegerField(source="haul.haul")
#     category = serializers.IntegerField(source="category.category_name")
#     sp_name = serializers.CharField(source="category.sp.sp_name")
#     sp_group = serializers.IntegerField(source="category.sp.group")
#     sp_code = serializers.IntegerField(source="category.sp.sp_code")
#     samples = serializers.SlugRelatedField(many=True, read_only=True, slug_field='sampled_weight')
#     sexes = serializers.SlugRelatedField(many=True, read_only=True, slug_field='sex')
#     # lengths = serializers.SlugRelatedField(many=True, read_only=True, slug_field='sex.length')

class SexCatchSerializer (serializers.ModelSerializer):

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
