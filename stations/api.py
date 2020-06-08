from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from stations.models import Station
from stations.serializers import StationSerializer

class StationsAPI(ListAPIView):
    queryset = Station.objects.all()
    serializer_class = StationSerializer

class StationAPI(APIView):
    def get(self, request, station_id):
        station = get_object_or_404(Station, pk=station_id)
        serializer = StationSerializer(station)
        return Response(serializer.data)