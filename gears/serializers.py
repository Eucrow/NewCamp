from rest_framework import serializers

from gears.models import Trawl


class GearTrawlSerializer(serializers.ModelSerializer):
    '''
    Trawl serializer.
    '''
    class Meta:
        model = Trawl
        fields = ['id', 'name', 'gear_type', 'otter_boards_type', 'otter_boards_area', 'otter_boards_weight',
                  'groundgear_length', 'groundgear_weight', 'headline_length', 'headline_floats_number',
                  'wing_length', 'square_meshes', 'top_panel_meshes', 'bottom_panel_meshes',
                  'codend_meshes', 'inner_linner_meshes', 'otter_boards_distance', 'horizontal_aperture',
                  'vertical_aperture', 'comment',]

class GearTrawlBasicSerializer(serializers.ModelSerializer):
    '''
    Trawl serializer with basic information. To use as options in select fields of a form.
    '''
    class Meta:
        model = Trawl
        fields = ['id', 'name']

class GearTrawlsNamesSerializer(serializers.ModelSerializer):
    '''
    Trawl serializer with basic information. To use as options in select fields of a form.
    '''
    class Meta:
        model = Trawl
        fields = ['name', ]