from rest_framework.views import APIView
from rest_framework.response import Response

from stations.models import Station
from hauls.models import Haul

from conn_r.serializers import DataTrawlHaulsConnR, DataStationsConnR

class GetTrawlHaulsAPIConnR(APIView):
    """
    Get data hauls of certain survey.
    Created to use with campR.
    """
    # TODO: returns hydrography data too
    def get(self, request, acronym):
        hauls = Haul.objects.filter(station__survey__acronym=acronym)
        serializer = DataTrawlHaulsConnR(hauls, many=True)
        return Response(serializer.data)


class GetDataStationsAPIConnR(APIView):
    """
    Retrieve data of all stations of a survey, including trawl and hydrography data hauls.
    Created to use with campR.
    """
    def get(self, request, acronym):
        stations = Station.objects.filter(survey__acronym=acronym)
        serializer = DataStationsConnR(stations, many=True)
        return Response(serializer.data)