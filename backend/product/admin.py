from django.contrib import admin
from .models import (
    Category,

    Product,
    OrderedItem,
    Order
)


class CategoryAdminManager(admin.ModelAdmin):
    list_display = ["name", "slug"]


admin.site.register(Category, CategoryAdminManager)
admin.site.register(Product)
admin.site.register(OrderedItem)
admin.site.register(Order)
