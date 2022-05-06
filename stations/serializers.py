from rest_framework import serializers

from stations.models import Station

from hauls.models import Haul


class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ['id', 'station', 'comment', 'survey_id']

    def __str__(self):
        return '%s' % (self.station)


class HaulSerializer(serializers.ModelSerializer):
    '''
    Haul serializer to use with StationsHaulsSerializer.
    Cannot import a similar haul serializer from Haul app due to problems with circular imports.
    '''

    # TODO: The sampler field return all the fields of the Sampler model. Try to minimize it:
    #  https://www.django-rest-framework.org/api-guide/serializers/#specifying-nested-serialization

    class Meta:
        model = Haul
        fields = ['id', 'haul', 'gear', 'valid', 'sampler', 'station', 'stratum']
        depth = 1


class StationsHaulsSerializer(serializers.ModelSerializer):
    '''
    Station serializer which include all the hauls information.
    '''
    hauls = HaulSerializer(many=True)

    class Meta:
        model = Station
        fields = ['id', 'station', 'comment', 'hauls', ]
