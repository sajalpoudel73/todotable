from rest_framework import viewsets
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer
from django.db.models import Q

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = Task.objects.all()
        status = self.request.query_params.get('status', None)
        sort_by = self.request.query_params.get('sort_by', '-due_date')
        
        if status == 'active':
            queryset = queryset.filter(~Q(status='completed'))
        elif status == 'completed':
            queryset = queryset.filter(status='completed')
        
        return queryset.order_by(sort_by)

    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()