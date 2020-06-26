from rest_framework.generics import ListAPIView

from samplers.models import Sampler

from samplers.serializers import SamplerSerializer

class SamplersAPI(ListAPIView):
    """
    Endpoint to retrieve List of Samplers
    """
    queryset = Sampler.objects.all()
    serializer_class = SamplerSerializer
