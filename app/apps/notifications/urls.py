from . import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'positive', views.DailyMessageViewSet)
urlpatterns = router.urls
