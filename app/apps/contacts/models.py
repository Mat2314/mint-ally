from django.db import models
from django.contrib.auth.models import User
import uuid

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
    
    def __str__(self):
        return f'{self.profile.user.first_name} {self.profile.user.last_name} <- {self.first_name} {self.last_name}'