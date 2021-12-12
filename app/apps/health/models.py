from django.db import models
from django.contrib.auth.models import User
import uuid

from apps.core.models import Profile

# Create your models here.

class HealthStatus(models.Model):
    """Table stores information about mental health status provided by the user"""
    MOOD = (
        ('positive', 'positive'),
        ('neutral', 'neutral'),
        ('negative', 'negative'),
    )
    
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='health_statuses')

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateTimeField()
    mood = models.CharField(max_length=32, choices=MOOD, default="neutral")
    note = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return f'{self.profile.user.first_name} {self.profile.user.last_name} - {self.date.strftime("%d-%m-%Y")}'