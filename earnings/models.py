from django.db import models
from django.contrib.auth.models import User


class Earning(models.Model):

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    ticker = models.CharField(max_length=25)
    earning_date = models.DateField()

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.ticker}'
