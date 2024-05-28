from rest_framework import serializers

from gears.models import Trawl
from gears.models import CTD
from samplers.models import Sampler
from stations.models import Station
from strata.models import Stratum
from gears.serializers import GearTrawlBasicSerializer
from hauls.models import Haul, HaulTrawl, HaulHydrography, Meteorology
from samplers.serializers import SamplerSerializer
from stations.serializers import StationSerializer
from strata.serializers import StrataSerializer


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
    """
    Serializer of hauls data. In this serializer, for the post method, the gear, sampler, stratum and station data
    are removed because it is not necessary to post them (it is done in the get_fields method) . The id of each of
    these objects is enough to create a haul. But the response of the get method will include the description fields
    of these objects (this is done overwriting the to_representation method).
    """

    # gear = GearTrawlBasicSerializer(read_only=True)
    trawl_id = serializers.PrimaryKeyRelatedField(queryset=Trawl.objects.all(),
                                                  source='trawl')

    # ctd_id = serializers.PrimaryKeyRelatedField(queryset=CTD.objects.all(),
    #                                             source='ctd')

    # sampler = SamplerSerializer(read_only=True)
    sampler_id = serializers.PrimaryKeyRelatedField(queryset=Sampler.objects.all(),
                                                    source='sampler')

    # station = StationSerializer(read_only=True)
    station_id = serializers.PrimaryKeyRelatedField(queryset=Station.objects.all(),
                                                    source='station')

    # stratum = StrataSerializer(read_only=True)
    stratum_id = serializers.PrimaryKeyRelatedField(queryset=Stratum.objects.all(),
                                                    source='stratum')

    class Meta:
        model = Haul
        fields = ['id', 'haul', 'valid', 'trawl_id', 'trawl',
                  # 'ctd', 'ctd_id',
                  'sampler_id', 'sampler', 'stratum_id',
                  'stratum', 'station_id', 'station']

    def get_fields(self):
        """
        Overwrite the get_fields method to remove the gear, sampler, stratum and station data when the POST method
        :return: dictionary of fields
        """
        fields = super().get_fields()

        if self.context['request'].method == 'POST' or self.context['request'].method == 'PUT':
            fields.pop('trawl')
            fields.pop('sampler')
            fields.pop('stratum')
            fields.pop('station')

        return fields

    def to_representation(self, instance):
        """
        Overwrite the to_representation method to add the gear, sampler, stratum and station data
        when the POST method is called.
        """
        representation = super().to_representation(instance)

        if self.context['request'].method == 'POST':
            representation['sampler'] = self.validated_data['sampler'].sampler
            representation['stratum'] = self.validated_data['stratum'].stratum
            representation['station'] = self.validated_data['station'].station
            representation['trawl'] = self.validated_data['trawl'].name

        return representation


class HaulMeteorologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Meteorology
        fields = ['wind_direction', 'wind_velocity', 'sea_state', ]


# TODO: this serializer is equal to HaulMeteorologySerializer. Delete one of them (I think this one is the correct one)
class MeteorologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Meteorology
        fields = ['wind_direction', 'wind_velocity', 'sea_state', ]


class TrawlSerializer(serializers.ModelSerializer):
    class Meta:
        model = HaulTrawl
        fields = ['shooting_date_time', 'shooting_latitude', 'shooting_longitude', 'shooting_depth',
                  'hauling_date_time', 'hauling_latitude', 'hauling_longitude', 'hauling_depth', 'bottom_date_time',
                  'bottom_latitude', 'bottom_longitude', 'bottom_depth', 'course', 'velocity', 'cable', 'sweep',
                  'otter_boards_distance', 'horizontal_aperture', 'vertical_aperture', 'sampling_rectangle', 'track',
                  'comment', ]


