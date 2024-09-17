from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from rest_framework.response import Response

from django.shortcuts import get_object_or_404

from species.models import Sp, MeasurementType
from species.serializers import SpeciesSerializer, SpSimpleSerializer, MeasurementTypeSerializer


# class SpeciesListAPI(APIView):
#     def get(self, request):
#         all_species = Sp.objects.all()
#         serializer = SpeciesSerializer(all_species, many=True)
#         return Response(serializer.data)

class SpeciesAPI(ListCreateAPIView):
    '''
    Api to list and create species
    '''
    queryset = Sp.objects.all()
    serializer_class = SpeciesSerializer


# class SpAPI(APIView):
#     def get(self, request, pk):
#         sp = Sp.objects.filter(pk=pk)
#         serializer = SpeciesSerializer(sp, many=True)
#         return Response(serializer.data)
#
#     def post(self, request):
#         serializer = SpeciesSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
#
#     def put(self, request, pk):
#         sp = get_object_or_404(Sp, pk=pk)
#         serializer = SpeciesSerializer(sp, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class SpAPI(RetrieveUpdateDestroyAPIView):
    '''
    Api to retrieve, update or destroy species.
    '''
    queryset = Sp.objects.all()
    serializer_class = SpeciesSerializer


class SpeciesGroupAPI(APIView):
    """
    Api to retrieve species by group.
    """

    def get(self, request, group):
        sp = Sp.objects.filter(group=group)
        serializer = SpSimpleSerializer(sp, many=True)
        return Response(serializer.data)


class MeasurementTypeAPI(RetrieveUpdateDestroyAPIView):
    """
    Api to retrieve, update or destroy measurement types.
    """
    queryset = MeasurementType.objects.all()
    serializer_class = MeasurementTypeSerializer


class MeasurementTypeListCreateAPI(ListCreateAPIView):
    '''
    Api to list measurement types
    '''
    queryset = MeasurementType.objects.all()
    serializer_class = MeasurementTypeSerializer
