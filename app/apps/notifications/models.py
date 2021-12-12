from django.db import models
from django.contrib.auth.models import User

import uuid

# Create your models here.
class DailyNotification(models.Model):
    """Table contains daily positive text notifications keeping user up with good content info."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    content = models.TextField()
    last_sent_date = models.DateField(null=True, blank=True)
    
    def __str__(self):
        return f'{self.last_sent_date.strftime("%d-%m-%Y")} - {self.content}'
    