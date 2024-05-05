from rest_framework import generics, permissions, filters
from stock_book.permissions import IsOwnerOrReadOnly
from .models import Earning
from .serializers import EarningSerializer


class EarningList(generics.ListCreateAPIView):
    """
    API endpoint for listing and creating earnings.

    Attributes:
        serializer_class (EarningSerializer): Serializer class for earnings.
        permission_classes (list): List of permission classes.
        queryset (QuerySet): Queryset of all earnings ordered by earning date.
        filter_backends (list): List of filter backends for filtering results.
        search_fields (list): List of fields to search against.

    Methods:
        perform_create: Overrides creation behavior to set
        the owner of the earning.
    """
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
        """
        Sets the owner of the earning to the current authenticated user.
        """
        serializer.save(owner=self.request.user)


class EarningDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint for retrieving, updating, and deleting an earning.
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = EarningSerializer
    queryset = Earning.objects.all().order_by('-created_at')
