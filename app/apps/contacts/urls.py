from . import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'sos-message', views.SMSNotifications)
router.register(r'all', views.HelpContactsViewSet)
urlpatterns = router.urls
