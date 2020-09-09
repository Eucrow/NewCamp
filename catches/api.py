from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from rest_framework.response import Response

from catches.models import Catch

from catches.serializers import CatchSerializer, CatchesVerboseSerializer


class CatchHaulListAPI(APIView):
    """
    Endpoint to get all the catches of a trawl haul.
    """
    def get(self, request, haul_id):
        # catches = get_list_or_404(Catch, haul_id=haul_id)
        catches = Catch.objects.filter(haul_id=haul_id)
        serializer = CatchesVerboseSerializer(catches, many=True)

        return Response(serializer.data)

class CatchHaulAPI(APIView):
    """
    Endpoint to manage catch.
    """
    def get(self, request, haul_id, category_id):
        # catch = Catch.objects.get(category_id = category_id)
        catch = get_object_or_404(Catch, haul_id=haul_id, category_id=category_id)
        serializer= CatchSerializer(catch)
        return Response(serializer.data)

    def post(self, request):
        serializer = CatchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(haul_id=request.data["haul_id"],
                            category_id=request.data['category_id'])
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def put(self, request):
        catch = Catch.objects.get(id=request.data["id"])
        serializer = CatchSerializer(catch, data=request.data)
        if serializer.is_valid():
            serializer.save(haul_id=request.data["haul_id"],
                            category_id=request.data['category_id'])
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)