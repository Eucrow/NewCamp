from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView

# from catches.views import CatchesImport


# class CatchesImportAPI(APIView, CatchesImport):
#
#     parser_classes = (MultiPartParser,)
#
#     def put(self, request):
#
#         return self.import_catches_csv()
