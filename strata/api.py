from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from hauls.models import Haul
from strata.models import Stratum
from strata.serializers import StrataSerializer


@api_view(['GET'])
def check_stratum_in_haul(request, stratum_id):
    """
    Check if a stratum is referenced in any haul.
    :param stratum_id: ID of the stratum to check.
    :return: JSON response indicating if the stratum is referenced.
    """
    exists = Haul.objects.filter(stratum_id=stratum_id).exists()
    return Response({"exists": exists})


class StrataAPI(APIView):
    '''
    Strata API
    '''

    def get(self, request, stratification_id):
        '''
        Get all the strata from stratification
        :param request:
        :param stratification_id: Stratification id which strata is response
        :return: Response with strata
        '''
        queryset = get_list_or_404(Stratum, stratification_id=stratification_id)
        serializer = StrataSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        '''
        Create a new stratum
        :param request:
        :return: Response with created stratum
        '''
        serializer = StrataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StratumAPI(APIView):
    '''
    Individual Stratum API
    '''

    def get(self, request, pk):
        '''
        Get a specific stratum
        :param request:
        :param pk: Stratum primary key
        :return: Response with stratum
        '''
        stratum = get_object_or_404(Stratum, pk=pk)
        serializer = StrataSerializer(stratum)
        return Response(serializer.data)

    def put(self, request, pk):
        '''
        Update a specific stratum
        :param request:
        :param pk: Stratum primary key
        :return: Response with updated stratum
        '''
        stratum = get_object_or_404(Stratum, pk=pk)
        serializer = StrataSerializer(stratum, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        '''
        Delete a specific stratum
        :param request:
        :param pk: Stratum primary key
        :return: Response
        '''
        stratum = get_object_or_404(Stratum, pk=pk)
        if stratum.haul_set.exists():  # Check if any haul references this stratum
            return Response(
                {"error": "Cannot delete stratum. This stratum has referended hauls that must be removed first."},
                status=status.HTTP_400_BAD_REQUEST
            )
        stratum.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
