from rest_framework import serializers

from samplers.models import Sampler

class SamplerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sampler
        fields = ['id', 'sampler', 'comment', ]

    def __str__(self):
        return '%s' %(self.sampler)