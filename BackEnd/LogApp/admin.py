from django.contrib import admin
from .models import User
# Register your models here.

admin.site.site_title = 'log admin'
admin.site.site_header = 'LOG-IN'

class UserAdmin(admin.ModelAdmin):
    list_display = ("name","email")

admin.site.register(User,UserAdmin)