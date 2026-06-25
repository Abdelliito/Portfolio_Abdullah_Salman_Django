from django.db import models

class Skill(models.Model):
    name = models.CharField(max_length=100)
    percentage = models.IntegerField()

    def __str__(self):
        return self.name