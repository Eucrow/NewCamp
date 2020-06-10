from rest_framework import serializers

from hauls.models import Haul, HaulTrawl, HaulHydrography

from stations.serializers import StationSerializer


class ImportHaulSerializer(serializers.ModelSerializer):
    class Meta:
        model = Haul
        fields = '__all__'
        depth = 1


class ImportHaulsTrawlSerializer(serializers.ModelSerializer):
    class Meta:
        model = HaulTrawl
        fields = '__all__'


class ImportHydrographyesSerializer(serializers.ModelSerializer):
    station = StationSerializer(read_only=True)

    class Meta:
        model = HaulHydrography
        fields = '__all__'
        depth = 1

# OLD ONE: great as example:
# class HaulSerializer(serializers.ModelSerializer):
#     station = serializers.IntegerField(read_only=True, source="station.station")
#     survey = serializers.CharField(read_only=True, source="station.survey.acronym")
#     stratum = serializers.CharField(read_only=True, source="stratum.stratum")
#
#     class Meta:
#         model = Haul
#         fields = ['survey', 'station', 'stratum', 'haul', 'gear', 'valid', ]

class HaulSerializer(serializers.ModelSerializer):

    class Meta:
        model = Haul
        fields = ['haul', 'gear', 'valid', ]


class HaulStationSerializer(serializers.ModelSerializer):
    """
    Serializer of haul with information of station and sampler
    """
    station = serializers.IntegerField(read_only=True, source="station.station")
    sampler = serializers.IntegerField(read_only=True, source="sampler.sampler")

    class Meta:
        model = Haul
        fields = ['station', 'haul', 'sampler', ]


class HaulGeoJSONSerializer(serializers.ModelSerializer):
    class Meta:
        model = Haul
        fields = '__all__'

    # Override the to_representation method, which format the output of the serializer
    def to_representation(self, instance):
        # instance is the model object. create the custom json format by accessing instance attributes normaly and return it

        geom = {'coordinates': [instance.hauling_longitude, instance.hauling_latitude],
                'type': 'Point'}

        feature = dict(type='Feature', geometry=geom)

        return feature
