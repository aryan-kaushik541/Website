# Generated by Django 5.0.1 on 2025-04-01 19:48

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_user_address_email'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user_address',
            name='email',
        ),
        migrations.AddField(
            model_name='user_address',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='addresses', to=settings.AUTH_USER_MODEL),
        ),
    ]
