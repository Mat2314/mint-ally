from django.shortcuts import render
# Create your views here.
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import Article
from .serializers import ArticleSerializer
from django.core.paginator import Paginator
from django.db.models import Q
from django.db import transaction
from rest_framework import status

from mintally.decorators import handle_exceptions
import datetime

# Create your views here.


class ArticlesViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]

    @handle_exceptions("Could not get articles")
    def list(self, request):
        """
        Get articles present in the application
        """
        page_size = int(self.request.query_params.get('page_size'))
        page = int(self.request.query_params.get('page'))

        articles = Article.objects.all().order_by('-published_date')
        serializer = ArticleSerializer(articles, many=True)

        paginator = Paginator(serializer.data, page_size)
        return Response({"data": paginator.page(page).object_list,
                        "last_page": paginator.num_pages})



class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]

    @handle_exceptions("Could not get article")
    def list(self, request):
        """Get single article with given id"""
        id = self.request.query_params.get('id')
        article = Article.objects.filter(id=id).first()
        if not article:
            return Response({"message":"Could not find article with given id"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = ArticleSerializer(article)
        return Response(serializer.data)