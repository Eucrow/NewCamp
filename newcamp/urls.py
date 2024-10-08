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
from django.urls import path, re_path
from django.contrib import admin

# this is for compile the static files:
from django.conf import settings
from django.conf.urls.static import static

# from djgeojson.views import GeoJSONLayerView

from ships.api import ShipsAPI, ShipAPI
from gears.api import GearTrawlsAPI, GearTrawlsBasicAPI, GearTrawlAPI, GearTrawlsNamesAPI, GearCTDsBasicAPI
from species.api import SpAPI, SpeciesGroupAPI, SpeciesAPI, MeasurementTypeAPI, MeasurementTypeListCreateAPI
from species.views import SpeciesView, CreateSpeciesView, SpDetailView, SpDeleteView, SpEditView, ImportSpeciesFileView
from surveys.views import SurveyDetailView
from surveys.api import SurveysImportAPI, SurveyDetailAPI, SurveyDetailCsvAPI, SurveyRemoveAPI, SurveysListCsvAPI, \
    SurveysAcronymList, SurveyNewAPI, SurveyAPI, SurveysAPI
from stratifications.api import StratificationsAPI
from strata.api import StrataAPI
from samplers.api import SamplersAPI
from stations.api import StationsAPI, StationAPI, StationsHaulsAPI, StationsBySurveyAPI
from hauls.api import HaulGEOJsonAPI, HaulListCsvApi, HaulAPI, \
    HaulHydrographyAPI, HydrographyAPI, MeteorologyAPI, TrawlAPI
from catches.api import CatchHaulListAPI, CatchHaulAPI, CatchVerboseAPI
from samples.api import LengthsSexAPI
# , SampledWeightDetail, SampledWeightCreate
from import_old_camp.api import ImportOldCampAPI, ImportOldCampAPIHydrography, SpeciesImportAPI
from conn_r.api import GetTrawlHaulsAPIConnR, GetDataStationsAPIConnR
from reports.api import ReportLengthsCSVApi

