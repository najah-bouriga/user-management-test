# Generated by Django 5.1.3 on 2024-11-24 14:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('login_username', models.CharField(max_length=100, unique=True)),
                ('password', models.CharField(max_length=128)),
                ('full_name', models.CharField(max_length=200)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('telephone', models.CharField(max_length=15)),
                ('birthday', models.DateField()),
                ('user_role', models.CharField(choices=[('Admin', 'Admin'), ('User', 'User')], default='User', max_length=20)),
            ],
        ),
    ]
