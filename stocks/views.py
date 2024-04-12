from django.http import Http404
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Stock
from .serializers import StockSerializer
from stock_book.permissions import IsOwnerOrReadOnly


class StockList(APIView):
    serializer_class = StockSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    
    def get(self, request):
        stocks = Stock.objects.all()
        serializer = StockSerializer(
            stocks, many=True, context={'request': request}
        )
        return Response(serializer.data)
    
    def post(self, request):
        serializer = StockSerializer(
            data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(
                serializer.data, status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )

class StockDetail(APIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = StockSerializer

    def get_object(self, pk):
        try:
            stock = Stock.objects.get(pk=pk)
            self.check_object_permissions(self.request, stock)
            return stock
        except Stock.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        stock = self.get_object(pk)
        serializer = StockSerializer(
            stock, context={'request': request}
        )
        return Response(serializer.data)

    def put(self, request, pk):
        stock = self.get_object(pk)
        serializer = StockSerializer(
            stock, data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )
