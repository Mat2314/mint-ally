from . import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'articles', views.ArticlesViewSet)
router.register(r'article', views.ArticleViewSet)
urlpatterns = router.urls
