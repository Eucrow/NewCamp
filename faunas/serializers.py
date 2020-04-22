from rest_framework import serializers

from hauls.serializers import ImportHaulSerializer
from species.serializers import SpeciesSerializer
from faunas.models import Fauna
from surveys.serializers import SurveySerializer


class FaunaSerializer(serializers.ModelSerializer):
    survey = SurveySerializer(read_only=True)
    haul = ImportHaulSerializer(read_only=True)
    species = SpeciesSerializer(read_only=True, many=True)

    class Meta:
        model = Fauna
        fields = '__all__'
        depth = 1

