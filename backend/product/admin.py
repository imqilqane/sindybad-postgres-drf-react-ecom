from django.contrib import admin
from .models import (
    Category,

    Product,
    OrderedItem,
    Order
)


class CategoryAdminManager(admin.ModelAdmin):
    list_display = ["name", "slug"]


class ProductsAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "category",
        "in_stock",
        "quanntity",
        "price"
    ]

class OrderedItemAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "item",
        "quantity",
        "ordered",
        "date"
    ]

class OrderAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "ordered",
        "order_number"
    ]


admin.site.register(Category, CategoryAdminManager)
admin.site.register(Product, ProductsAdmin)
admin.site.register(OrderedItem, OrderedItemAdmin)
admin.site.register(Order, OrderAdmin)
