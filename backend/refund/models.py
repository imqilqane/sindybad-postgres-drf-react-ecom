from django.db import models
from user.models import User
from product.models import Order
# Create your models here.


class Refund(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    reason = models.TextField()
    accepted = models.BooleanField(default=False)
    in_review = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username
