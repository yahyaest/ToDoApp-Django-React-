from rest_framework import serializers
from api.models import Task

# Task Serializer
class TaskSerializer(serializers.ModelSerializer):
 class Meta:
  model = Task
  fields = '__all__'