from django.urls import path
from earnings import views

urlpatterns = [
    path('earnings/', views.EarningList.as_view()),
    path('earnings/<int:pk>/', views.EarningDetail.as_view())
]