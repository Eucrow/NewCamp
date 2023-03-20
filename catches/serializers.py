from rest_framework import serializers
from rest_framework.fields import SerializerMethodField

from catches.models import Catch
from samples.models import Sex, Length, SampledWeight
from samples.serializers import SampleWeightSerializer, SexSerializer, LengthSerializer2
# from sexes.serializers import SexesExistsSerializer
# from species.serializers import CategorySerializer
from species.models import Sp
from species.serializers import SpSimpleSerializer


class CatchSerializer(serializers.ModelSerializer):
    sp_name = serializers.CharField(source='sp.sp_name', read_only=True)
    group = serializers.IntegerField(source='sp.group', read_only=True)
    sp_code = serializers.IntegerField(source='sp.sp_code', read_only=True)

    class Meta:
        model = Catch
        # fields = ['id', 'weight', 'sp', 'sp_code', 'sp_name', 'group', 'category', 'haul_id']
        fields = ['id', 'weight', 'sp_code', 'sp_name', 'group', 'category', 'haul_id']


class CatchesVerboseSerializer(serializers.ModelSerializer):
    # category = CategorySerializer()
    sp = SpSimpleSerializer()
    # species_name = serializers.RelatedField(source='species.Sp.name', read_only=True)
    # specie_sp_name = serializers.CharField(source='species.Sp.name')

    # 'samples' must be the related_name of a one to one field on SampleWeight model.
    samples = SampleWeightSerializer(required=True)

    # 'sexes' must be the related_name of a foreign key field on the Sex model.
    # sexes = SexSerializer(many=True)

    # Field to return if the catch has sexes or not
    # TODO: I think this is not required.
    def has_sexes(self, instance):
        if instance.sexes.count() > 0:
            return True
        else:
            return False

    catch_has_sexes = SerializerMethodField(method_name="has_sexes")

    class Meta:
        model = Catch
        fields = ['id', 'weight', 'category', 'haul', 'haul_id', 'sp', 'samples', 'catch_has_sexes'
                  # , 'sexes'
                  ]

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
        data['unit'] = instance.sp.unit
        data['increment'] = instance.sp.increment

        data.pop('sp')

        # change representation of sampled weight
        if hasattr(instance, 'samples'):
            data['sampled_weight'] = instance.samples.sampled_weight
            data['sampled_weight_id'] = instance.samples.id

        data.pop('samples')

        data.update()

        return data

    # def create(self, validated_data):

    # Override the update method to allow update of weight and sexes. Useless because Doesn't have any sense
    # to have the hability to update those data but doesn't update sampled weight and lengths.
    # I leave it here as an example:
    # def update(self, instance, validated_data):
    #
    #     sexes_data = validated_data.pop('sexes')
    #     sexes = (instance.sexes).all()
    #     sexes = list(sexes)
    #
    #     for sex_data in sexes_data:
    #         sex = sexes.pop(0)
    #         sex.sex =sex_data.get('sex', sex.sex)
    #         sex.save()
    #
    #     instance.weight = validated_data.get('weight', instance)
    #     instance.category = validated_data.get('category', instance)
    #     instance.haul = validated_data.get('haul', instance)
    #
    #     instance.save()
    #
    #     return instance


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
