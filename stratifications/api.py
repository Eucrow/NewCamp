from rest_framework import viewsets
from stratifications.models import Stratification
from stratifications.serializers import StratificationSerializer

class StratificationViewSet(viewsets.ModelViewSet):
    queryset = Stratification.objects.all()
    serializer_class = StratificationSerializer