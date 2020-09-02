from rest_framework import serializers

from catches.models import Catch
from samples.serializers import SampleWeightSerializer, SexSerializer
from species.serializers import CategorySerializer

class CatchSerializer(serializers.ModelSerializer):

    class Meta:
        model = Catch
        fields = ['weight', 'category_id', 'haul_id']

class CatchesVerboseSerializer(serializers.ModelSerializer):

    category = CategorySerializer()

    # 'samples' must be the related_name of a one to one field on SampleWeight model.
    samples = SampleWeightSerializer(required=True)

    # 'sexes' must be the related_name of a foreing key field on the Sex model.
    sexes = SexSerializer(many=True)

    class Meta:
        model = Catch
        fields = ['id', 'weight', 'haul', 'category', 'samples', 'sexes', ]

    # # Override the to_representation method, which format the output of the serializer
    def to_representation(self, instance):
        # instance is the model object. Create the custom json format by accessing instance attributes normaly and
        # return it

        data = super(CatchesVerboseSerializer, self).to_representation(instance)

        data['category'] = instance.category.category_name
        data['category_id'] = instance.category.id
        data['group'] = instance.category.sp.group
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
