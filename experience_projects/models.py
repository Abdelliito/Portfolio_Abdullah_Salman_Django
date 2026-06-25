from django.db import models

class Experience(models.Model):
    role = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.role


class Project(models.Model):
    title = models.CharField(max_length=200)
    technologies = models.CharField(max_length=300)
    description = models.TextField()

    def __str__(self):
        return self.title