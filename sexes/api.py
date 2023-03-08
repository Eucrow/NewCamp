from rest_framework.response import Response
from rest_framework.views import APIView

from samples.models import Sex
from sexes.serializers import SexesSerializer


class SexesAPI(APIView):
    """
    Get all sexes of a catch.
    @param catch_id: id of the catch
    """

    def get(self, request, catch_id):
        sexes = Sex.objects.filter(catch_id=catch_id)

        serializer = SexesSerializer(sexes, many=True)
        return Response(serializer.data)
