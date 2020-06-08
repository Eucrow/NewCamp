from rest_framework.generics import ListAPIView
from stations.models import Station
from stations.serializers import StationSerializer

class StationsAPI(ListAPIView):
    queryset = Station.objects.all()
    serializer_class = StationSerializer