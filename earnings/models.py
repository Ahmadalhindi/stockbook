from django.db import models
from django.contrib.auth.models import User


class Earning(models.Model):
    """
    Model representing earnings data.

    Attributes:
        owner (User): The user who owns the earnings data.
        created_at (DateTime): The date and time when
        the earnings data was created.
        updated_at (DateTime): The date and time when
        the earnings data was last updated.
        ticker (str): The ticker symbol of the company
        associated with the earnings data.
        earning_date (Date): The date when the earnings were reported.
    """

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    ticker = models.CharField(max_length=25)
    earning_date = models.DateField()

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        """
        Return a string representation of the Earning object.

        Returns:
            str: A string representation containing the
            Earning object's ID and ticker symbol.
        """
        return f'{self.id} {self.ticker}'
