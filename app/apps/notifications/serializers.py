from rest_framework import serializers
from .models import DailyNotification

class DailyNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyNotification
        fields = '__all__'