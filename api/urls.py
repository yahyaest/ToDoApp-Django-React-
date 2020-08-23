from rest_framework import routers
from .api import TaskViewSet

router = routers.DefaultRouter()
router.register('task', TaskViewSet, 'task')

urlpatterns = router.urls