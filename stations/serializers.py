from rest_framework import serializers

from stations.models import Station


class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ['dfsdfs']


    # def __str__(self):
    #     return '%s' % (self.station)

