from django.db.models import Count
from rest_framework import generics, permissions, filters
from stock_book.permissions import IsOwnerOrReadOnly
from .models import Stock
from .serializers import StockSerializer


class StockList(generics.ListCreateAPIView):
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
    ]
    search_fields = [
        'owner__username',
        'title',
        'symbol',
        'company_name',
        'sector',
        'order',
    ]
    ordering_fields = [
        'bulls_count',
        'bears_count',
        'comments_count',
        'bulls__created_at',
        'bears__created_at',
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class StockDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StockSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Stock.objects.annotate(
        bulls_count=Count('bulls', distinct=True),
        bears_count=Count('bears', distinct=True),
        comments_count=Count('comment', distinct=True)
    ).order_by('-created_at')