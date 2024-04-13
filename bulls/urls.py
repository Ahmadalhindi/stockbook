from django.urls import path
from bulls import views

urlpatterns = [
    path('bulls/', views.BullList.as_view()),
]