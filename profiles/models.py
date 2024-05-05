from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User


class Profile(models.Model):
    """
    A model representing a user profile.

    Attributes:
        owner (User): The user who owns the profile.
        created_at (DateTimeField): The date and time
        when the profile was created.
        updated_at (DateTimeField): The date and time
        when the profile was last updated.
        name (CharField): The name of the user.
        bio (TextField): A brief biography of the user.
        image (ImageField): The profile image of the user.
    """
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True)
    image = models.ImageField(
        upload_to='images/', default='../default_profile_wbm7zx'
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        """
        Returns a string representation of the profile.
        """
        return f"{self.owner}'s profile"


def create_profile(sender, instance, created, **kwargs):
    """
    A signal handler function to create a profile when a new user is created.
    """
    if created:
        Profile.objects.create(owner=instance)


post_save.connect(create_profile, sender=User)
