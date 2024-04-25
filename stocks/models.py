from django.db import models
from django.contrib.auth.models import User

class Stock(models.Model):
    order_choices = [
        ('buy', 'Buy'),
        ('sell', 'Sell'),
        ('hold', 'Hold')
    ]
    sector_choices = [
        ('', '---------'),
        ('information technology', 'Information Technology'),
        ('health', 'Health Care'),
        ('financials', 'Financials'),
        ('consumer discretionary', 'Consumer Discretionary'),
        ('communication services', 'Communication Services'),
        ('industrials', 'Industrials'),
        ('consumer staples', 'Consumer Staples'),
        ('energy', 'Energy'),
        ('utilities', 'Utilities'),
        ('real estate', 'Real Estate'),
        ('materials', 'Materials')
    ]
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=120)
    symbol = models.CharField(max_length=10)
    company_name = models.CharField(max_length=100)
    sector = models.CharField(
        max_length=30, choices=sector_choices, default='', blank=True
    )
    order = models.CharField(
        max_length=10, choices=order_choices, default='hold', blank=True
    )
    order_date = models.DateField(null=True, blank=True)
    order_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    quantity = models.PositiveIntegerField(null=True, blank=True)
    content = models.TextField()
    image = models.ImageField(
        upload_to='images/', blank=True
    )

    def save(self, *args, **kwargs):
        if not self.image:
            if self.order == 'buy':
                self.image = '../bull_mkjux3'
            elif self.order == 'sell':
                self.image = '../bear_apzdgz'
            else:
                self.image = '../hold_fx1ysi'

        super().save(*args, **kwargs)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'