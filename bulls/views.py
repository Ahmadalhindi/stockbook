from rest_framework import generics, permissions
from stock_book.permissions import IsOwnerOrReadOnly
from bulls.models import Bull
from bulls.serializers import BullSerializer


class BullList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = BullSerializer
    queryset = Bull.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class BullDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = BullSerializer
    queryset = Bull.objects.all()