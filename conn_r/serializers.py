from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from stations.models import Station
from hauls.models import Haul, HaulTrawl, HaulHydrography
from hauls.serializers import TrawlSerializer, HaulMeteorologySerializer, HydrographySerializer
from samplers.serializers import SamplerSerializer
from stations.serializers import StationSerializer
from strata.serializers import StrataSerializer
from gears.serializers import GearTrawlBasicSerializer


class HaulConnR(ModelSerializer):
    """
    Serializer of hauls data with sampler.
    """
    gear = serializers.IntegerField(source='gear.name', allow_null=True)
    trawl_characteristics = TrawlSerializer(read_only=True, allow_null=True)
    hydrography_characteristics = HydrographySerializer(read_only=True, allow_null=True)

    class Meta:
        model = Haul
        fields = ['haul', 'gear', 'valid', 'trawl_characteristics', 'hydrography_characteristics', ]
        # TODO: select only sampler and id from sampler model
        # TODO: select only station and id from station model
        # TODO: select only stratum from stratum model
        # depth = 1

    def to_representation(self, instance):
        # instance is the model object. create the custom json format by accessing instance attributes normaly and
        # return it

        # get the data of instance:
        data = super(HaulConnR, self).to_representation(instance)

        if data['trawl_characteristics'] is not None:
            for value in data['trawl_characteristics'].items():
                data[value[0]] = value[1]
            data.pop('trawl_characteristics')
        else:
            data.pop('trawl_characteristics')

        if data['hydrography_characteristics'] is not None:
            for value in data['hydrography_characteristics'].items():
                data[value[0]] = value[1]
            data.pop('hydrography_characteristics')
        else:
            data.pop('hydrography_characteristics')

        # and return the data un-nested:
        return data


class HydrographyConnR(ModelSerializer):
    class Meta:
        model = HaulHydrography
        fields = ['latitude', 'longitude', 'date_time', 'depth_probe', 'cable', 'depth', 'temperature_0', 'salinity_0',
                  'sigma_0', 'temperature_50', 'salinity_50', 'sigma_50', 'temperature_100', 'salinity_100',
                  'sigma_100', 'temperature', 'salinity', 'sigma', 'comment', ]


class DataStationsConnR(ModelSerializer):
    # meteo = HaulMeteorologySerializer(read_only=True)
    # stratum = StrataSerializer(read_only=True)
    # sampler = SamplerSerializer(read_only=True)

    # trawl = TrawlSerializer(read_only=True)

    hauls = HaulConnR(read_only=True, many=True)

    # hydro = HydrographyConnR(read_only=True, many=True)

    class Meta:
        model = Station
        fields = ['station', 'comment', 'hauls', ]
        depth = 1


class DataTrawlHaulsConnR(ModelSerializer):
    trawl_characteristics = TrawlSerializer(read_only=True)
    meteo = HaulMeteorologySerializer(read_only=True)
    station = StationSerializer(read_only=True)
    stratum = StrataSerializer(read_only=True)
    sampler = SamplerSerializer(read_only=True)

    class Meta:
        model = Haul
        fields = ['id', 'haul', 'valid', 'meteo', 'station', 'stratum', 'sampler', 'trawl_characteristics', ]

    # Override the to_representation method, which format the output of the serializer
    def to_representation(self, instance):
        # instance is the model object. create the custom json format by accessing instance attributes normaly and return it

        # get the data of instance:
        data = super(DataTrawlHaulsConnR, self).to_representation(instance)

        # un-nest the trawl_characteristics data, only in case it exists. Hydrography hauls doesn't have it, for example:
        if data['trawl_characteristics'] != None:
            data_trawl_characteristics = data['trawl_characteristics']

            for value in data_trawl_characteristics.items():
                data[value[0]] = value[1]

        data.pop('trawl_characteristics')

        # un-nest the station data, only in case it exists. Hydrography hauls doesn't have it, for example:
        if data['meteo']:
            data_meteo = data['meteo']

            for value in data_meteo.items():
                data[value[0]] = value[1]

        data.pop('meteo')

        # un-nest the station data:
        data_station = data['station']

        data['station'] = data_station['station']
        # don't pop station because it has been override (the model stratum have a variable called stratum)
        # data.pop('station')

        # un-nest the stratum data:
        # some hauls maybe doesn't have stratum:
        if (data['stratum']):
            data_stratum = data['stratum']

            data['stratum'] = data_stratum['stratum']
            # don't pop stratum because it has been override (the model stratum have a variable called stratum)
            # data.pop('stratum')

        # un-nest the stratum data:
        data_sampler = data['sampler']

        for value in data_sampler.items():
            data[value[0]] = value[1]

        data.pop('sampler')

        # and return the data un-nested:
        return data
