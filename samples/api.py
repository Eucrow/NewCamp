from django.shortcuts import get_list_or_404

from rest_framework.views import APIView
from rest_framework.response import Response

from samples.models import Length

from samples.serializers import LenghtSerializer


class LengthsAPI(APIView):
    """
    Endpoint to get lengths sampled of a species.
    """
    def get(self, request, sex_id):
        lengths = get_list_or_404(Length, sex_id=sex_id)
        serializer = LenghtSerializer(lengths, many=True)

        return Response(serializer.data)
