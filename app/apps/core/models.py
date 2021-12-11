from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField

import uuid

# Create your models here.

class Profile(models.Model):
    """Profile table as an extension to Django's User model."""
    ACCOUNT_TYPES = (
        ('user', 'user'),
        ('specialist', 'specialist'),
    )

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="profile")

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    phone_number = PhoneNumberField("Phone number")
    account_type = models.CharField(max_length=32, choices=ACCOUNT_TYPES, default="user")
    notifications_on = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} ({self.user.email})"
