from django.shortcuts import get_list_or_404
from rest_framework import status

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_201_CREATED, HTTP_400_BAD_REQUEST

from samples.models import Length

from samples.serializers import LenghtSerializer, SampleWeightSerializer


class SampleAPI(APIView):
    """
    Endpoint to manage sample weights.
    """
    def post(self, request):
        serializer=SampleWeightSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(catch_id=request.data["catch_id"])
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

class LengthsAPI(APIView):
    """
    Endpoint to get lenghts of species.
    """
    def get(self, request, sex_id):
        # lengths = get_list_or_404(Length, sex_id=sex_id)
        lengths = Length.objects.filter(sex_id=sex_id)
        serializer = LenghtSerializer(lengths, many=True)

        return Response(serializer.data)

    def post(self, request, sex_id):
        # The LengthSerializer is prepared to allow update and create multiple objects, so many=True is explicit
        serializer=LenghtSerializer(data=request.data, many=True)

        if serializer.is_valid():
            serializer.save(sex_id=sex_id)
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def put(self, request, sex_id):
        lengths = Length.objects.filter(sex_id=sex_id)
        # The LengthSerializer is prepared to allow update and create multiple objects, so many=True is explicit
        serializer = LenghtSerializer(lengths, data=request.data, partial=True, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)

    #TODO: manage errors, what to do with them?


# The next class is not necesary because we update the complete lenghts
# class LengthAPI(APIView):
#     """
#     Endpoint to manage species lengths individually
#     """
#
#     def delete(self, request, length_id):
#         length = Length.objects.get(pk=length_id)
#         length.delete()
#         return Response(status=HTTP_204_NO_CONTENT)
