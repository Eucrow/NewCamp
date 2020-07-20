from rest_framework import serializers

from catches.models import Catch

from species.serializers import CategorySerializer
from samples.models import SampledWeight

class SampleWeightSerializer(serializers.ModelSerializer):

    class Meta:
        model = SampledWeight
        fields = ['sampled_weight', 'catch_id', ]

class CatchesSerializer(serializers.Serializer):

    # category = CategorySerializer()
    # sampled_weight = SampleWeightSerializer()

    # sp = serializers.CharField(source="category.sp_id.sp_name")
    weight = serializers.IntegerField()
    haul = serializers.IntegerField(source="haul.haul")
    category = serializers.IntegerField(source="category.category_name")
    sp_name = serializers.CharField(source="category.sp.sp_name")
    sp_group = serializers.IntegerField(source="category.sp.group")
    sp_code = serializers.IntegerField(source="category.sp.sp_code")
    samples = serializers.SlugRelatedField(many=True, read_only=True, slug_field='sampled_weight')
    lengths = serializers.SlugRelatedField(many=True, read_only=True, slug_field='length')
    # sampled_weight = serializers.IntegerField(source="sampled_weight")


    # class Meta:
    #     model = Catch
    #     fields = ['id', 'weight', 'haul', 'category', 'sp', ]

    # # Override the to_representation method, which format the output of the serializer
    # def to_representation(self, instance):
    #     # instance is the model object. Create the custom json format by accessing instance attributes normaly and
    #     # return it
    #     id = instance.id
    #     haul = instance.haul.haul
    #     sp_code = instance.category.sp.sp_code
    #     sp_name = instance.category.sp.sp_name
    #     category = instance.category.category_name
    #     weight = instance.weight
    #     sampled_weight = instance.sampled_weight
    #
    #     representation = dict(id=id, haul=haul, sp_code=sp_code, sp_name=sp_name, category=category, weight=weight,
    #                           sampled_weight=sampled_weight)
    #
    #     return representation

# class categorySerializer(serializers.Serializer):
#     category_name = serializers.CharField()
#
# class catchesSerializer(serializers.Serializer):
#     weight = serializers.IntegerField()
#
# class CatchesSerializer(serializers.Serializer):
#     category = categorySerializer(source='*')
#     weight = catchesSerializer(source='*')