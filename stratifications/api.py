from rest_framework.generics import ListAPIView
from stratifications.models import Stratification
from stratifications.serializers import StratificationSerializer

class StratificationsAPI(ListAPIView):
    queryset = Stratification.objects.all()
    serializer_class = StratificationSerializer