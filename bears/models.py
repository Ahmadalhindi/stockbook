from django.db import models
from django.contrib.auth.models import User
from stocks.models import Stock


class Bear(models.Model):
    """
    Represents a 'bear' entity, which is associated with a user and a stock.
    Bears typically indicate a pessimistic sentiment towards the stock market.
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    stock = models.ForeignKey(
        Stock, related_name='bears', on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['owner', 'stock']

    def __str__(self):
        return f'{self.owner} {self.stock}'