urlpatterns = [
                  re_path(r'^admin/', admin.site.urls),
                  re_path(r'^species/', SpeciesView.as_view(), name='species_list'),
                  re_path(r'^sp/(?P<pk>[0-9]+)$', SpDetailView.as_view(), name='sp_detail'),
                  re_path(r'^sp/add/', CreateSpeciesView.as_view(), name='create_species'),
                  re_path(r'^sp/edit/(?P<pk>[0-9]+)$', SpEditView.as_view(), name='sp_edit'),
                  re_path(r'^sp/remove/(?P<pk>[0-9]+)$',
                          SpDeleteView.as_view(), name='sp_delete'),
                  re_path(r'^import_species/', ImportSpeciesFileView.as_view(),
                          name='import_species_file'),

                  re_path(r'^surveys/(?P<pk>[0-9]+)$',
                          SurveyDetailView.as_view(), name='survey_detail'),

                  # Ships API URLS
                  re_path(r'^api/1.0/ship/$', ShipsAPI.as_view(),
                          name="ship_list_create_api"),
                  re_path(r'^api/1.0/ship/(?P<pk>[0-9]+)$',
                          ShipAPI.as_view(), name="ship_get_update_delete_api"),

                  # Species API URLS
                  re_path(r'^api/1.0/species/$', SpeciesAPI.as_view(),
                          name="species_list_create_api"),
                  re_path(r'^api/1.0/species/(?P<pk>[0-9]+)$',
                          SpAPI.as_view(), name="sp_retrieve_update_destroy_api"),
                  re_path(r'^api/1.0/species/group/(?P<group>[0-9]+)$',
                          SpeciesGroupAPI.as_view(), name="species_group_api"),
                  re_path(r'^api/1.0/species/import$',
                          SpeciesImportAPI.as_view(), name="species_import_api"),

                  # MeasurementType API URLS
                  path('api/1.0/measurement_types/<int:pk>', MeasurementTypeAPI.as_view(),
                       name='measurement_units_retrieve_update_delete'),
                  path('api/1.0/measurement_types', MeasurementTypeListCreateAPI.as_view(),
                       name='measurement_units_list_create'),

                  # Trawls API URLS
                  re_path(r'^api/1.0/gears/trawl/$', GearTrawlsAPI.as_view(),
                          name="gear_list_create_api"),
                  re_path(r'^api/1.0/gears/trawl/basic/$',
                          GearTrawlsBasicAPI.as_view(), name="gear"),
                  # re_path(r'^api/1.0/gears/trawl/basic/$', GearTrawlsNamesAPI.as_view(), name="gear_names"),
                  re_path(r'^api/1.0/gears/trawl/(?P<pk>[0-9]+)$',
                          GearTrawlAPI.as_view(), name="gear_get_update_delete_api"),

                  # CTD API URLS
                  re_path(r'^api/1.0/gears/ctd/basic/$',
                          GearCTDsBasicAPI.as_view(), name="gear"),

                  # Samplers API URLS
                  re_path(r'^api/1.0/samplers/$', SamplersAPI.as_view(),
                          name="samplers_list_api"),

                  # Surveys API URLS
                  re_path(r'^api/1.0/survey/(?P<pk>[0-9]+)$',
                          SurveyAPI.as_view(), name="survey_list_create_api"),
                  re_path(r'^api/1.0/survey/$', SurveysAPI.as_view(),
                          name="survey_get_update_delete_api"),
                  # re_path(r'^api/1.0/surveys/(?P<pk>[0-9]+)$', SurveyDetailAPI.as_view(), name="get_survey_api"),
                  # re_path(r'^api/1.0/surveys/remove/(?P<pk>[0-9]+)$', SurveyRemoveAPI.as_view(),
                  #     name="get_survey_api"),
                  # TODO: change acronym to survey id???
                  #  re_path(r'^api/1.0/surveys/$', SurveysAcronymList.as_view(), name="get_surveys_api"),
                  # re_path(r'api/1.0/surveys/new/$', SurveyNewAPI.as_view(), name="add_survey_api"),

                  # Surveys import
                  re_path(r'^api/1.0/surveys/import$',
                          SurveysImportAPI.as_view(), name="surveys_import_api"),
                  # Surveys csv
                  re_path(r'^api/1.0/surveys/csv/(?P<acronym>[N,D][0-9]{2})$', SurveyDetailCsvAPI.as_view(),
                          name="get_survey_api_csv"),
                  re_path(r'^api/1.0/surveys/csv/all',
                          SurveysListCsvAPI.as_view(), name="get_survey_api_csv"),

                  # Stratification API URLS
                  re_path(r'^api/1.0/stratifications/$',
                          StratificationsAPI.as_view(), name="get_stratifications_api"),

                  # Stratum API URLS
                  re_path(r'^api/1.0/strata/(?P<stratification_id>[0-9]+)$',
                          StrataAPI.as_view(), name="get_strata_api"),

                  # Stations API urls
                  re_path(r'^api/1.0/station/(?P<station_id>[0-9]+)$',
                          StationAPI.as_view(), name="get_update_delete_station_api"),
                  re_path(r'^api/1.0/station/$', StationAPI.as_view(), name="add_survey_api"),
                  re_path(r'^api/1.0/stations/$', StationsAPI.as_view(),
                          name="get_stations_api"),
                  re_path(r'^api/1.0/stations/(?P<survey_id>[0-9]+)$', StationsBySurveyAPI.as_view(),
                          name="get_stations_by_survey_api"),
                  re_path(r'^api/1.0/stations/hauls/(?P<survey_id>[0-9]+)$', StationsHaulsAPI.as_view(),
                          name="get_stations_with_hauls_api"),

                  # Hauls API URLs
                  re_path(r'^api/1.0/haul/(?P<haul_id>[0-9]+)$',
                          HaulAPI.as_view(), name="haul_api"),
                  re_path(r'^api/1.0/haul/new/$', HaulAPI.as_view(), name="add_haul_api"),
                  re_path(r'^api/1.0/hauls/csv/(?P<acronym_survey>[A-Z][0-9][0-9])', HaulListCsvApi.as_view(),
                          name="get_hauls_api_csv"),

                  re_path(r'^api/1.0/hauls/data.geojson/(?P<pk>[0-9]+)$',
                          HaulGEOJsonAPI.as_view(), name="get_haul_geojson_api"),

                  # TODO: I think this is not needed. Check it.
                  # Meteorology API URLs
                  re_path(r'^api/1.0/meteorology/(?P<haul_id>[0-9]+)$', MeteorologyAPI.as_view(),
                          name="get_update_delete_meteorology_api"),
                  re_path(r'^api/1.0/meteorology/$', MeteorologyAPI.as_view(),
                          name="add_meteorology_api"),

                  # Trawl hauls
                  re_path(r'^api/1.0/trawl/(?P<haul_id>[0-9]+)$',
                          TrawlAPI.as_view(), name="retrieve_update_delete_trawl_api"),
                  re_path(r'^api/1.0/trawl/$', TrawlAPI.as_view(), name="add_trawl_api"),

                  # Hydrography
                  re_path(r'^api/1.0/hydrography/(?P<haul_id>[0-9]+)$', HydrographyAPI.as_view(),
                          name="retrieve_update_hydrography_api"),

                  re_path(r'^api/1.0/haul/hydrography/(?P<haul_id>[0-9]+)$', HaulHydrographyAPI.as_view(),
                          name="get_hydrography_haul_api"),
                  re_path(r'^api/1.0/haul/hydrography/new/$',
                          HaulHydrographyAPI.as_view(), name="add_hydrography_haul_api"),

                  # Catches API URLS
                  re_path(r'^api/1.0/catches/(?P<haul_id>[0-9]+)$',
                          CatchHaulListAPI.as_view(), name="get_catches_haul_api"),
                  # TODO: the next three routes must be standarized:
                  re_path(r'^api/1.0/catches/new$',
                          CatchHaulAPI.as_view(), name="add_catch_api"),
                  re_path(r'^api/1.0/catch/(?P<haul_id>[0-9]+)/(?P<sp_id>[0-9]+)/(?P<category>[0-9]+)$',
                          CatchHaulAPI.as_view(),
                          name="get_catch_api"),
                  re_path(r'^api/1.0/catch/verbose/(?P<catch_id>[0-9]+)$', CatchVerboseAPI.as_view(),
                          name="retrieve_verbosed_catch_api"),
                  re_path(r'^api/1.0/catch$', CatchHaulAPI.as_view(), name="edit_catch_api"),
                  re_path(r'^api/1.0/catch/remove$',
                          CatchHaulAPI.as_view(), name="remove_catch_api"),

                  # Samples API URLs
                  # re_path(r'^api/1.0/samples/new$', SampleAPI.as_view(), name="add_sample_api"),
                  # path('api/1.0/sampled_weight/new', SampledWeightCreate.as_view(), name="create_sampled_weight_api"),
                  # path('api/1.0/sampled_weight/<int:pk>', SampledWeightDetail.as_view(),
                  #      name="retrieve_update_delete_sampled_weight_api"),

                  # Lengths API URLs
                  re_path(r'^api/1.0/lengths/(?P<catch_id>[0-9]+)/(?P<sex>[123]+)$', LengthsSexAPI.as_view(),
                          name="lenghts_sex_api"),

                  # re_path(r'^api/1.0/sampled_weights/import$', SampledWeightsImportAPI.as_view(),
                  #     name="lengths_import"),

                  # Import Data
                  re_path(r'^api/1.0/import_hydrography$',
                          ImportOldCampAPIHydrography.as_view(), name="old_camp_import_hydrography"),
                  re_path(r'^api/1.0/import$', ImportOldCampAPI.as_view(),
                          name="old_camp_import"),

                  # conn_r
                  re_path(r'^api/1.0/conn_r/get_trawl_hauls/(?P<acronym>[A-Z][0-9][0-9])$',
                          GetTrawlHaulsAPIConnR.as_view(),
                          name="get_trawls_hauls_api_conn_r"),
                  re_path(r'^api/1.0/conn_r/get_data_stations/(?P<acronym>[A-Z][0-9][0-9])$',
                          GetDataStationsAPIConnR.as_view(),
                          name="get_data_stations_api_conn_r"),

                  # Export csv
                  re_path(r'api/1.0/reports/report_csv/(?P<survey_id>[0-9]+)$', ReportLengthsCSVApi.as_view(),
                          name='report_csv'),

                  # Frontend
                  # path('', include('frontend.urls')),

              ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# this is for compile the static files:
# + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
