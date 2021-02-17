from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from ships.models import Ship
from ships.serializers import ShipSerializer

class ShipsAPI(ListCreateAPIView):
    '''
    Api to list and create ship
    '''
    queryset = Ship.objects.all()
    serializer_class = ShipSerializer


class ShipAPI(RetrieveUpdateDestroyAPIView):
    '''
    Api to retrieve, update or destroy ship
    '''
    queryset = Ship.objects.all()
    serializer_class = ShipSerializer