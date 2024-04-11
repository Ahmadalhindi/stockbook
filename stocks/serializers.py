from rest_framework import serializers
from stocks.models import Stock


class StockSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')

    def validate_image(self, value):
        if value.size > 2 * 1024 * 1024:
            raise serializers.ValidationError(
                'Image size is larger than 2MB!'
            )
        if value.image.height > 4096:
            raise serializers.ValidationError(
                'Image height is larger than 4096px!'
            )
        if value.image.width > 4096:
            raise serializers.ValidationError(
                'Image width is larger than 4096px!'
            )
        return value

    def validate_chart(self, value):
        if value.size > 2 * 1024 * 1024:
            raise serializers.ValidationError(
                'Chart size is larger than 2MB!'
            )
        if value.chart.height > 4096:
            raise serializers.ValidationError(
                'Chart height is larger than 4096px!'
            )
        if value.chart.width > 4096:
            raise serializers.ValidationError(
                'Chart width is larger than 4096px!'
            )
        return value

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Stock
        fields = [
            'id', 'owner', 'is_owner', 'profile_id',
            'profile_image', 'created_at', 'updated_at',
            'title', 'symbol', 'company_name', 'sector',
            'order', 'order_date', 'order_price', 'quantity',
            'content', 'chart', 'image'
        ]