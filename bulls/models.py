from django.db import models
from django.contrib.auth.models import User
from stocks.models import Stock


class Bull(models.Model):
    """
    Represents a 'bull' entity, which is associated with a user and a stock.
    Model indicate a user's bullish sentiment towards a particular stock.
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    stock = models.ForeignKey(
        Stock, related_name='bulls', on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['owner', 'stock']

    def __str__(self):
        return f'{self.owner} {self.stock}'
