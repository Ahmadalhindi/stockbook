from django.db import models
from django.contrib.auth.models import User
from stocks.models import Stock


class Comment(models.Model):
    """
    Model representing a comment on a stock made by a user.

    Attributes:
        owner (User): The user who made the comment.
        stock (Stock): The stock on which the comment is made.
        created_at (DateTimeField): The datetime when the comment was created.
        updated_at (DateTimeField): The datetime when the comment was last updated.
        content (TextField): The content of the comment.
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    content = models.TextField()

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.content
