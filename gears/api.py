from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from gears.models import Trawl
from gears.serializers import TrawlSerializer


class TrawlsAPI(ListCreateAPIView):
    '''
    Api to list and create trawl
    '''
    queryset = Trawl.objects.all()
    serializer_class = TrawlSerializer


class TrawlAPI(RetrieveUpdateDestroyAPIView):
    '''
    Api to retrieve, update or destroy trawl
    '''
    queryset = Trawl.objects.all()
    serializer_class = TrawlSerializer
