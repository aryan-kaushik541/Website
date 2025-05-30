# Generated by Django 5.0.1 on 2025-04-22 16:24

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0010_user_address_country'),
        ('orders', '0006_cartitem_address'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cartitem',
            name='address',
        ),
        migrations.AddField(
            model_name='order',
            name='address',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='address', to='accounts.user_address'),
        ),
    ]
