from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response

from gears.models import Trawl
from gears.serializers import GearTrawlSerializer, GearTrawlBasicSerializer, GearTrawlsNamesSerializer


class GearTrawlsAPI(ListCreateAPIView):
    '''
    Api to list and create trawl
    '''
    queryset = Trawl.objects.all()
    serializer_class = GearTrawlSerializer


class GearTrawlAPI(RetrieveUpdateDestroyAPIView):
    '''
    Api to retrieve basic information of trawl. To use as options in select fields of a form.
    '''
    queryset = Trawl.objects.all()
    serializer_class = GearTrawlSerializer


class GearTrawlsBasicAPI(ListAPIView):
    '''
    Api to retrieve, update or destroy trawl
    '''
    queryset = Trawl.objects.all()
    serializer_class = GearTrawlBasicSerializer


class GearTrawlsNamesAPI(APIView):
    '''
    API to get the list of names of gears.
    To use as options in select fields of a form.
    '''

    def get(self, request):
        gears = Trawl.objects.all()
        serializer = GearTrawlsNamesSerializer(gears, many=True)
        return Response(serializer.data)
