from django.shortcuts import get_list_or_404
from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response

from catches.models import Catch
from samples.models import Length

from catches.serializers import CatchesVerboseSerializer

# from catches.views import CatchesImport


# class CatchesImportAPI(APIView, CatchesImport):
#
#     parser_classes = (MultiPartParser,)
#
#     def put(self, request):
#
#         return self.import_catches_csv()

class CatchHaulListAPI(APIView):
    """
    Endpoint to get all the catches of a trawl haul.
    """
    def get(self, request, haul_id):
        catches = get_list_or_404(Catch, haul_id=haul_id)
        serializer = CatchesVerboseSerializer(catches, many=True)

        # number_individuals = Length.objects.filter(sex__catch__haul_id=haul_id)

        return Response(serializer.data)