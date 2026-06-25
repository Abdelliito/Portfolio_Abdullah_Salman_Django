from django.db import models

class Education(models.Model):
    degree = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    duration = models.CharField(max_length=100)

    def __str__(self):
        return self.degree