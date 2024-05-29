from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT, HTTP_200_OK
from rest_framework.views import APIView
from rest_framework_csv import renderers as r

from gears.models import Trawl
from gears.models import CTD
# from hauls.views import HaulsImport
from hauls.models import Haul, HaulTrawl, HaulHydrography, Meteorology
from hauls.serializers import HaulSerializer, HaulGeoJSONSerializer, HaulTrawlSerializer, HaulHydrographySerializer, \
    HydrographySerializer, MeteorologySerializer, TrawlSerializer
from samplers.models import Sampler
from stations.models import Station
from strata.models import Stratum

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
        serializer = HaulSerializer(hauls, many=True, context={'request': request})
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
    Endpoint to retrieve and delete information of one haul of a survey
    """

    def get(self, request, haul_id):
        haul = get_object_or_404(Haul, pk=haul_id)
        serializer = HaulSerializer(haul, context={'request': request})
        return Response(serializer.data)

    def delete(self, request, haul_id, format=None):
        haul = Haul.objects.get(pk=haul_id)
        haul.delete()
        return Response(status=HTTP_204_NO_CONTENT)

    def put(self, request, haul_id):

        haul = get_object_or_404(Haul, pk=haul_id)
        serializer = HaulSerializer(
            haul, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        serializer = HaulSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class HaulMeteorologyAPI(APIView):
    """
    Endpoint to retrieve the Haul Meteorology of a survey.
    """

    def get(self, request, haul_id):
        haul_meteo = get_object_or_404(HaulMeteorologyAPI, pk=haul_id)
        serializer = HaulTrawlSerializer(haul_meteo)
        return Response(serializer.data)


class MeteorologyAPI(APIView):
    """Endpoint to manage the Meteorology of a haul."""

    def get(self, request, haul_id):
        """Retrieve the Meteorology data for a given haul. """
        print(type(haul_id))
        haul_id = int(haul_id)
        meteorology = get_object_or_404(Meteorology, haul_id=haul_id)
        serializer = MeteorologySerializer(meteorology)
        return Response(serializer.data)

    def post(self, request):
        """Create a new Meteorology object."""
        serializer = MeteorologySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(haul_id=request.data['haul_id'])
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def put(self, request, haul_id):
        """Update a Meteorology object with the given haul_id."""
        # meteorology = get_object_or_404(Meteorology, haul_id=haul_id)
        meteorology, created = Meteorology.objects.get_or_create(
            haul_id=haul_id)
        serializer = MeteorologySerializer(
            meteorology, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            status = HTTP_201_CREATED if created else HTTP_200_OK
            return Response(serializer.data, status=status)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)

    def delete(self, request, haul_id, format=None):
        """Delete the Meteorology data for a given haul."""
        meteorology = Meteorology.objects.get(haul_id=haul_id)
        meteorology.delete()
        return Response(status=HTTP_204_NO_CONTENT)


class TrawlAPI(APIView):
    """Endpoint to manage the Trawl characteristics of a haul."""

    def get(self, request, haul_id):
        """Retrieve the Trawl data for a given haul."""
        # haul_id = int(haul_id)
        print(type(haul_id))
        haul_id = int(haul_id)
        trawl = get_object_or_404(HaulTrawl, haul_id=haul_id)
        # trawl = HaulTrawl.objects.get(haul_id=haul_id)
        serializer = TrawlSerializer(trawl)
        return Response(serializer.data)

    def post(self, request):
        """Create a new Trawl object."""
        serializer = TrawlSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def put(self, request, haul_id):
        """Update a Trawl object with the given haul_id."""
        trawl, created = HaulTrawl.objects.get_or_create(haul_id=haul_id)
        serializer = TrawlSerializer(trawl, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            status = HTTP_201_CREATED if created else HTTP_200_OK
            return Response(serializer.data, status=status)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, haul_id, format=None):
        """Delete the Trawl data for a given haul."""
        trawl = HaulTrawl.objects.get(haul_id=haul_id)
        trawl.delete()
        return Response(status=HTTP_204_NO_CONTENT)


class HydrographyAPI(APIView):
    """Endpoint to manage the Haul Trawl of a survey."""

    def get(self, request, haul_id):
        """Retrieve a HaulHydrography object with the given haul_id."""
        hydrography = get_object_or_404(HaulHydrography, haul_id=haul_id)
        serializer = HydrographySerializer(hydrography)
        return Response(serializer.data)

    def post(self, request):
        """Create a new HaulHydrography object with the given request data."""
        hydrography = HaulHydrography()
        serializer = HydrographySerializer(hydrography, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)

    def put(self, request, haul_id):
        """Update a HaulHydrography object with the given haul_id."""
        hydrography = get_object_or_404(HaulHydrography, haul_id=haul_id)
        serializer = HydrographySerializer(
            hydrography, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)


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

        station = Station.objects.get(pk=request.data['station_id'])
        # stratum = Stratum.objects.get(pk=request.data['stratum_id'])
        sampler = Sampler.objects.get(pk=request.data['sampler_id'])
        # TODO: I'M USING THE TRAWL GEAR --> NEED TO CREATE A HYDROGRAPHY GEAR
        # trawl = Trawl.objects.get(pk=request.data['trawl_id'])
        ctd = CTD.objects.get(pk=request.data['ctd_id'])

        if serializer.is_valid():
            serializer.save(station=station,
                            # stratum=stratum,
                            sampler=sampler,
                            # trawl=trawl,
                            ctd=ctd,
                            )
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def put(self, request, haul_id):
        haul = get_object_or_404(Haul, pk=haul_id)
        serializer = HaulHydrographySerializer(
            haul, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)


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
