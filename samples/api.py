from rest_framework import generics

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_201_CREATED, HTTP_400_BAD_REQUEST

from catches.serializers import SexCatchSerializer
from samples.models import Length, SampledWeight, Sex

from samples.serializers import LenghtSerializer, SampleWeightSerializer, LengthSerializer2, LengthSexSerializer


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
    Retrieve, create and update lengths with its sex
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


class LengthsAPI(APIView):
    """
    Retrieve, create and update lengths.
    sex_id is needed.
    """

    def get(self, request, sex_id):
        # lengths = get_list_or_404(Length, sex_id=sex_id)
        lengths = Length.objects.filter(sex_id=sex_id)
        serializer = LenghtSerializer(lengths, many=True)

        return Response(serializer.data)

    def post(self, request, sex_id):
        # The LengthSerializer is prepared to allow update and create multiple objects, so many=True is explicit
        # I'm using LengthSerializer2 because I can't use the LenghtSerializer
        serializer = LengthSerializer2(data=request.data, many=True)

        if serializer.is_valid():
            serializer.save(sex_id=sex_id)
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def put(self, request, sex_id):
        lengths = Length.objects.filter(sex_id=sex_id)
        # The LengthSerializer is prepared to allow update and create multiple objects, so many=True is explicit
        serializer = LenghtSerializer(
            lengths, data=request.data, partial=True, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, sex_id):
        """
        remove all the lengths of the sex_id
        """
        lengths = Length.objects.filter(sex_id=sex_id)
        lengths.delete()
        return Response(status=HTTP_204_NO_CONTENT)

    # TODO: manage errors, what to do with them?


# TODO: This may not be needed. Check it.
class SexLengthsAPI(APIView):
    """
    Create a new sex with its lengths.
    """

    def post(self, request):

        serializer = SexCatchSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
