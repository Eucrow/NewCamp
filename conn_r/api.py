from rest_framework.views import APIView
from rest_framework.response import Response

from hauls.models import Haul

from conn_r.serializers import DataHaulsConnR

class GetDataHaulsAPIConnR(APIView):
    '''
    Get data hauls of certain survey.
    Created to use with campR.
    '''

    def get(self, request, acronym):
        hauls = Haul.objects.filter(station__survey__acronym=acronym)
        serializer = DataHaulsConnR(hauls, many=True)
        return Response(serializer.data)