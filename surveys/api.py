from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView
from rest_framework_csv import renderers as r

from surveys.models import Survey
from surveys.serializers import SurveySerializer, SurveyAcronymsSerializer
from import_old_camp.views import SurveysImport
from stratifications.models import Stratification
from strata.models import Stratum


class SurveysImportAPI(APIView, SurveysImport):
    parser_classes = (MultiPartParser,)

    def put(self, request):
        my_file = request.FILES['file']

        return self.import_surveys_csv(my_file)


class SurveyDetailAPI(APIView):
    """
    Endpoint of Survey Detail API
    """

    def get(self, request, pk):

        survey = get_object_or_404(Survey.objects.select_related('stratification'), pk=pk)

        serializer = SurveySerializer(survey)

        return Response(serializer.data)


class SurveyDetailCsvAPI(APIView):
    """
    Endpoint of Survey Detail API in csv format
    """
    renderer_classes = (r.CSVRenderer,)

    def get(self, request, acronym):
        survey = get_object_or_404(Survey, acronym=acronym)
        serializer = SurveySerializer(survey)

        response = Response(serializer.data, content_type='text/csv')
        content_disposition = 'attachment; filename=' + 'survey_' + survey.acronym + '.csv'
        response['Content-Disposition'] = content_disposition

        return response


class SurveysListCsvAPI(APIView):
    """
    Endpoint of list of surveys in csv format
    """
    renderer_classes = (r.CSVRenderer,)

    def get(self, request):
        all_surveys = Survey.objects.all()
        serializer = SurveySerializer(all_surveys, many=True)

        response = Response(serializer.data, content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="all_surveys.csv"'

        return response

class SurveysList(ListAPIView):
    """
    Endpoint of list of surveys
    """
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer

class SurveysAcronymList(ListAPIView):
    """
    Endpoint of list of acronyms of all surveys.
    """
    queryset = Survey.objects.only("acronym")
    serializer_class = SurveyAcronymsSerializer


class SurveyRemoveAPI(APIView):
    """
    Endpoint to remove survey.
    Remove the surveys and all data of tables related.
    """

    def delete(self, request, pk):
        survey = get_object_or_404(Survey, pk=pk)
        survey.delete()
        return Response(status=status.HTTP_200_OK)
