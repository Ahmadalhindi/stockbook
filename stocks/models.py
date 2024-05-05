from django.db import models
from django.contrib.auth.models import User


class Stock(models.Model):
    """
    A model representing a stock owned by a user.

    Attributes:
        owner (ForeignKey): The user who owns the stock.
        created_at (DateTimeField): The date and time
        when the stock was created.
        updated_at (DateTimeField): The date and time
        when the stock was last updated.
        title (CharField): The title of the stock.
        symbol (CharField): The symbol of the stock.
        company_name (CharField): The name of the company
        associated with the stock.
        sector (CharField): The sector of the stock.
        order (CharField): The type of order placed for
        the stock (buy, sell, or hold).
        order_date (DateField): The date of the order.
        order_price (DecimalField): The price at which the order was placed.
        quantity (PositiveIntegerField): The quantity of stocks.
        content (TextField): Additional content related to the stock.
        image (ImageField): Image representing the stock.
    """
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
    order_price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    quantity = models.PositiveIntegerField(null=True, blank=True)
    content = models.TextField()
    image = models.ImageField(
        upload_to='images/', blank=True
    )

    def save(self, *args, **kwargs):
        """
        Overrides the save method to set a default image
        based on the order type.

        If no image is provided, it sets a default image
        based on the order type:
        - For 'buy' orders, a bull image is set.
        - For 'sell' orders, a bear image is set.
        - For 'hold' orders, a neutral image is set.
        """
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
        """
        Returns a string representation of the stock.
        """
        return f'{self.id} {self.title}'
