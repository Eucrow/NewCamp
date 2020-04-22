from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView

from import_old_camp.views import OldCampImport


class ImportOldCampAPI(APIView, OldCampImport):

    parser_classes = (MultiPartParser,)

    def put(self, request):
        return self.importComplete()


class ImportOldCampAPIHydrography(APIView, OldCampImport):

    parser_classes = (MultiPartParser,)

    def put(self, request):
        return self.importHydrography()

