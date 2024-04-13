from django.db import IntegrityError
from rest_framework import serializers
from bears.models import Bear


class BearSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Bear
        fields = ['id', 'created_at', 'owner', 'stock']

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({
                'detail': 'possible duplicate'
            })