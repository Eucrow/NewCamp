from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import ProtectedError

from hauls.models import Haul
from stratifications.models import Stratification
from stratifications.serializers import StratificationSerializer
from surveys.models import Survey


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


@api_view(['GET'])
def check_stratification_in_survey(request, stratification_id):
    """
    Check if stratification is referenced in any survey.
    :param stratification_id:
    :return: JSON response indicating if the stratification is referenced.
    """
    exists = Survey.objects.filter(stratification_id=stratification_id).exists()
    return Response({"exists": exists})
