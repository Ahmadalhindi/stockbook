# Generated by Django 3.2.25 on 2024-04-12 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stocks', '0003_alter_stock_order_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stock',
            name='quantity',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
