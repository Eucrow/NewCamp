from rest_framework import serializers

from catches.models import Catch
from samples.models import Sex, Length
from samples.serializers import SampleWeightSerializer, SexSerializer, LengthSerializer2
# from species.serializers import CategorySerializer
from species.serializers import SpBasicSerializer


class CatchSerializer(serializers.ModelSerializer):

    class Meta:
        model = Catch
        fields = ['id', 'weight', 'sp_id', 'category', 'haul_id']

class CatchesVerboseSerializer(serializers.ModelSerializer):

    # category = CategorySerializer()
    sp = SpBasicSerializer()
    # species_name = serializers.RelatedField(source='species.Sp.name', read_only=True)
    # specie_sp_name = serializers.CharField(source='species.Sp.name')


    # 'samples' must be the related_name of a one to one field on SampleWeight model.
    samples = SampleWeightSerializer(required=True)


    # 'sexes' must be the related_name of a foreing key field on the Sex model.
    sexes = SexSerializer(many=True)

    class Meta:
        model = Catch
        fields = ['id', 'weight', 'category', 'haul', 'sp', 'samples', 'sexes', ]

    # Override the to_representation method, which format the output of the serializer
    # Example of use to_representation. In this case, the category model is related by a foreing key with the species model.
    # To avoid the nested serializer of species inside category, modify the to_representation model as this:
    def to_representation(self, instance):
        # instance is the model object. Create the custom json format by accessing instance attributes normally and
        # return it

        data = super(CatchesVerboseSerializer, self).to_representation(instance)

        # change representation of sp
        data['sp_id'] = instance.sp.id
        data['group'] = instance.sp.group
        data['sp_code'] = instance.sp.sp_code
        data['sp_name'] = instance.sp.sp_name

        data.pop('sp')

        # change representation of sampled weight
        if (hasattr(instance, 'samples')):
            data['sampled_weight'] = instance.samples.sampled_weight
            data['sampled_weight_id'] = instance.samples.id

        data.pop('samples')

        data.update()

        return data


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
