import datetime
from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import Permission, User
from django.contrib.auth.models import Group

from apps.notifications.models import DailyNotification

class Command(BaseCommand):
    help = 'Seeds notifications'

    def handle(self, *args, **options):
        try:
            EXAMPLE_NOTIFICATIONS = [
                "Remeber to smile today :)",
                "Take some quality time with yourself - maybe a walk in the park?",
                "Remember your best holidays? That was so much fun!",
                "Let yourself feel what you feel right now. Go easy on yourself.",
                "Inhale, hold, exhale - the best method to relax your body",
            ]
            
            for notification in EXAMPLE_NOTIFICATIONS:
                DailyNotification.objects.create(content=notification, last_sent_date=datetime.date.today())
            
            self.stdout.write(self.style.SUCCESS(f"Populated database with {len(EXAMPLE_NOTIFICATIONS)} notifications!"))

        except Exception as e:
            self.stdout.write(self.style.ERROR("Could not populate database with notifications"))
            print(e)
