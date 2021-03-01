from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from gears.models import Gear
from gears.serializers import GearSerializer

class GearsAPI(ListCreateAPIView):
    '''
    Api to list and create gear
    '''
    queryset = Gear.objects.all()
    serializer_class = GearSerializer


class GearAPI(RetrieveUpdateDestroyAPIView):
    '''
    Api to retrieve, update or destroy gear
    '''
    queryset = Gear.objects.all()
    serializer_class = GearSerializer