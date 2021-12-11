from . import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'whoami', views.UserAuthenticationViewSet)

urlpatterns = router.urls
