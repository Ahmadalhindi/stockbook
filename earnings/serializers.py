from rest_framework import serializers
from .models import Earning


class EarningSerializer(serializers.ModelSerializer):
    """
    Serializer for the Earning model.
    """
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')

    def get_is_owner(self, obj):
        """
        Method to determine if the current user is the owner of the earning.
        """
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Earning
        fields = [
            'id', 'owner', 'is_owner', 'profile_id', 'profile_image',
            'created_at', 'earning_date', 'ticker',
        ]
