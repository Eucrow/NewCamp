from rest_framework import serializers

from stations.models import Station

from hauls.models import Haul
from gears.models import Trawl
from strata.models import Stratum
from samplers.models import Sampler


class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ['id', 'station', 'comment', 'survey_id']

    def __str__(self):
        return '%s' % (self.station)


# class GearSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Trawl
#         fields = ['id', 'name', ]
#
#
# class StratumSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Stratum
#         fields = ['id', 'stratum', ]
#
#
# class SamplerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Sampler
#         fields = ['id', 'sampler', ]


# class HaulSerializer(serializers.ModelSerializer):
#     '''
#     Haul serializer to use with StationsHaulsSerializer.
#     Cannot import a similar haul serializer from Haul app due to problems with circular imports.
#     '''
#
#     # gear = GearSerializer()
#     # stratum = StratumSerializer()
#     # sampler = SamplerSerializer()
#     # station = serializers.IntegerField(source="station.station")
#
#     # TODO: The sampler field return all the fields of the Sampler model. Try to minimize it:
#     #  https://www.django-rest-framework.org/api-guide/serializers/#specifying-nested-serialization
#
#     class Meta:
#         model = Haul
#         fields = ['id', 'haul', 'gear', 'valid', 'sampler', 'station', 'stratum']
#         depth = 1


class HaulSerializer(serializers.ModelSerializer):
    """
    Serializer of hauls data with sampler.
    """

    def get_trawl(self, obj):
        return obj.trawl.name if obj.trawl else None

    def get_trawl_id(self, obj):
        return obj.trawl.id if obj.trawl else None

    trawl = serializers.SerializerMethodField()
    trawl_id = serializers.SerializerMethodField()

    sampler = serializers.CharField(source="sampler.sampler")
    sampler_id = serializers.IntegerField(source="sampler.id")

    def get_stratum(self, obj):
        return obj.stratum.stratum if obj.stratum else None

    def get_stratum_id(self, obj):
        return obj.stratum.id if obj.stratum else None

    stratum = serializers.SerializerMethodField()
    stratum_id = serializers.SerializerMethodField()

    station = serializers.IntegerField(source="station.station")

    class Meta:
        model = Haul
        fields = ['id', 'haul', 'valid', 'special', 'trawl', 'trawl_id', 'sampler', 'sampler_id', 'stratum',
                  'stratum_id',
                  'station']
        depth = 1


class StationsHaulsSerializer(serializers.ModelSerializer):
    '''
    Station serializer which include all the hauls information.
    '''
    hauls = HaulSerializer(many=True)

    class Meta:
        model = Station
        fields = ['id', 'station', 'comment', 'hauls', ]
