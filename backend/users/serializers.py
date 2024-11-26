from rest_framework import serializers
from .models import UserRole, User

class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRole
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    role = serializers.PrimaryKeyRelatedField(queryset=UserRole.objects.all())  # Reference roles by ID
    class Meta:
        model = User  # Specify the model this serializer is for
        fields = '__all__'  # Include all fields from the model
