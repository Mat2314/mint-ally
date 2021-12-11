from rest_framework import serializers
from .models import HelpContact


class HelpContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = HelpContact
        fields = '__all__'
