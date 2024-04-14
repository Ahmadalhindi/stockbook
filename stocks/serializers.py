from rest_framework import serializers
from stocks.models import Stock
from bulls.models import Bull
from bears.models import Bear


class StockSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    bull_id = serializers.SerializerMethodField()
    bear_id = serializers.SerializerMethodField()

    def validate_file(self, value, field_name):
        if value.size > 2 * 1024 * 1024:
            raise serializers.ValidationError(
                f'{field_name} size is larger than 2MB!'
            )
        if value.height > 4096:
            raise serializers.ValidationError(
                f'{field_name} height is larger than 4096px!'
            )
        if value.width > 4096:
            raise serializers.ValidationError(
                f'{field_name} width is larger than 4096px!'
            )
        return value

    def validate(self, data):
        data = super().validate(data)
        image = data.get('image')
        if image:
            self.validate_file(image, 'Image')
        chart = data.get('chart')
        if chart:
            self.validate_file(chart, 'Chart')
        return data

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_id_for_model(self, model, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            instance = model.objects.filter(owner=user, stock=obj).first()
            return instance.id if instance else None
        return None

    def get_bull_id(self, obj):
        return self.get_id_for_model(Bull, obj)

    def get_bear_id(self, obj):
        return self.get_id_for_model(Bear, obj)

    class Meta:
        model = Stock
        fields = [
            'id', 'owner', 'is_owner', 'profile_id',
            'profile_image', 'created_at', 'updated_at',
            'title', 'symbol', 'company_name', 'sector',
            'order', 'order_date', 'order_price', 'quantity',
            'content', 'chart', 'image', 'bull_id', 'bear_id',
        ]