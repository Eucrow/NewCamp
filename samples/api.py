from django.shortcuts import get_list_or_404
from rest_framework import status, generics

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_201_CREATED, HTTP_400_BAD_REQUEST

from catches.serializers import SexCatchSerializer
from samples.models import Length, Sex

from samples.serializers import LenghtSerializer, SampleWeightSerializer, LengthListSerializer, LengthSerializer2, \
    SexSerializer


class SampleAPI(APIView):
    """
    Endpoint to manage sample weights.
    """
    def post(self, request):
        serializer=SampleWeightSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(catch_id=request.data["catch_id"])
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class SexCreate(APIView):
    """
    Endpoint to create a sex of a catch.
    """
    def post(self, request):
        serializer=SexSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(catch_id=request.data["catch_id"])
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class SexDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Endpoint to retrieve, update and destroy sex of a catch
    """
    queryset = Sex.objects.all()
    serializer_class = SexSerializer


class SexAPI(APIView):
    """
    Endpoint to create and update sex of a catch.
    """

    # def get(self, request, haul_id, category_id):
    #     # catch = Catch.objects.get(category_id = category_id)
    #     catch = get_object_or_404(Catch, haul_id=haul_id, category_id=category_id)
    #     serializer = CatchSerializer(catch)
    #     return Response(serializer.data)

    def post(self, request):
        serializer=SexSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(catch_id=request.data["catch_id"])
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def put(self, request):
        sex = Sex.objects.get(id=request.data["id"])
        serializer = SexSerializer(sex, data=request.data)
        if serializer.is_valid():
            serializer.save(catch_id=request.data["catch_id"])
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

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
        serializer=LengthSerializer2(data=request.data, many=True)

        if serializer.is_valid():
            serializer.save(sex_id=sex_id)
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def put(self, request, sex_id):
        lengths = Length.objects.filter(sex_id=sex_id)
        # The LengthSerializer is prepared to allow update and create multiple objects, so many=True is explicit
        serializer = LenghtSerializer(lengths, data=request.data, partial=True, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)

    #TODO: manage errors, what to do with them?


# The next class is not necesary because we update the complete lenghts
# class LengthAPI(APIView):
#     """
#     Endpoint to manage species lengths individually
#     """
#
#     def delete(self, request, length_id):
#         length = Length.objects.get(pk=length_id)
#         length.delete()
#         return Response(status=HTTP_204_NO_CONTENT)

class SexLengthsAPI(APIView):
    """
    Create a new sex with its lengths.
    """
    def post(self, request):

        serializer=SexCatchSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)