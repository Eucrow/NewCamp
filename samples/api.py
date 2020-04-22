from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView

# from samples.views import LengthsImport


# class LengthsImportAPI(APIView, LengthsImport):
#
#     parser_classes = (MultiPartParser,)
#
#     def put(self, request):
#
#         return self.import_lengths_csv()
#
#
# class SampledWeightsImportAPI(APIView, LengthsImport):
#
#     parser_classes = (MultiPartParser,)
#
#     def put(self, request):
#
#         return self.import_sampled_weight_csv()