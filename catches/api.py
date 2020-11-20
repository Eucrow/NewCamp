from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT
from rest_framework.views import APIView
from rest_framework.response import Response

from catches.models import Catch

from catches.serializers import CatchSerializer, CatchesVerboseSerializer


class CatchHaulListAPI(APIView):
    """
    Endpoint to retrieve all the catches of a trawl haul.
    """
    def get(self, request, haul_id):
        # catches = get_list_or_404(Catch, haul_id=haul_id)
        catches = Catch.objects.filter(haul_id=haul_id)
        serializer = CatchesVerboseSerializer(catches, many=True)

        return Response(serializer.data)

class CatchHaulAPI(APIView):
    """
    Endpoint to retrieve, update and create catch.
    """
    def get(self, request, haul_id, sp_id, category):
        # catch = Catch.objects.get(category_id = category_id)
        catch = get_object_or_404(Catch, haul_id=haul_id, sp_id=sp_id, category=category)
        serializer= CatchSerializer(catch)
        return Response(serializer.data)

    def post(self, request):
        serializer = CatchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(haul_id=request.data["haul_id"],
                            sp_id=request.data["sp_id"],
                            category=request.data['category'])
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def put(self, request):
        catch = Catch.objects.get(id=request.data["id"])
        serializer = CatchSerializer(catch, data=request.data)
        if serializer.is_valid():
            serializer.save(haul_id=request.data["haul_id"],
                            sp_id=request.data["sp_id"],
                            category=request.data['category'])
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request):
        catch = Catch.objects.get(id=request.data["id"])
        catch.delete()
        return Response(status=HTTP_204_NO_CONTENT)