# Generated by Django 3.2.25 on 2024-04-12 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stocks', '0002_alter_stock_order_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stock',
            name='order_price',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
    ]
