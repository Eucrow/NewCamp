from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db.models import ProtectedError
from stratifications.models import Stratification
from stratifications.serializers import StratificationSerializer

class StratificationViewSet(viewsets.ModelViewSet):
    queryset = Stratification.objects.all()
    serializer_class = StratificationSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            self.perform_destroy(instance)
        except ProtectedError:
            return Response(
                {"error": "Cannot delete stratification as it is referenced in strata."},
                status=status.HTTP_400_BAD_REQUEST
            )
        return Response(status=status.HTTP_204_NO_CONTENT)