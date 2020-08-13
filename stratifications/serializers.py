from rest_framework import serializers

from stratifications.models import Stratification

class StratificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stratification
        fields = ['id', 'stratification', 'comment']