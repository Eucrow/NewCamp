from rest_framework import serializers

from ships.models import Ship


class ShipSerializer(serializers.ModelSerializer):
    '''
    Ship serializer.
    '''

    class Meta:
        model = Ship
        fields = ['id', 'name', 'datras_id', 'length', 'beam', 'main_power', 'year_built', 'comment', ]

class ShipIdSerializer(serializers.ModelSerializer):
    """
    Serializer to return only ship ID.
    """
    class Meta:
        model = Ship
        fields = ['id']        
