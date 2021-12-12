from django.db import models
from django.contrib.auth.models import User
import uuid
from jinja2 import Template

from apps.core.models import Profile
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.

class HelpContact(models.Model):
    """Table stores information about people with who the user can get in touch
    when feeling bad."""
    
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='help_contacts')

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    phone_number = PhoneNumberField("Phone number")
    
    def prepare_sms_content(self, geolocation_data):
        """Method returns proper sms content to be sent to the help contact"""
        template = Template('{{receiver_name}}! {{user_full_name}} used SOS button to notify you that his/her mental health is bad. Please call him/her ASAP! The location of {{user_full_name}} -> https://www.google.com/maps/@{{latitude}},{{longitude}},{{zoom}}z')
        message = template.render({
            "receiver_name": self.first_name, 
            "user_full_name": ' '.join([self.profile.user.first_name, self.profile.user.last_name]),
            "latitude": geolocation_data['latitude'],
            "longitude": geolocation_data['longitude'],
            "zoom": 20
        })
        
        return message
    
    def __str__(self):
        return f'{self.profile.user.first_name} {self.profile.user.last_name} <- {self.first_name} {self.last_name}'
    
class Shipment(models.Model):
    STATUSES = [
        ('pending', 'pending'),
        ('sent', 'sent'),
        ('error', 'error')
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='shipments')
    status = models.CharField(max_length=32, choices=STATUSES, default='pending')
    sent_at = models.DateTimeField()
    
    def __str__(self):
        return f'{self.profile.user.first_name} {self.profile.user.last_name} ({self.status})'

class SMS(models.Model):
    """Table stores data related to SMS messages ever sent to help contacts of a user"""
    
    receiver = models.ForeignKey(HelpContact, on_delete=models.CASCADE, related_name="sms_messages")
    shipment = models.ForeignKey(Shipment, on_delete=models.CASCADE, related_name="sms_messages")
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    content = models.TextField(max_length=500)
    sent_at = models.DateTimeField()
    
    def __str__(self):
        return f'{self.receiver.profile.user.first_name} {self.receiver.profile.user.last_name} ({self.sent_at.strftime("%d-%m-%Y %H:%M:%S")})'
