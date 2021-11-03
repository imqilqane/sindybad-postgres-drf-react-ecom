# Generated by Django 3.2.8 on 2021-11-01 21:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('checkout', '0002_remove_payment_order'),
        ('product', '0003_auto_20211101_2156'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='adress',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='checkout.address'),
        ),
        migrations.AddField(
            model_name='order',
            name='payment',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='get_payment', to='checkout.payment'),
            preserve_default=False,
        ),
    ]