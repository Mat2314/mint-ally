from django.shortcuts import render

# Create your views here.
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import HealthStatus
from .serializers import HealthStatusSerializer
from django.core.paginator import Paginator
from django.db.models import Q
from django.db import transaction
from rest_framework import status

from mintally.decorators import handle_exceptions
import datetime

# Create your views here.


class HealthStatusViewSet(viewsets.ModelViewSet):
    queryset = HealthStatus.objects.all()
    serializer_class = HealthStatusSerializer
    permission_classes = [IsAuthenticated]

    @handle_exceptions("Could not submit status")
    def create(self, request):
        """
        User sends his/her status with mood description.
        """
        HealthStatus.objects.create(
            profile=request.user.profile,
            date=datetime.datetime.now(),
            mood=request.data['mood'],
            note=request.data['note'],
            )
        return Response({"message":"Saved! Thank you so much :)"})
        