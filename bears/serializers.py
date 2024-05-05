from django.db import IntegrityError
from rest_framework import serializers
from bears.models import Bear


class BearSerializer(serializers.ModelSerializer):
    """
    Serializer for Bear objects.

    This serializer is responsible for converting Bear objects to and from JSON.
    """
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Bear
        fields = ['id', 'created_at', 'owner', 'stock']

    def create(self, validated_data):
        """
        Method to create a new Bear instance.
        """
        try:
            return super().create(validated_data)
        except IntegrityError:
            # If IntegrityError occurs (possible duplicate), raise ValidationError
            raise serializers.ValidationError({
                'detail': 'possible duplicate'
            })
