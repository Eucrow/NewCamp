from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT
from rest_framework.views import APIView
from rest_framework_csv import renderers as r
# from hauls.views import HaulsImport
from hauls.models import Haul, HaulTrawl, HaulHydrography
from hauls.serializers import HaulSerializer, HaulGeoJSONSerializer, HaulTrawlSerializer, HaulHydrographySerializer

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

    def get(self, request, survey_id):
        hauls = Haul.objects.filter(station__survey__pk=survey_id)
        serializer = HaulSerializer(hauls, many=True)
        return Response(serializer.data)

class HaulListAllAPI(ListAPIView):
    """
    Endpoint to get all the hauls of all surveys
    """
    def get(self, request):
        hauls = Haul.objects.all()
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


# class HaulRetrieveAPI(RetrieveAPIView):
#     """
#     Endpoint to retrieve information of one haul of a survey
#     """
#
#     def get(self, request, acronym_survey, haul):
#         haul = Haul.objects.filter(station__survey__acronym=acronym_survey, haul=haul)
#         serializer = HaulSerializer(haul, many=True)
#         return Response(serializer.data)

class HaulAPI(APIView):
    """
    Endpoint to retrieve information of one haul of a survey
    """

    def get(self, request, haul_id):
        haul = get_object_or_404(Haul, pk=haul_id)
        serializer = HaulSerializer(haul)
        return Response(serializer.data)

    # def post(self, request):
    #     serializer = HaulSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save

class HaulMeteorologyAPI(APIView):
    """
    Endpoint to retrieve the Haul Meteorology of a survey.
    """
    def get(self, request, haul_id):
        haul_meteo = get_object_or_404(HaulMeteorologyAPI, pk=haul_id)
        serializer = HaulTrawlSerializer(haul_meteo)
        return Response(serializer.data)

class HaulTrawlAPI(APIView):
    """
    Endpoint to manage the Haul Trawl of a survey.
    """
    def get(self, request, haul_id):
        haul = get_object_or_404(Haul, pk=haul_id)
        serializer = HaulTrawlSerializer(haul)
        return Response(serializer.data)

    def post(self, request):
        serializer = HaulTrawlSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(station_id=request.data["station_id"],
                            stratum_id=request.data['stratum_id'],
                            sampler_id=request.data['sampler_id'])
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def put(self, request, haul_id):
        haul = get_object_or_404(Haul, pk=haul_id)
        serializer = HaulTrawlSerializer(haul, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)

    def delete(self, request, haul_id, format=None):
        haul = Haul.objects.get(pk=haul_id)
        haul.delete()
        return Response(status=HTTP_204_NO_CONTENT)

class HaulHydrographyAPI(APIView):
    """
    Endpoint to manage the Hydrography Haul of a survey.
    """
    def get(self, request, haul_id):
        haul = get_object_or_404(Haul, pk=haul_id)
        serializer = HaulHydrographySerializer(haul)
        return Response(serializer.data)

    def post(self, request):
        serializer = HaulHydrographySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(station_id=request.data["station_id"],
                            stratum_id=request.data['stratum_id'],
                            sampler_id=request.data['sampler_id'])
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def put(self, request, haul_id):
        haul = get_object_or_404(Haul, pk=haul_id)
        serializer = HaulHydrographySerializer(haul, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)

    # def delete(self, request, haul_id, format=None):
    #     haul = Haul.objects.get(pk=haul_id)
    #     haul.delete()
    #     return Response(status=HTTP_204_NO_CONTENT)

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
