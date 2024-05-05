from django.db import models
from django.contrib.auth.models import User


class Follower(models.Model):
    """
    Model representing the relationship between users
    where one user follows another.
    """
    owner = models.ForeignKey(
        User, related_name='following', on_delete=models.CASCADE
    )
    followed = models.ForeignKey(
        User, related_name='followed', on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['owner', 'followed']

    def __str__(self):
        """
        String representation of the follower relationship.
        """
        return f'{self.owner} {self.followed}'
