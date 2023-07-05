from rest_framework.response import Response
from rest_framework.views import APIView

from samples.models import Sex
from sexes.serializers import SexesSerializer \
    # , SexesExistsSerializer


class SexesAPI(APIView):

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

# class SexesExists(APIView):
#
#     def get(self, request, catch_id):
#
#         try:
#             sexes = Sex.objects.get(catch_id=catch_id)
#         except Sex.DoesNotExist:
#             has_data = False
#             # serializer = SexesExistsSerializer(sexes, False)
#         else:
#             has_data = True
#             # serializer = SexesExistsSerializer(sexes, True)
#
#         # return Response(serializer.data)
#         return Response(has_data)
