from . import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'status', views.HealthStatusViewSet)
urlpatterns = router.urls
