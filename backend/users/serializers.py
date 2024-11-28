from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import UserRole, User

class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRole
        fields = ['id', 'name']

class UserSerializer(serializers.ModelSerializer):
    role = UserRoleSerializer(read_only=True) 
    role_id = serializers.PrimaryKeyRelatedField(
        queryset=UserRole.objects.all(), source='role', write_only=True
    )  # For input validation

    password = serializers.CharField(write_only=True, required=True) 

    def validate_password(self, value):
        return make_password(value)

    class Meta:
        model = User
        fields = [
            'id',
            'user_name',
            'full_name',
            'email',
            'telephone',
            'birthday',
            'role', 
            'role_id', 
            'password',  
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
