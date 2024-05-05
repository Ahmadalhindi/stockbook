from django.db.models import Count
from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from stock_book.permissions import IsOwnerOrReadOnly
from .models import Stock
from .serializers import StockSerializer


class StockList(generics.ListCreateAPIView):
    """
    API endpoint that allows viewing and creating stock instances.

    Attributes:
        serializer_class (StockSerializer): Serializer class
        for the Stock model.
        permission_classes (list): List of permission classes.
        queryset (QuerySet): Queryset of Stock objects annotated
        with counts of related objects.
        filter_backends (list): List of filter backends.
        search_fields (list): List of fields to search against.
        filterset_fields (list): List of fields to filter against.
        ordering_fields (list): List of fields to order against.
    """
    serializer_class = StockSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Stock.objects.annotate(
        bulls_count=Count('bulls', distinct=True),
        bears_count=Count('bears', distinct=True),
        comments_count=Count('comment', distinct=True)
    ).order_by('-created_at')
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend,
    ]
    search_fields = [
        'owner__username',
        'title',
        'symbol',
        'company_name',
        'sector',
        'order',
    ]
    filterset_fields = [
        'sector',
        'owner__followed__owner__profile',
        'bulls__owner__profile',
        'bears__owner__profile',
        'owner__profile',
    ]
    ordering_fields = [
        'comments_count',
        'bulls_count',
        'bears_count',
        'bulls__created_at',
        'bears__created_at',
    ]

    def perform_create(self, serializer):
        """
        Perform creation of a new stock instance.
        """
        serializer.save(owner=self.request.user)


class StockDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that allows viewing, updating and deleting
    a single stock instance.
    """
    serializer_class = StockSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Stock.objects.annotate(
        bulls_count=Count('bulls', distinct=True),
        bears_count=Count('bears', distinct=True),
        comments_count=Count('comment', distinct=True)
    ).order_by('-created_at')
