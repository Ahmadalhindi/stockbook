from django.db import models
from django.contrib.auth.models import User
from stocks.models import Stock


class Bull(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    stock = models.ForeignKey(
        Stock, related_name='pulls', on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['owner', 'stock']

    def __str__(self):
        return f'{self.owner} {self.stock}'