class HaulTrawlSerializer(serializers.ModelSerializer):
    """
    Serializer of trawl haul. Include the general Haul model, HaulTrawl model and Meteorology model.
    """
    meteo = HaulMeteorologySerializer()
    trawl_characteristics = TrawlSerializer()

    stratum = serializers.CharField(source='stratum.stratum', read_only=True)

    sampler = serializers.CharField(source='sampler.sampler', read_only=True)

    # gear is the 'name' of the gear
    trawl = serializers.IntegerField(source='trawl.name', read_only=True)

    class Meta:
        model = Haul
        fields = ['id', 'station_id', 'haul', 'stratum_id', 'stratum', 'sampler_id', 'sampler', 'trawl', 'trawl_id',
                  'valid', 'meteo', 'trawl_characteristics']

    # This is a nested serializer, so we have to overwrite the create function
    def create(self, validated_data):
        # First, get the data from the nested parts
        meteo_data = validated_data.pop('meteo')
        trawl_characteristics_data = validated_data.pop(
            'trawl_characteristics')

        # Second, create the new haul with its nested data:
        haul_data = validated_data.copy()

        # Then, save the haul
        haul = Haul.objects.create(**haul_data)

        # Then, save the nested parts in its own models
        Meteorology.objects.create(haul=haul, **meteo_data)
        HaulTrawl.objects.create(haul=haul, **trawl_characteristics_data)

        # And finally, return the haul
        return haul

    def update(self, instance, validated_data):

        if validated_data:
            # First, get the data from validated_data (pop() remove the data from the original dict and return its
            # value)
            meteo_datas = validated_data.pop('meteo')
            trawl_characteristics_datas = validated_data.pop(
                'trawl_characteristics')
            # instance.gear must be a Trawl object, so get the trawl of the name:
            instance.gear = Trawl.objects.get(name=self.data['gear'])
            # Second, save the instance validated (this does not have the meteo and trawl_characteristics data)
            for attr, value in validated_data.items():
                # print(attr, value)
                setattr(instance, attr, value)

            instance.save()

            # Then, create a meteo instance, fill with the validated meto data, and save it
            meteo = instance.meteo
            for attr, value in meteo_datas.items():
                # print(attr, value)
                setattr(meteo, attr, value)
            meteo.save()

            # And do the same with trawl_characteristics data
            trawl_characteristics = instance.trawl_characteristics
            for attr, value in trawl_characteristics_datas.items():
                # print(attr, value)
                setattr(trawl_characteristics, attr, value)
            trawl_characteristics.save()

        return instance


class HydrographySerializer(serializers.ModelSerializer):
    class Meta:
        model = HaulHydrography
        fields = ['id', 'latitude', 'longitude', 'date_time', 'depth_probe', 'cable', 'depth', 'temperature_0',
                  'salinity_0',
                  'sigma_0', 'temperature_50', 'salinity_50', 'sigma_50', 'temperature_100', 'salinity_100',
                  'sigma_100', 'temperature', 'salinity', 'sigma', 'comment', 'haul_id']


class HaulHydrographySerializer(serializers.ModelSerializer):
    """
    Serializer of hydrography haul. Include the general Haul model and HaulHydrography.
    """

    hydrography_characteristics = HydrographySerializer()

    station = serializers.CharField(source='station.station', read_only=True)

    # stratum = serializers.CharField(source='stratum.stratum', read_only=True)

    sampler = serializers.CharField(source='sampler.sampler', read_only=True)

    ctd = serializers.IntegerField(source='ctd.name', read_only=True)

    # station and sampler can't be changed...
    # station = StationSerializer(read_only=True)
    # stratum = StrataSerializer(read_only=True)
    # sampler = SamplerSerializer(read_only=True)

    class Meta:
        model = Haul
        fields = ['id', 'station', 'station_id', 'haul', 'sampler', 'sampler_id', 'ctd',
                  'ctd_id', 'valid', 'hydrography_characteristics',
                  ]

    # This is a nested serializer, so we have to overwrite the create function
    def create(self, validated_data):
        # Firstly, get the data from the nested parts
        # meteo_data = validated_data.pop('meteo')
        hydrography_characteristics_data = validated_data.pop(
            'hydrography_characteristics')

        # Secondly, create the station_id and sampler_id from its nested data
        haul_data = validated_data.copy()

        # Then, save the Haul
        haul = Haul.objects.create(**haul_data)

        # Then, save the nested parts in its own models
        # Meteorology.objects.create(haul=haul, **meteo_data)
        HaulHydrography.objects.create(
            haul=haul, **hydrography_characteristics_data)

        # And finally, return the haul
        return haul

    def update(self, instance, validated_data):

        if validated_data:
            # First, get the data from validated_data (pop() remove the data from the original dict)
            hydrography_characteristics_datas = validated_data.pop(
                'hydrography_characteristics')

            # Second, save the instance validated (this does not have the hydrography_characteristics data)
            for attr, value in validated_data.items():
                print(attr, value)
                setattr(instance, attr, value)

            instance.save()

            # Then, create a hydrography instance, fill with the validated hydrography data, and save it
            hydrography_characteristics = instance.hydrography_characteristics
            for attr, value in hydrography_characteristics_datas.items():
                print(attr, value)
                setattr(hydrography_characteristics, attr, value)
            hydrography_characteristics.save()

        return instance


class HaulStationSerializer(serializers.ModelSerializer):
    """
    Serializer of haul with information of station and sampler
    """
    station = serializers.IntegerField(
        read_only=True, source="station.station")
    sampler = serializers.IntegerField(
        read_only=True, source="sampler.sampler")

    class Meta:
        model = Haul
        fields = ['station', 'haul', 'sampler', ]


class HaulGeoJSONSerializer(serializers.ModelSerializer):
    class Meta:
        model = Haul
        fields = '__all__'

    # Override the to_representation method, which format the output of the serializer
    def to_representation(self, instance):
        # instance is the model object. create the custom json format by accessing instance attributes normaly and
        # return it

        geom = {'coordinates': [instance.hauling_longitude, instance.hauling_latitude],
                'type': 'Point'}

        feature = dict(type='Feature', geometry=geom)

        return feature
