from django.db.models import Count
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from stock_book.permissions import IsOwnerOrReadOnly
from .models import Profile
from .serializers import ProfileSerializer


class ProfileList(generics.ListAPIView):
    """
    API view to list profiles with counts of associated objects.

    This view lists profiles along with counts of stocks, followers,
    and following relationships associated with each profile.

    Attributes:
        queryset (QuerySet): A queryset of profiles annotated with counts.
        serializer_class (Serializer): Serializer class for profile data.
        filter_backends (list): List of filter backend classes.
        ordering_fields (list): List of fields available for ordering.
        filterset_fields (list): List of fields available for filtering.
    """
    queryset = Profile.objects.annotate(
        stocks_count=Count('owner__stock', distinct=True),
        followers_count=Count('owner__followed', distinct=True),
        following_count=Count('owner__following', distinct=True)
    ).order_by('-created_at')
    serializer_class = ProfileSerializer
    filter_backends = [
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]
    ordering_fields = [
        'stocks_count',
        'followers_count',
        'following_count',
        'owner__following__created_at',
        'owner__followed__created_at',
    ]
    filterset_fields = [
        'owner__following__followed__profile',
        'owner__followed__owner__profile',
    ]


class ProfileDetail(generics.RetrieveUpdateAPIView):
    """
    API view to retrieve and update a profile.

    This view allows retrieval and update of a profile along with
    counts of associated stocks, followers, and following relationships.

    Attributes:
        permission_classes (list): List of permission classes.
        queryset (QuerySet): A queryset of profiles annotated with counts.
        serializer_class (Serializer): Serializer class for profile data.
    """
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Profile.objects.annotate(
        stocks_count=Count('owner__stock', distinct=True),
        followers_count=Count('owner__followed', distinct=True),
        following_count=Count('owner__following', distinct=True)
    ).order_by('-created_at')
    serializer_class = ProfileSerializer
