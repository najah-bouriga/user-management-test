from django.db import models

class UserRole(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class User(models.Model):
    user_name = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=128)
    full_name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    telephone = models.CharField(max_length=15)
    birthday = models.DateField()
    role = models.ForeignKey(UserRole, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.full_name
