from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser

from django.shortcuts import get_object_or_404

from species.models import Sp
from species.serializers import SpeciesSerializer
from species.views import SpeciesImport


class SpeciesListAPI(APIView):
    def get(self, request):
        all_species = Sp.objects.all()
        serializer = SpeciesSerializer(all_species, many=True)
        return Response(serializer.data)


# working with class-based views
class SpAPI(APIView):
    def get(self, request, pk):
        sp = Sp.objects.filter(pk=pk)
        serializer = SpeciesSerializer(sp, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SpeciesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        sp = get_object_or_404(Sp, pk=pk)
        serializer = SpeciesSerializer(sp, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class SpeciesImportAPI(APIView, SpeciesImport):
    parser_classes = (MultiPartParser,)

    def put(self, request):
        return self.import_species_csv()
