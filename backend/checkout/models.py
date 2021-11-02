from django.db import models
from user.models import User
# Create your models here.


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    country = models.CharField(max_length=35)
    city = models.CharField(max_length=35)
    zip = models.CharField(max_length=35)
    street = models.CharField(max_length=55)
    is_default = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user

    class Meta:
        verbose_name_plural = "addresses"


class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    stripe_id = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user

    class Meta:
        verbose_name_plural = "payments"
