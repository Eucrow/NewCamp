from rest_framework import serializers

from species.models import Sp


class SpeciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sp
        fields = '__all__'


class SpBasicSerializer(serializers.ModelSerializer):
    '''
    Serializer of species name.
    '''
    class Meta:
        model = Sp
        fields = ['id', 'sp_name', 'group', 'sp_code' ]


# class CategorySerializer(serializers.ModelSerializer):
#     '''
#     Serializer of category with species name.
#     '''
#     sp = SpNameSerializer()
#
#     class Meta:
#         model = Category
#         fields = ['id', 'category_name', 'sp', ]


