# Generated by Django 3.2.10 on 2021-12-11 18:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('health', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='healthstatus',
            name='date',
            field=models.DateTimeField(),
        ),
    ]
