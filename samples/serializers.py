from rest_framework import serializers

from samples.models import Length, SampledWeight, Sex


class SampleWeightSerializer(serializers.ModelSerializer):
    """
    Sample Weights serializer
    """

    class Meta:
        model = SampledWeight
        fields = ['id', 'sampled_weight', 'catch_id', ]


class SexSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sex
        fields = ['id', 'sex', 'catch_id', ]


class LengthListSerializer(serializers.ListSerializer):
    """
    List serializer customized to upload multiple objects in the same request.
    (https://www.django-rest-framework.org/api-guide/serializers/#listserializer)
    """

    def update(self, instance, validated_data):
        # Maps for id->instance and id->data item.
        # Map of the instance (data stored in database):
        lengths_mapping = {length.id: length for length in instance}
        # Map of the data of the request, validated:
        data_mapping = {item['id']: item for item in validated_data}

        # Perform creations and updates.
        ret = []
        for length_id, data in data_mapping.items():
            # Get the instance length we want to update
            length = lengths_mapping.get(length_id, None)
            # If the previous code return None, is becasue doesn't exists in
            # databse, so we create it:
            if length is None:
                ret.append(self.child.create(data))
            # If is different of None, the length exists, so we update it:
            else:
                ret.append(self.child.update(length, data))

        # Perform deletions.
        for length_id, length in lengths_mapping.items():
            if length_id not in data_mapping:
                length.delete()

        return ret


class LenghtSerializer(serializers.ModelSerializer):
    """
    Lengths serializer.
    This serializer needs to support multiple objects at one
    (https://www.django-rest-framework.org/api-guide/serializers/#listserializer)
    To accomplish this, in the instantiation of the serializer, the argument many=True has been passed,
    and in order to accomplish the customization of the ListSerializer, the option list_serializer_class
    must be used.
    """

    # We need to add an explicit id field to the instance serializer. The default implicitly-generated id field
    # is marked as read_only. This causes it to be removed on updates. Once declared it explicitly, it will be
    # available in the list serializer's update method.
    id = serializers.IntegerField()

    class Meta:
        model = Length
        fields = ['id', 'length', 'number_individuals', ]
        list_serializer_class = LengthListSerializer


# TODO: The next serializer should be included in LengthSerializer, but I can't make it works.
class LengthSerializer2(serializers.ModelSerializer):
    class Meta:
        model = Length
        fields = ['sex_id', 'length', 'number_individuals', ]
