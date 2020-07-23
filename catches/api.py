from django.shortcuts import get_list_or_404
from rest_framework.views import APIView
from rest_framework.response import Response

from catches.models import Catch

from catches.serializers import CatchesVerboseSerializer


class CatchHaulListAPI(APIView):
    """
    Endpoint to get all the catches of a trawl haul.
    """
    def get(self, request, haul_id):
        catches = get_list_or_404(Catch, haul_id=haul_id)
        serializer = CatchesVerboseSerializer(catches, many=True)

        return Response(serializer.data)