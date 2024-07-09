from rest_framework import serializers

from species.models import Sp, MeasurementType


class SpeciesSerializer(serializers.ModelSerializer):
    # measurement_name = serializers.CharField(source='measurement_type.name')
    # measurement_increment = serializers.IntegerField(source='measurement_type.increment')
    # measurement_conversion_factor = serializers.DecimalField(source='measurement_type.conversion_factor', max_digits=4,
    #                                                          decimal_places=3)

    class Meta:
        model = Sp
        fields = ['id', 'group', 'sp_code', 'sp_name', 'spanish_name', 'a_param', 'b_param', 'APHIA', 'comment',
                  'measurement_type',
                  # 'measurement_name', 'measurement_increment', 'measurement_conversion_factor'
                  ]


class SpSimpleSerializer(serializers.ModelSerializer):
    '''
    Serializer of species name.
    '''

    class Meta:
        model = Sp
        fields = ['id', 'sp_name', 'group', 'sp_code', 'unit', 'increment', ]


# class CategorySerializer(serializers.ModelSerializer):
#     '''
#     Serializer of category with species name.
#     '''
#     sp = SpNameSerializer()
#
#     class Meta:
#         model = Category
#         fields = ['id', 'category_name', 'sp', ]

class MeasurementTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeasurementType
        fields = ['id', 'name', 'increment', 'conversion_factor']
