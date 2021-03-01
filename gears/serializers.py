from rest_framework import serializers

from gears.models import Gear


class GearSerializer(serializers.ModelSerializer):
    '''
    Gear serializer.
    '''
    class Meta:
        model = Gear
        fields = ['id', 'name', 'gear_type', 'otter_boards_type', 'otter_boards_area', 'otter_boards_weight',
                  'groundgear_length', 'groundgear_weight', 'headline_length', 'headline_floats_number',
                  'wing_length', 'square_meshes', 'top_panel_meshes', 'bottom_panel_meshes',
                  'codend_nets_meshes', 'inner_linner_meshes', 'otter_boards_distance', 'horizontal_aperture',
                  'vertical_aperture', 'comment',]