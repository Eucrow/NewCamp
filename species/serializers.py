from rest_framework import serializers

from species.models import Sp


class SpeciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sp
        fields = '__all__'
