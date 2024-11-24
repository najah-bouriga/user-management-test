from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # Specify the model this serializer is for
        fields = '__all__'  # Include all fields from the model
