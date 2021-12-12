from . import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'whoami', views.UserAuthenticationViewSet)
router.register(r'registration', views.UserRegistrationViewSet)

urlpatterns = router.urls
