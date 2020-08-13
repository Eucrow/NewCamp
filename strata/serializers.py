from rest_framework import serializers

from strata.models import Stratum


class StrataSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stratum
        fields = ['id', 'stratum', 'area', 'comment', 'stratification_id']