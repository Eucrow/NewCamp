from rest_framework import serializers

from hauls.models import Haul, HaulTrawl, HaulHydrography, Meteorology

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
    """
    Serializer of hauls data with sampler.
    """
    class Meta:
        model = Haul
        fields = ['haul', 'gear', 'valid', 'sampler', 'station', ]
        # TODO: select only sampler and id from sampler model
        # TODO: select only station and id from station model
        depth = 1


class HaulMeteorologySerializer(serializers.ModelSerializer):

    class Meta:
        model = Meteorology
        fields = ['wind_direction', 'wind_velocity', 'sea_state', ]


class TrawlSerializer(serializers.ModelSerializer):

    class Meta:
        model = HaulTrawl
        fields = ['shooting_date_time', 'shooting_latitude', 'shooting_longitude', 'shooting_depth',
                  'hauling_date_time', 'hauling_latitude', 'hauling_longitude', 'hauling_depth', 'bottom_date_time',
                  'bottom_latitude', 'bottom_longitude', 'bottom_depth', 'course', 'velocity', 'cable', 'sweep',
                  'otter_boards_distance', 'horizontal_aperture', 'vertical_aperture', 'grid', 'track', 'comment', ]


class HaulTrawlSerializer(serializers.ModelSerializer):
    """
    Serializer of trawl haul. Include the general Haul model, HaulTrawl model and Meteorology model.
    """
    meteo = HaulMeteorologySerializer()
    trawl_characteristics = TrawlSerializer()

    class Meta:
        model = Haul
        fields = ['haul', 'gear', 'valid', 'meteo', 'trawl_characteristics', 'station_id', 'stratum_id', 'sampler_id', ]
        depth = 1

    # This is a nested serializer, so we have to overwrite the create function
    def create(self, validated_data):
        # Firstly, get the data from the nested parts
        meteo_data = validated_data.pop('meteo')
        trawl_characteristics_data = validated_data.pop('trawl_characteristics')
        # Secondly, save the Haul
        haul = Haul.objects.create(**validated_data)
        # Then, save the nested parts in its own models
        Meteorology.objects.create(haul=haul, **meteo_data)
        HaulTrawl.objects.create(haul=haul, **trawl_characteristics_data)
        # And finally, return the haul
        return haul

    def update(self, instance, validated_data):

        if validated_data:
            # First, get the data from validated_data (pop() remove the data from the original dict)
            meteo_datas = validated_data.pop('meteo')
            trawl_characteristics_datas = validated_data.pop('trawl_characteristics')

            # Second, save the instance validated (this does not have the meteo and trawl_characteristics data
            for attr, value in validated_data.items():
                print(attr, value)
                setattr(instance, attr, value)

            instance.save()

            # Then, create a meteo instance, fill with the validated meto data, and save it
            meteo = instance.meteo
            print(meteo_datas.items())
            for attr, value in meteo_datas.items():
                print(attr, value)
                setattr(meteo, attr, value)
            meteo.save()

            # And do the same with trawl_characteristics data
            trawl_characteristics = instance.trawl_characteristics
            for attr, value in trawl_characteristics_datas.items():
                print(attr, value)
                setattr(trawl_characteristics, attr, value)
            trawl_characteristics.save()

        return instance

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
