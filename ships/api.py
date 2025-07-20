from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView

from ships.models import Ship
from ships.serializers import ShipIdSerializer, ShipSerializer
from surveys.models import Survey




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

class ShipsInSurveysAPI(ListAPIView):
    """
    Endpoint to list all ship IDs that are used in any survey.
    """
    serializer_class = ShipIdSerializer
    
    def get_queryset(self):
        # Get all ships that are referenced in surveys
        ship_ids = Survey.objects.filter(
            ship__isnull=False
        ).distinct().values_list('ship_id', flat=True)
        
        return Ship.objects.filter(id__in=ship_ids)