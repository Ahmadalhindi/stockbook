from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Stock
from .serializers import StockSerializer


class StockList(APIView):

    def get(self, request):
        stocks = Stock.objects.all()
        serializer = StockSerializer(
            stocks, many=True, context={'request': request}
        )
        return Response(serializer.data)
