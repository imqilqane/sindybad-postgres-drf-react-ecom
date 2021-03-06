# Generated by Django 3.2.8 on 2021-11-02 17:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('checkout', '0002_remove_payment_order'),
        ('product', '0004_auto_20211101_2200'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='payment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='get_payment', to='checkout.payment'),
        ),
    ]
