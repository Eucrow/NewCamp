from django.urls import path, re_path
from . import views


urlpatterns = [
    path('', views.index ),
    # surveys:
    re_path(r'^surveys/$', views.surveys, name="surveys_list")
]
