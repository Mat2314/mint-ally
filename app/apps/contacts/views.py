from django.shortcuts import render

# Create your views here.
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import SMS, HelpContact, Shipment
from .serializers import HelpContactSerializer
from django.core.paginator import Paginator
from django.db.models import Q
from django.db import transaction
from rest_framework import status
from django.utils import timezone

from mintally.decorators import handle_exceptions
import datetime
from datetime import timedelta

from mintally.tasks import send_sos_messages

# Create your views here.


class SMSNotifications(viewsets.ModelViewSet):
    queryset = SMS.objects.all()
    serializer_class = HelpContactSerializer
    permission_classes = [IsAuthenticated]

    @handle_exceptions("Could not send SOS message")
    def create(self, request):
        """
        Call external API to send SMS messages to help contacts of authenticated user.
        """
        # See if payload with geolocation arrived
        latitude = request.data.get('latitude')
        longitude = request.data.get('longitude')

        # Get all contacts
        profile = request.user.profile
        if not profile.help_contacts.all():
            return Response({"message": "You did not insert any contacts into the application"}, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve all sms_messages that were sent by this user
        all_user_shipments = Shipment.objects.filter(
            profile=profile, status="sent")
        sent_messages = SMS.objects.filter(
            shipment__in=all_user_shipments).order_by('-sent_at')

        # Check when was the last message sent by this user
        # If less than 4 hours ago, don't send a message
        HOURS_LIMIT_SINCE_LAST_SMS = 4
        sending_time_borderline = datetime.datetime.now(
        ) - timedelta(hours=HOURS_LIMIT_SINCE_LAST_SMS)
        sending_time_borderline = timezone.make_aware(
            sending_time_borderline, timezone.get_default_timezone())

        if sent_messages and sent_messages[0].sent_at > sending_time_borderline:
            new_time_borderline_to_send_messages = (sending_time_borderline + timedelta(
                hours=HOURS_LIMIT_SINCE_LAST_SMS)).strftime("%d-%m-%Y %H:%M:%S")
            return Response({"error": "Messages were sent recently", "message": f"Can not send new messages until {new_time_borderline_to_send_messages}"}, status=status.HTTP_400_BAD_REQUEST)

        # Create new shipment
        new_shipment = Shipment.objects.create(
            profile=profile, sent_at=datetime.datetime.now())

        # Send SOS messages in the background
        geolocation_data = {
            "latitude": latitude,
            "longitude": longitude
        }
        send_sos_messages.delay(profile.id, new_shipment.id, geolocation_data)

        return Response({"message": "Your contacts will be notified ASAP!", "shipment_id": new_shipment.id})


class HelpContactsViewSet(viewsets.ModelViewSet):
    queryset = HelpContact.objects.all()
    serializer_class = HelpContactSerializer
    permission_classes = [IsAuthenticated]

    @handle_exceptions("Could not retrieve help contacts list")
    def list(self, request):
        """Get list of help contacts inserted by user"""
        help_contacts = request.user.profile.help_contacts.all()
        serializer = HelpContactSerializer(help_contacts, many=True)
        return Response({"contacts": serializer.data})

    @handle_exceptions("Could not create contact")
    @transaction.atomic
    def create(self, request):
        """Create a new help contact for the user - only if there are less than 5 contacts inserted in DB"""
        # Check if there are already N registered contacts
        help_contacts_amount = request.user.profile.help_contacts.all().count()
        if help_contacts_amount >= 5:
            return Response({"message": "You already inserted maximum amount of contacts (5)"}, status=status.HTTP_400_BAD_REQUEST)

        # Add new contact
        HelpContact.objects.create(
            profile=request.user.profile,
            first_name=request.data['first_name'],
            last_name=request.data['last_name'],
            phone_number=request.data['phone_number'],
        )
        
        return Response({"message":"Created new contact!"})
    
    @handle_exceptions("Could not update contact")
    def put(self, request):
        """Update user help contact"""
        contact = HelpContact.objects.filter(id=request.data['id']).first()
        if not contact:
            return Response({"message": "Contact not found in database"}, status=status.HTTP_400_BAD_REQUEST)

        contact.first_name = request.data['first_name']
        contact.last_name = request.data['last_name']
        contact.phone_number = request.data['phone_number']
        
        contact.save()
        
        return Response({"message": "Contact updated!"})
    
    @handle_exceptions("Could not update contact")
    def delete(self, request):
        """Remove user's help contact"""
        id = self.request.query_params.get('id')
        
        contact = HelpContact.objects.filter(id=id).first()
        if not contact:
            return Response({"message": "Contact not found in database"}, status=status.HTTP_400_BAD_REQUEST)
        
        contact.delete()
        return Response({"message":"Removed contact successfully"})