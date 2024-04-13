from django.db import IntegrityError
from rest_framework import serializers
from bulls.models import Bull


class BullSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Bull
        fields = ['id', 'created_at', 'owner', 'stock']

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({
                'detail': 'possible duplicate'
            })