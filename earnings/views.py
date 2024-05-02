from rest_framework import generics, permissions, filters
from stock_book.permissions import IsOwnerOrReadOnly
from .models import Earning
from .serializers import EarningSerializer

class EarningList(generics.ListCreateAPIView):
    serializer_class = EarningSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Earning.objects.all().order_by('earning_date')
    filter_backends = [
        filters.SearchFilter,
    ]
    search_fields = [
        'owner__username',
        'ticker',
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class EarningDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = EarningSerializer
    queryset = Earning.objects.all().order_by('-created_at')