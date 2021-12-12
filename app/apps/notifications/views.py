from django.shortcuts import render

# Create your views here.
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import DailyNotification
from .serializers import DailyNotificationSerializer
from django.core.paginator import Paginator
from django.db.models import Q
from django.db import transaction
from rest_framework import status
from django.utils import timezone

from mintally.decorators import handle_exceptions
import datetime
from datetime import timedelta

from mintally.tasks import send_sos_messages

class DailyMessageViewSet(viewsets.ModelViewSet):
    queryset = DailyNotification.objects.all()
    serializer_class = DailyNotificationSerializer
    permission_classes = [IsAuthenticated]

    @handle_exceptions("Could not get daily message")
    def list(self, request):
        """Return daily positive message for the user"""
        # See if there's a message from today
        today = datetime.date.today()
        message_of_today = DailyNotification.objects.filter(last_sent_date=today).first()
        
        # Return message
        if message_of_today:
            serializer = DailyNotificationSerializer(message_of_today)
            return Response({"positive_message":serializer.data})
        
        # Pick a message for today
        message_not_published_yet = DailyNotification.objects.filter(last_sent_date__isnull=True).first()
        if message_not_published_yet:
            serializer = DailyNotificationSerializer(message_of_today)
            return Response({"positive_message":serializer.data})
        
        else:
            message_for_today = DailyNotification.objects.all().order_by('last_sent_date').first()
            serializer = DailyNotificationSerializer(message_for_today)
            return Response({"positive_message":serializer.data})