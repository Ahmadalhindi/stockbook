from rest_framework import generics, permissions
from stock_book.permissions import IsOwnerOrReadOnly
from .models import Stock
from .serializers import StockSerializer


class StockList(generics.ListCreateAPIView):
    serializer_class = StockSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Stock.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class StockDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StockSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Stock.objects.all()