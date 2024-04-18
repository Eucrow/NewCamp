from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT
from rest_framework.views import APIView
from rest_framework.response import Response

from catches.models import Catch

from catches.serializers import CatchSerializer, CatchesVerboseSerializer
from samples.models import SampledWeight
from samples.serializers import SampleWeightSerializer
from species.models import Sp


class CatchHaulListAPI(APIView):
    """
    Endpoint to retrieve all the catches of a trawl haul.
    """

    def get(self, request, haul_id):
        # catches = get_list_or_404(Catch, haul_id=haul_id)
        catches = Catch.objects.filter(haul_id=haul_id)
        serializer = CatchesVerboseSerializer(catches, many=True)

        return Response(serializer.data)


class CatchVerboseAPI(APIView):
    """
    Endpoint to retrieve verbose catch.
    """

    def get(self, request, catch_id):
        catch = get_object_or_404(Catch, id=catch_id)
        serializer = CatchesVerboseSerializer(catch)
        return Response(serializer.data)

    # def post(self, request):
    #     serializer = CatchesVerboseSerializer(data=request.data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save(haul_id=request.data["haul_id"],
    #                         sp_id=request.data["sp_id"],
    #                         category=request.data['category'])
    #         return Response(serializer.data, status=HTTP_201_CREATED)
    #     else:
    #         return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    # def put(self, request):
    #     catch = Catch.objects.get(id=request.data["id"])
    #     serializer = CatchesVerboseSerializer(catch, data=request.data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save(haul_id=request.data["haul_id"],
    #                         sp_id=request.data["sp_id"],
    #                         category=request.data['category'])
    #         return Response(serializer.data, status=HTTP_201_CREATED)
    #     else:
    #         return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class CatchHaulAPI(APIView):
    """
    Endpoint to retrieve, update and create catch.
    """

    def get(self, request, haul_id, sp_id, category):
        catch = get_object_or_404(
            Catch, haul_id=haul_id, sp_id=sp_id, category=category)
        serializer = CatchSerializer(catch)
        return Response(serializer.data)

    def post(self, request):
        response_data = {}
        # catch_serializer = CatchSerializer(data=request.data, partial=True)
        catch_serializer = CatchesVerboseSerializer(data=request.data, partial=True)
        sample_weight_serializer = SampleWeightSerializer(
            data=request.data, partial=True)

        if catch_serializer.is_valid():
            catch_serializer.save(haul_id=request.data["haul_id"],
                                  sp_id=request.data["sp_id"],
                                  category=request.data["category"])
            response_data.update(catch_serializer.data)
        else:
            return Response(catch_serializer.errors, status=HTTP_400_BAD_REQUEST)

        if "sampled_weight" in request.data:
            if sample_weight_serializer.is_valid() & (request.data["sampled_weight"] != "") & (
                    request.data["sampled_weight"] is not None):
                sample_weight_serializer.save(catch_id=catch_serializer.data["catch_id"],
                                              sampled_weight=request.data["sampled_weight"])
                response_data.update(sample_weight_serializer.data)

        return Response(response_data, status=HTTP_201_CREATED)

    def put(self, request):
        catch = Catch.objects.get(id=request.data["catch_id"])

        catch_serializer = CatchSerializer(catch, data=request.data)

        # Update the sp_id if the sp_code or group has been changed.
        sp_id = Sp.objects.get(sp_code=request.data["sp_code"], group=request.data["group"]).id
        catch.sp_id = sp_id

        # If the sampled weight has been changed to empty, delete the sampled weight object.
        if request.data["sampled_weight"] == "" or request.data["sampled_weight"] is None:
            SampledWeight.objects.filter(catch_id=request.data["catch_id"]).delete()
            if catch_serializer.is_valid():
                catch_serializer.save()
                return Response(catch_serializer.data, status=HTTP_201_CREATED)
            else:
                errors = {}
                errors.update(catch_serializer.errors)
                return Response(errors, status=HTTP_400_BAD_REQUEST)
        else:
            sampled_weight, created = SampledWeight.objects.update_or_create(
                catch_id=request.data["catch_id"],
                defaults={'sampled_weight': request.data["sampled_weight"]})
            # sampled_weight = SampledWeight.objects.get_or_create(
            #     catch_id=request.data["catch_id"], sampled_weight=request.data["sampled_weight"])[0]
            sample_weight_serializer = SampleWeightSerializer(
                sampled_weight, data=request.data)

            if catch_serializer.is_valid() & sample_weight_serializer.is_valid():
                catch_serializer.save()
                sample_weight_serializer.save()

                response_data = {}
                response_data.update(catch_serializer.data)
                response_data.update(sample_weight_serializer.data)

                return Response(response_data, status=HTTP_201_CREATED)
            else:
                errors = {}
                errors.update(catch_serializer.errors)
                errors.update(sample_weight_serializer.errors)

                return Response(errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request):
        catch = Catch.objects.get(id=request.data["id"])
        catch.delete()
        return Response(status=HTTP_204_NO_CONTENT)
