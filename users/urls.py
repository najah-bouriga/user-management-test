from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserRoleViewSet, UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'roles', UserRoleViewSet)  # Add this for roles

urlpatterns = [
    path('', include(router.urls)),
]
