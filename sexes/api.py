from rest_framework import generics
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT
from rest_framework.views import APIView

from catches.models import Catch
from samples.models import Sex
from samples.serializers import SexSerializer
from sexes.serializers import SexesSerializer


class SexesAPI(APIView):
    """
    Endpoint to get al the sexes of a catch.
    """

    def get(self, request, catch_id):
        """
        Get all sexes of a catch
        :param request:
        :param catch_id: id of the catch
        :return:
        """
        sexes = Sex.objects.filter(catch_id=catch_id)

        serializer = SexesSerializer(sexes, many=True)
        return Response(serializer.data)


class SexAPI(APIView):
    """
    Endpoint to retrieve, create, update and delete sex of a catch.
    """

    def get(self, request):
        sex = Sex.objects.get(id=request.data["id"])
        serializer = SexSerializer(sex)
        return Response(serializer.data)

    def post(self, request):
        serializer = SexSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(catch_id=request.data["catch_id"])
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def put(self, request):
        sex = Sex.objects.get(id=request.data["id"])
        serializer = SexSerializer(sex, data=request.data)
        if serializer.is_valid():
            serializer.save(id=request.data["id"])
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request):
        sex = Sex.objects.get(id=request.data["id"])
        sex.delete()
        return Response(status=HTTP_204_NO_CONTENT)
