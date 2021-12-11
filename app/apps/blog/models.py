from django.db import models
import uuid

# Create your models here.

class Article(models.Model):
    """Table stores blog articles about mental health."""
    STATUS = (
        ('draft', 'draft'),
        ('published', 'published'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=64)
    content = models.TextField()
    published_date = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=32, choices=STATUS, default="draft")

    def __str__(self):
        return f'{self.title} ({self.status})'