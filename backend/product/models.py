from django.db import models
from django.db.models.fields import BooleanField
from user.models import User
from checkout.models import Address, Payment
from django.utils.text import slugify


class Category(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(null=True, blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Category, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "categories"


class Product(models.Model):
    def get_image_path(self, file_name):
        return f"products/{self.name}/{file_name}"

    name = models.CharField(max_length=225)
    slug = models.SlugField(null=True, blank=True)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="category")
    descrition = models.TextField()
    main_image = models.ImageField(
        upload_to=get_image_path, default="image.png", max_length=225)
    second_image = models.ImageField(
        upload_to=get_image_path, null=True, blank=True, max_length=225)
    third_image = models.ImageField(
        upload_to=get_image_path, null=True, blank=True, max_length=225)
    in_stock = models.BooleanField(default=True)
    quanntity = models.IntegerField(default=1)
    price = models.FloatField(default=0.99)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name[:70]} ..."

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Product, self).save(*args, **kwargs)


class OrderedItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    item = models.ForeignKey(
        Product, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.IntegerField(default=1)
    ordered = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    def get_price(self):
        return self.quantity * self.item.price

    def __str__(self):
        return self.user


class Order(models.Model):
    user = models.ForeignKey(User, models.SET_NULL,
                             null=True, blank=True, default=1)
    items = models.ManyToManyField(OrderedItem)
    ordered = models.BooleanField(default=False)
    order_number = models.CharField(max_length=35)
    payment = models.ForeignKey(
        Payment, on_delete=models.CASCADE, related_name="get_payment", null=True, blank=True)
    adress = models.ForeignKey(Address, models.SET_NULL, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def get_total(self):
        total = 0
        for item in self.items.all():
            total += item.get_price()
        return total

    def __str__(self):
        return self.user
