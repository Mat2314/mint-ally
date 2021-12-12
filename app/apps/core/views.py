from django.shortcuts import render

# Create your views here.
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import Profile
from .serializers import ProfileSerializer, UserSerializer
from django.core.paginator import Paginator
from django.db.models import Q
from django.db import transaction
from mintally.decorators import handle_exceptions


# Create your views here.
class UserAuthenticationViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    
    @handle_exceptions("Could not retrieve user data")
    def list(self, request):
        """
        Retrieve authorized user data to let the frontend define 
        which type of user is accessing the app.
        """
        serializer = ProfileSerializer(request.user.profile)
        return Response(serializer.data)
    
    @handle_exceptions("Could not update user data")
    def put(self, request):
        """Update user data"""
        profile = request.user.profile
        print(request.data)
        profile.notifications_on = request.data['notifications_on']
        profile.save()
        return Response({"message":"Updated user data"})
