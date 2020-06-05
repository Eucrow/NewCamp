from django.shortcuts import get_list_or_404
from rest_framework.views import APIView
from rest_framework.response import Response

from strata.models import Stratum
from strata.serializers import StrataSerializer



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
        # queryset = Stratum.objects.all(stratification_id=stratification_id)
        queryset = get_list_or_404(Stratum, stratification_id=stratification_id)
        serializer = StrataSerializer(queryset)
        return Response(serializer.data)