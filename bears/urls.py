from django.urls import path
from bears import views

urlpatterns = [
    path('bears/', views.BearList.as_view()),
]