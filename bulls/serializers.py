from django.db import IntegrityError
from rest_framework import serializers
from bulls.models import Bull


class BullSerializer(serializers.ModelSerializer):
    """
    Serializer for the Bull model.
    """
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Bull
        fields = ['id', 'created_at', 'owner', 'stock']

    def create(self, validated_data):
        """
        Method to create a new Bull instance.
        """
        try:
            return super().create(validated_data)
        except IntegrityError:
            # If IntegrityError occurs (possible duplicate), raise ValidationError
            raise serializers.ValidationError({
                'detail': 'possible duplicate'
            })
