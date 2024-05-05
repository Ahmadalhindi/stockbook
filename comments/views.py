from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from stock_book.permissions import IsOwnerOrReadOnly
from .models import Comment
from .serializers import CommentSerializer, CommentDetailSerializer


class CommentList(generics.ListCreateAPIView):
    """
    A view to list and create comments.

    Only authenticated users can create comments.
    """
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Comment.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['stock']

    def perform_create(self, serializer):
        """
        Saves the owner of the comment as the current user.
        """
        serializer.save(owner=self.request.user)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    A view to retrieve, update, or delete a single comment.

    Only the owner of the comment can update or delete it.
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = CommentDetailSerializer
    queryset = Comment.objects.all()
