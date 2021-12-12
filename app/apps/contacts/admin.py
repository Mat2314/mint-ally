from django.contrib import admin
from .models import HelpContact, SMS, Shipment

# Register your models here.
admin.site.register(HelpContact)
admin.site.register(SMS)
admin.site.register(Shipment)
