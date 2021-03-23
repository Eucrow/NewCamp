from rest_framework.serializers import ModelSerializer

from hauls.models import Haul
from hauls.serializers import TrawlSerializer, HaulMeteorologySerializer
from samplers.serializers import SamplerSerializer
from stations.serializers import StationSerializer
from strata.serializers import StrataSerializer


class DataHaulsConnR(ModelSerializer):
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
        data = super(DataHaulsConnR, self).to_representation(instance)

        # un-nest the trawl_characteristics data:
        data_trawl_characteristics = data['trawl_characteristics']

        for value in data_trawl_characteristics.items():
            data[value[0]] = value[1]

        data.pop('trawl_characteristics')

        # un-nest the station data:
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
