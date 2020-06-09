from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT
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

    def post(self, request):
        serializer = StationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(survey_id=request.data["survey_id"])
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)

    def put(self, request, station_id):
        station = get_object_or_404(Station, pk=station_id)
        serializer = StationSerializer(station, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)

    def delete(self, request, station_id, format=None):
        station = Station.objects.get(pk=station_id)
        station.delete()
        return Response(status=HTTP_204_NO_CONTENT)
