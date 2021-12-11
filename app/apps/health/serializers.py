from rest_framework import serializers
from .models import HealthStatus

class HealthStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthStatus
        fields = '__all__'