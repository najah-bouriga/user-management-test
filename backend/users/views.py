from datetime import timedelta
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Count, F
from django.db.models.functions import TruncMonth
from django.utils import timezone
from .models import User, UserRole
from .serializers import UserSerializer, UserRoleSerializer

class AgGridPagination(PageNumberPagination):
    """
    Custom pagination class to return data compatible with AG Grid.
    """
    page_size_query_param = 'page_size'
    page_size = 10
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'results': data,
            'count': self.page.paginator.count,
        })


class UserRoleViewSet(ModelViewSet):
    """
    ViewSet for managing UserRole objects.
    """
    queryset = UserRole.objects.all()
    serializer_class = UserRoleSerializer

    def destroy(self, request, *args, **kwargs):
        """
        Override destroy method to prevent deletion of UserRole objects.
        """
        return Response(
            {"detail": "Delete operation is not allowed for roles."},
            status=status.HTTP_403_FORBIDDEN
        )


class UserViewSet(ModelViewSet):
    """
    ViewSet for managing User objects.
    """
    queryset = User.objects.select_related('role').all()
    serializer_class = UserSerializer
    pagination_class = AgGridPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]

    filterset_fields = ['user_name', 'email', 'role__name', 'telephone', 'birthday']
    search_fields = ['user_name', 'email', 'full_name', 'role__name']
    ordering_fields = [
        'id', 'user_name', 'full_name', 'email', 'telephone',
        'role__name', 'created_at', 'updated_at', 'birthday',
    ]
    ordering = ['user_name']

    def create(self, request, *args, **kwargs):
        """
        Override create method to handle adding users.
        """
        data = request.data
        try:
            role_id = data.get('role_id')
            if not UserRole.objects.filter(id=role_id).exists():
                return Response({"detail": "Invalid role ID."}, status=status.HTTP_400_BAD_REQUEST)

            data['role'] = role_id
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            # Format validation error if applicable
            if hasattr(e, 'detail') and isinstance(e.detail, dict):
                formatted_error = {
                    key: [str(err) for err in value]
                    for key, value in e.detail.items()
                }
                return Response({"errors": formatted_error}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        """
        Override update method to handle editing users.
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = request.data
        try:
            role_id = data.get('role_id')
            if role_id and not UserRole.objects.filter(id=role_id).exists():
                return Response({"detail": "Invalid role ID."}, status=status.HTTP_400_BAD_REQUEST)

            if role_id:
                data['role'] = role_id

            serializer = self.get_serializer(instance, data=data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            if hasattr(e, 'detail') and isinstance(e.detail, dict):
                formatted_error = {
                    key: [str(err) for err in value]
                    for key, value in e.detail.items()
                }
                return Response({"errors": formatted_error}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class UserAnalyticsView(APIView):
    """
    API endpoint to provide analytics for user and role data.
    """

    def get(self, request):
        role_data = (
            User.objects.values(role_name=F("role__name"))
            .annotate(total_users=Count("id"))
            .order_by("role_name")
        )

        age_data = (
            User.objects.raw("""
                SELECT
                    id,
                    CASE
                        WHEN (strftime('%Y', 'now') - strftime('%Y', birthday)) BETWEEN 18 AND 29 THEN '18-29'
                        WHEN (strftime('%Y', 'now') - strftime('%Y', birthday)) BETWEEN 30 AND 44 THEN '30-44'
                        WHEN (strftime('%Y', 'now') - strftime('%Y', birthday)) BETWEEN 45 AND 59 THEN '45-59'
                        ELSE '60+'
                    END AS age_group,
                    COUNT(*) AS total_users
                FROM users_user
                GROUP BY age_group
            """)
        )

        age_group_data = [
            {"age_group": item.age_group, "total_users": item.total_users}
            for item in age_data
        ]

        one_year_ago = timezone.now() - timedelta(days=365)
        monthly_creation_data = (
            User.objects.annotate(month=TruncMonth("created_at"))
            .filter(created_at__gte=one_year_ago)
            .values("month")
            .annotate(total_users=Count("id"))
            .order_by("month")
        )

        formatted_monthly_creation_data = [
            {"month": item["month"].strftime('%Y-%m'), "total_users": item["total_users"]}
            for item in monthly_creation_data
        ]

        return Response({
            "role_data": list(role_data),
            "age_data": age_group_data,
            "monthly_creation_data": formatted_monthly_creation_data,
        })
