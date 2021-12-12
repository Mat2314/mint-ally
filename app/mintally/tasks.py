from .celery import app
from apps.contacts.models import Shipment, SMS, HelpContact
from apps.core.models import Profile
from mintally.settings import SMSAPI_TOKEN, SMSAPI_FROM
from smsapi.client import SmsApiPlClient
from smsapi.exception import SmsApiException
import datetime
from django.db import transaction


@app.task
def hello_world():
    print("Hello world")
    
@app.task
@transaction.atomic
def send_sos_messages(profile_id, shipment_id, geolocation_data):
    """Calls SMS API to send messages to user help contacts."""
    
    # Get shipment and a user
    profile = Profile.objects.get(id=profile_id)
    shipment = Shipment.objects.get(id=shipment_id)
    
    # Create SMS messages
    help_contacts = profile.help_contacts.all()
    client = SmsApiPlClient(access_token=SMSAPI_TOKEN)
    
    for contact in help_contacts:
        new_sms = SMS.objects.create(
            receiver=contact, 
            shipment=shipment, 
            sent_at=datetime.datetime.now(), 
            content=contact.prepare_sms_content(geolocation_data)
        )
    
        try:
            # Connect to API and send messages
            sending_results = client.sms.send(
                to=contact.phone_number, 
                message=new_sms.content, 
                from_=SMSAPI_FROM, 
                sent_at=datetime.datetime.now()
            )
        except SmsApiException as e:
            shipment.status = "error"
            shipment.save()
            print(e.message, e.code)
            return
    
    shipment.status = "sent"
    shipment.sent_at = datetime.datetime.now()
    shipment.save()