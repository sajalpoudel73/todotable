from django.db import models

class Task(models.Model):
    STATUS_CHOICES = [
        ('todo', 'Todo'),
        ('in-progress', 'In Progress'),
        ('completed', 'Completed'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='todo')
    created_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField()

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title