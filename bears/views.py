from rest_framework import generics, permissions
from stock_book.permissions import IsOwnerOrReadOnly
from bears.models import Bear
from bears.serializers import BearSerializer


class BearList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = BearSerializer
    queryset = Bear.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)