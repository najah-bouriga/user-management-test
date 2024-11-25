from django.shortcuts import render

from rest_framework.pagination import PageNumberPagination
from rest_framework.viewsets import ModelViewSet
from .models import UserRole, User
from .serializers import UserRoleSerializer, UserSerializer

class UserRoleViewSet(ModelViewSet):
    queryset = UserRole.objects.all()
    serializer_class = UserRoleSerializer

class UserPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'  # Allow clients to define page size
    max_page_size = 100  # Max items per page

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = UserPagination  # Apply custom pagination to this viewset
