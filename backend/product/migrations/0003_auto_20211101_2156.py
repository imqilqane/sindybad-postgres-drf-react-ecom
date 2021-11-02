# Generated by Django 3.2.8 on 2021-11-01 20:56

from django.db import migrations, models
import product.models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_auto_20211031_1857'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='payment',
            name='order',
        ),
        migrations.RemoveField(
            model_name='payment',
            name='user',
        ),
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name_plural': 'categories'},
        ),
        migrations.RemoveField(
            model_name='order',
            name='adress',
        ),
        migrations.RemoveField(
            model_name='order',
            name='payment',
        ),
        migrations.AlterField(
            model_name='product',
            name='main_image',
            field=models.ImageField(default='image.png', max_length=225, upload_to=product.models.Product.get_image_path),
        ),
        migrations.AlterField(
            model_name='product',
            name='second_image',
            field=models.ImageField(blank=True, max_length=225, null=True, upload_to=product.models.Product.get_image_path),
        ),
        migrations.AlterField(
            model_name='product',
            name='third_image',
            field=models.ImageField(blank=True, max_length=225, null=True, upload_to=product.models.Product.get_image_path),
        ),
        migrations.DeleteModel(
            name='Address',
        ),
        migrations.DeleteModel(
            name='Payment',
        ),
    ]
