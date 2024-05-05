from rest_framework import serializers
from stocks.models import Stock
from bulls.models import Bull
from bears.models import Bear


class StockSerializer(serializers.ModelSerializer):
    """
    Serializer for the Stock model.

    This serializer is used to convert Stock model instances
    into JSON data and vice versa.
    """
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    bull_id = serializers.SerializerMethodField()
    bear_id = serializers.SerializerMethodField()
    bulls_count = serializers.ReadOnlyField()
    bears_count = serializers.ReadOnlyField()
    comments_count = serializers.ReadOnlyField()

    def validate_image(self, value):
        """
        Custom validator for validating image size and dimensions.

        Raises:
            serializers.ValidationError: If the image size or dimensions
            exceed the limits.
        """
        if value.size > 2 * 1024 * 1024:
            raise serializers.ValidationError('Image size larger than 2MB!')
        if value.image.height > 4096:
            raise serializers.ValidationError(
                'Image height larger than 4096px!'
            )
        if value.image.width > 4096:
            raise serializers.ValidationError(
                'Image width larger than 4096px!'
            )
        return value

    def get_is_owner(self, obj):
        """
        Method to determine if the current user is the owner of the stock.
        """
        request = self.context['request']
        return request.user == obj.owner

    def get_id_for_model(self, model, obj):
        """
        Method to get the ID of related model instance for the current user.
        """
        user = self.context['request'].user
        if user.is_authenticated:
            instance = model.objects.filter(owner=user, stock=obj).first()
            return instance.id if instance else None
        return None

    def get_bull_id(self, obj):
        """
        Method to get the ID of the Bull instance related to the stock.
        """
        return self.get_id_for_model(Bull, obj)

    def get_bear_id(self, obj):
        """
        Method to get the ID of the Bear instance related to the stock.
        """
        return self.get_id_for_model(Bear, obj)

    class Meta:
        model = Stock
        fields = [
            'id', 'owner', 'is_owner', 'profile_id',
            'profile_image', 'created_at', 'updated_at',
            'title', 'symbol', 'company_name', 'sector',
            'order', 'order_date', 'order_price', 'quantity',
            'content', 'image', 'bull_id', 'bear_id',
            'bulls_count', 'bears_count', 'comments_count',
        ]
