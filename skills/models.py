from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Skill(models.Model):
    FRONTEND = 'Frontend'
    BACKEND = 'Backend'
    DATABASE = 'Database'
    TOOLS = 'Tools'

    CATEGORY_CHOICES = [
        (FRONTEND, 'Frontend'),
        (BACKEND, 'Backend'),
        (DATABASE, 'Database'),
        (TOOLS, 'Tools'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default=FRONTEND,
    )
    percentage = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
    )
    icon = models.CharField(max_length=80, blank=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['category', 'display_order', 'name']

    def __str__(self):
        return self.name
