# Generated by Django 4.2.4 on 2023-08-30 07:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_alter_bookappointment_payment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookappointment',
            name='payment',
            field=models.CharField(max_length=20),
        ),
    ]
