"""newcamp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  re_path(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  re_path(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  re_path(r'^blog/', include('blog.urls'))
"""
from django.urls import path, re_path, include
from django.contrib import admin

from djgeojson.views import GeoJSONLayerView

from species.api import SpeciesListAPI, SpAPI
from species.views import SpeciesView, CreateSpeciesView, SpDetailView, SpDeleteView, SpEditView, ImportSpeciesFileView
from surveys.views import SurveyDetailView
from surveys.api import SurveysImportAPI, SurveyDetailAPI, SurveyDetailCsvAPI, SurveyRemoveAPI, SurveysListCsvAPI, \
    SurveysAcronymList, SurveyNewAPI
from stratifications.api import StratificationsAPI
from strata.api import StrataAPI
from samplers.api import SamplersAPI
from stations.api import StationsAPI, StationAPI, StationsHaulsAPI, StationsBySurveyAPI
from hauls.api import HaulListAPI, HaulListAllAPI, HaulGEOJsonAPI, HaulListCsvApi, HaulAPI, HaulTrawlAPI,\
    HaulHydrographyAPI
from import_old_camp.api import ImportOldCampAPI, ImportOldCampAPIHydrography, SpeciesImportAPI

urlpatterns = [
    re_path(r'^admin/', admin.site.urls),
    re_path(r'^species/', SpeciesView.as_view(), name='species_list'),
    re_path(r'^sp/(?P<pk>[0-9]+)$', SpDetailView.as_view(), name='sp_detail'),
    re_path(r'^sp/add/', CreateSpeciesView.as_view(), name='create_species'),
    re_path(r'^sp/edit/(?P<pk>[0-9]+)$', SpEditView.as_view(), name='sp_edit'),
    re_path(r'^sp/remove/(?P<pk>[0-9]+)$', SpDeleteView.as_view(), name='sp_delete'),
    re_path(r'^import_species/', ImportSpeciesFileView.as_view(), name='import_species_file'),

    re_path(r'^surveys/(?P<pk>[0-9]+)$', SurveyDetailView.as_view(), name='survey_detail'),

    # Species API URLS
    re_path(r'^api/1.0/species/$', SpeciesListAPI.as_view(), name="species_list_api"),
    re_path(r'^api/1.0/species/(?P<pk>[0-9]+)$', SpAPI.as_view(), name="sp_api"),
    re_path(r'^api/1.0/species/new/$', SpAPI.as_view(), name="sp_api"),
    re_path(r'^api/1.0/species/import$', SpeciesImportAPI.as_view(), name="species_import_api"),

    # Samplers API URLS
    re_path(r'^api/1.0/samplers/$', SamplersAPI.as_view(), name="samplers_list_api"),

    # Surveys API URLS
    re_path(r'^api/1.0/surveys/import$', SurveysImportAPI.as_view(), name="surveys_import_api"),
    re_path(r'^api/1.0/surveys/(?P<pk>[0-9]+)$', SurveyDetailAPI.as_view(), name="get_survey_api"),
    re_path(r'^api/1.0/surveys/remove/(?P<pk>[0-9]+)$', SurveyRemoveAPI.as_view(), name="get_survey_api"),
    # TODO: change acronym to survey id???
    re_path(r'^api/1.0/surveys/csv/(?P<acronym>[N,D][0-9]{2})$', SurveyDetailCsvAPI.as_view(),
            name="get_survey_api_csv"),
    re_path(r'^api/1.0/surveys/csv/all', SurveysListCsvAPI.as_view(), name="get_survey_api_csv"),
    # re_path(r'^api/1.0/surveys/$', SurveysList.as_view(), name="get_surveys_api"),
    re_path(r'^api/1.0/surveys/$', SurveysAcronymList.as_view(), name="get_surveys_api"),
    re_path(r'api/1.0/surveys/new/$', SurveyNewAPI.as_view(), name="add_survey_api"),

    # Stratification API URLS
    re_path(r'^api/1.0/stratifications/$', StratificationsAPI.as_view(), name="get_stratifications_api"),

    # Stratum API URLS
    re_path(r'^api/1.0/strata/(?P<stratification_id>[0-9]+)$', StrataAPI.as_view(), name="get_strata_api"),

    # Stations API urls
    re_path(r'^api/1.0/station/(?P<station_id>[0-9]+)$', StationAPI.as_view(), name="get_update_station_api"),
    re_path(r'^api/1.0/station/new/$', StationAPI.as_view(), name="add_survey_api"),
    re_path(r'^api/1.0/station/remove/(?P<station_id>[0-9]+)$', StationAPI.as_view(), name="remove_station_api"),
    re_path(r'^api/1.0/stations/$', StationsAPI.as_view(), name="get_stations_api"),
    re_path(r'^api/1.0/stations/(?P<survey_id>[0-9]+)$', StationsBySurveyAPI.as_view(),
            name="get_stations_by_survey_api"),
    re_path(r'^api/1.0/stations/hauls/(?P<survey_id>[0-9]+)$', StationsHaulsAPI.as_view(), name="station_haul_api"),

    # Hauls API URLs
    re_path(r'^api/1.0/haul/(?P<haul_id>[0-9]+)$', HaulAPI.as_view(), name="get_haul_api"),
    # re_path(r'^api/1.0/haul/new$', HaulAPI.as_view(), name="add_haul_api"),
        # Trawl hauls
        re_path(r'^api/1.0/haul/trawl/(?P<haul_id>[0-9]+)$', HaulTrawlAPI.as_view(), name="get_trawl_haul_api"),
        re_path(r'^api/1.0/haul/trawl/new/$', HaulTrawlAPI.as_view(), name="add_trawl_haul_api"),
        re_path(r'^api/1.0/haul/trawl/remove/(?P<haul_id>[0-9]+)$', HaulTrawlAPI.as_view(),
                name="remove_trawl_haul_api"),
        # Hydrology hauls
        re_path(r'^api/1.0/haul/hydrography/(?P<haul_id>[0-9]+)$', HaulHydrographyAPI.as_view(),
                name="get_hydrography_haul_api"),
        re_path(r'^api/1.0/haul/hydrography/new/$', HaulHydrographyAPI.as_view(), name="add_hydrography_haul_api"),
        re_path(r'^api/1.0/haul/hydrography/remove/(?P<haul_id>[0-9]+)$', HaulHydrographyAPI.as_view(),
                name="remove_hydrography_haul_api"),

    re_path(r'^api/1.0/hauls/$', HaulListAllAPI.as_view(), name="get_hauls_api"),
    re_path(r'^api/1.0/hauls/(?P<survey_id>[0-9])$', HaulListAPI.as_view(), name="get_hauls_api"),
    re_path(r'^api/1.0/hauls/csv/(?P<acronym_survey>[A-Z][0-9][0-9])', HaulListCsvApi.as_view(),
            name="get_hauls_api_csv"),
    re_path(r'^api/1.0/hauls/data.geojson/(?P<pk>[0-9]+)$', HaulGEOJsonAPI.as_view(), name="get_haul_geojson_api"),

    # Catches API URLS

    # Lengths API URLs
    # re_path(r'^api/1.0/sampled_weights/import$', SampledWeightsImportAPI.as_view(), name="lengths_import"),

    # Import Data
    re_path(r'^api/1.0/import_hydrography$', ImportOldCampAPIHydrography.as_view(), name="old_camp_import_hydrography"),
    re_path(r'^api/1.0/import$', ImportOldCampAPI.as_view(), name="old_camp_import"),

    # Frontend
    path('', include('frontend.urls')),

]
