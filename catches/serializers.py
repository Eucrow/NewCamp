from rest_framework import serializers

from catches.models import Catch


class CatchesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Catch
        fields = '__all__'
        # depth = 1

