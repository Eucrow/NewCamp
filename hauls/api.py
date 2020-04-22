from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_csv import renderers as r
# from hauls.views import HaulsImport
from hauls.models import Haul
from hauls.serializers import HaulSerializer, HaulGeoJSONSerializer

from surveys.models import Survey


# class HaulsImportAPI(APIView, HaulsImport):
#     parser_classes = (MultiPartParser,)
#
#     def put(self, request):
#         return self.import_hauls_csv()


class HaulListAPI(ListAPIView):
    """
    Endpoint to get the hauls of a survey
    """

    def get(self, request, acronym_survey):
        hauls = Haul.objects.filter(station__survey__acronym=acronym_survey)
        serializer = HaulSerializer(hauls, many=True)
        return Response(serializer.data)


class HaulListCsvApi(ListAPIView):
    """
    Endpoint of list of surveys hauls in csv format
    """
    renderer_classes = (r.CSVRenderer,)

    def get(self, request, acronym_survey):
        hauls = Haul.objects.filter(station__survey__acronym=acronym_survey)
        serializer = HaulSerializer(hauls, many=True)

        response = Response(serializer.data, content_type='text/csv')
        content_disposition = 'attachment; filename=' + 'hauls_' + acronym_survey + '.csv'
        response['Content-Disposition'] = content_disposition

        return response


class HaulRetrieveAPI(RetrieveAPIView):
    """
    Endpoint to retrieve information of one haul of a survey
    """

    def get(self, request, acronym_survey, haul):
        haul = Haul.objects.filter(station__survey__acronym=acronym_survey, haul=haul)
        serializer = HaulSerializer(haul, many=True)
        return Response(serializer.data)


class HaulGEOJsonAPI(ListAPIView):
    """
    Endpoint to return a GEOJSON with all the hauls
    """

    # TODO filter by survey!!! --> I think is the same as get method of HaulRetrieveAPI

    queryset = Haul.objects.all()

    # Override the list method of the ListAPIView
    def list(self, request, *args, **kwargs):
        # instead of self.queryset, use self.get_queryset()
        queryset = self.get_queryset()

        serializer = HaulGeoJSONSerializer(queryset, many=True)

        hauls_list = serializer.data

        # Add the hauls list to geojson:

        geojson = dict(type='FeatureCollection', features=hauls_list)

        return Response(geojson)
