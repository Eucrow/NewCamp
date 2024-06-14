from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from catches.serializers import SexCatchSerializer
from samples.models import Length, SampledWeight, Sex
from samples.serializers import SampleWeightSerializer, LengthSexSerializer, individualSerializer
from not_measured_individuals.models import notMeasuredIndividual


# class SampledWeightCreate(APIView):
#     """
#     Endpoint to create a new sampled weight of a catch.
#     """
#     def post(self, request):
#         serializer = SampleWeightSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(catch_id=request.data["catch_id"])
#             return Response(serializer.data, status=HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


# class SampledWeightDetail(generics.RetrieveUpdateDestroyAPIView):
#     """
#     Endpoint to retrieve, update and destroy sampled weight of a catch.
#     """
#     queryset = SampledWeight.objects.all()
#     serializer_class = SampleWeightSerializer

class LengthsSexAPI(APIView):
    """

    Retrieve, create and delete lengths with its sex.

    There is not implemented the update method for simplicity. All the lengths

    of a sex are deleted and created in the same request. So instead of update the lengths,

    the user must delete them and create new ones.
    """

    def get(self, request, catch_id, sex):
        lengths = Length.objects.filter(sex_id__catch_id=catch_id, sex_id__sex=sex)

        serializer = LengthSexSerializer(lengths, many=True)

        return Response(serializer.data)

    def post(self, request, catch_id, sex):
        # Create a mew Sex instance

        sex_instance = Sex.objects.create(catch_id=catch_id, sex=sex)

        # Create a new Length instance for each length in lengths_data

        # for length_data in lengths_data:

        for length_data in request.data:
            Length.objects.create(sex_id=sex_instance.id, **length_data)

        # Retrieve the newly created Length instances

        lengths = Length.objects.filter(sex_id=sex_instance.id)

        serializer = LengthSexSerializer(lengths, many=True)
        return Response(serializer.data, status=HTTP_201_CREATED)

    def delete(self, request, catch_id, sex):
        """

        remove all the lengths of the sex_id
        """

        sex_instance = Sex.objects.filter(catch_id=catch_id, sex=sex)

        sex_instance.delete()

        return Response(status=HTTP_204_NO_CONTENT)


class IndividualsAPI(APIView):
    """

    Retrieve, create and delete individuals of a catch.
    """

    def get(self, request, catch_id):
        individuals = notMeasuredIndividual.objects.filter(catch_id=catch_id)
        serializer = individualSerializer(individuals, many=True)
        return Response(serializer.data)

    def post(self, request, catch_id):
        """
        Create a new Individual instance
        """
        serializer = individualSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(catch_id=catch_id)
            return Response(serializer.data, status=HTTP_201_CREATED)

        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
