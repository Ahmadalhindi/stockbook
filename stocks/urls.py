from django.urls import path
from stocks import views

urlpatterns = [
    path('stocks/', views.StockList.as_view()),
]
