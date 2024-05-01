from rest_framework import viewsets
from rest_framework import generics, permissions
from stock_book.permissions import IsOwnerOrReadOnly
from .models import Earning
from .serializers import EarningSerializer

class EarningList(generics.ListCreateAPIView):
    serializer_class = EarningSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Earning.objects.all().order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class EarningDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = EarningSerializer
    queryset = Earning.objects.all().order_by('-created_at')