from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserRoleViewSet, UserViewSet, UserAnalyticsView

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'roles', UserRoleViewSet, basename='role')

# Define urlpatterns
urlpatterns = [
    path('', include(router.urls)),  # Include all router URLs
    path('analytics/users/', UserAnalyticsView.as_view(), name='user-analytics'),  # Change endpoint to /api/analytics/users/
]