from . import views
from django.urls import path,include

urlpatterns = [
    path('view/', views.View, name='viewData'),
    path('write/', views.Write, name='writeData')
]