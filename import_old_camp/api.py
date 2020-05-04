from rest_framework.parsers import MultiPartParser, FileUploadParser
from rest_framework.views import APIView
from rest_framework.exceptions import ParseError
from import_old_camp.views import OldCampImport, SpeciesImport


class ImportOldCampAPI(APIView, OldCampImport):

    parser_classes = (MultiPartParser,)

    def put(self, request):
        return self.import_complete()


class ImportOldCampAPIHydrography(APIView, OldCampImport):

    parser_classes = (MultiPartParser,)

    def put(self, request):
        return self.importHydrography()


class SpeciesImportAPI(APIView, OldCampImport):
    parser_classes = (MultiPartParser,)

    def put(self, request):

        if 'species' not in request.data:
            raise ParseError("Empty Content")

        return self.import_species()

