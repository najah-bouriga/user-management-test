from django.db import models

class User(models.Model):
    user_name = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=128)  # Store encrypted passwords
    full_name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    telephone = models.CharField(max_length=15)
    birthday = models.DateField()
    USER_ROLES = [
        ('Admin', 'Admin'),
        ('User', 'User'),
    ]
    # The user's role. Can only be 'Admin' or 'User'. Default is 'User'.
    user_role = models.CharField(max_length=20, choices=USER_ROLES, default='User')
    def __str__(self):
        # Return the user's full name when the object is shown as text.
        return self.full_name
