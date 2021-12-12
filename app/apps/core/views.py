from django.shortcuts import render

# Create your views here.
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status
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
        return Response({"message": "Updated user data"})


class UserRegistrationViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]

    @handle_exceptions("Could not create an account")
    @transaction.atomic
    def create(self, request):
        """Register a brand new account"""
        # Validate passwords
        password = request.data['password']
        repeat_password = request.data['repeat_password']
        
        if not password == repeat_password:
            return Response({"message":"Passwords differ from each other!"}, status=status.HTTP_400_BAD_REQUEST)
        
        if len(password) < 6:
            return Response({"message":"Password should contain more than 6 characters"}, status=status.HTTP_400_BAD_REQUEST)
        
        new_user = User.objects.create(
            first_name=request.data['first_name'],
            last_name=request.data['last_name'],
            email=request.data['email'],
            username=request.data['email'],
        )

        new_profile = Profile.objects.create(
            user=new_user,
            phone_number=request.data['phone_number']
        )
        
        new_user.set_password(request.data['password'])
        new_user.save()
        
        return Response({"message":"Account successfully created!"})
