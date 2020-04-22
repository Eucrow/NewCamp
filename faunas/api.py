from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView

# from faunas.views import FaunasImport


# class FaunasImportAPI(APIView, FaunasImport):
#
#     parser_classes = (MultiPartParser,)
#
#     def put(self, request):
#
#         return self.import_faunas_csv()
