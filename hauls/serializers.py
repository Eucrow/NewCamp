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


class HaulSerializer(serializers.ModelSerializer):
    station = serializers.IntegerField(read_only=True, source="station.station")
    survey = serializers.CharField(read_only=True, source="station.survey.acronym")
    stratum = serializers.CharField(read_only=True, source="stratum.stratum")

    class Meta:
        model = Haul
        fields = ['survey', 'station', 'stratum', 'haul', 'gear', 'valid', ]


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
