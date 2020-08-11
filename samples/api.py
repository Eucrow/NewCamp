from django.shortcuts import get_list_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT

from samples.models import Length

from samples.serializers import LenghtSerializer


class LengthsAPI(APIView):
    """
    Endpoint to get lenghts of species.
    """
    def get(self, request, sex_id):
        lengths = get_list_or_404(Length, sex_id=sex_id)
        serializer = LenghtSerializer(lengths, many=True)

        return Response(serializer.data)

# The next class is not neccesary because we update the complete lenghts
# class LengthAPI(APIView):
#     """
#     Endpoint to manage species lengths individually
#     """
#
#     def delete(self, request, length_id):
#         length = Length.objects.get(pk=length_id)
#         length.delete()
#         return Response(status=HTTP_204_NO_CONTENT)
