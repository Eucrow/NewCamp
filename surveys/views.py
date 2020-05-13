import csv

import io

from django.http import HttpResponse
from django.shortcuts import render
from django.views import View
from rest_framework.status import HTTP_201_CREATED

from surveys.models import Survey
from stratifications.models import Stratification
from strata.models import Stratum

from newcamp.apps import convert_comma_to_dot, empty


class SurveyQueryset(object):
    @staticmethod
    def get_survey_queryset(self, pk):
        """
        Returns: query with all the data of a survey
        """
        survey_queryset = Survey.objects.filter(pk=pk).select_related('acronym')
        return survey_queryset

class SurveysQueryset(object):
    @staticmethod
    def get_surveys_queryset(self):
        """
        Get the query with all surveys.
        :return: query with all surveys
        """
        surveys_queryset = Survey.objects.all()
        return surveys_queryset

class SurveyDetailView(View, SurveyQueryset):
    def get(self, request, pk):
        """
        :param request:
        :param pk:
        :return:
        """
        survey_queryset = self.get_survey_queryset(self, pk=pk)
        context = {
            'survey': survey_queryset,
        }
        return render(request, 'surveys/surveys.html', context)

class SurveysView(View, SurveysQueryset):
    def get(self, request):
        """
        Get all Surveys
        :return:
        """

