from django.db import models

class Experience(models.Model):
    role = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.role


class Project(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    description = models.TextField()

    image = models.ImageField(upload_to='projects/', blank=True, null=True)

    github_link = models.URLField(blank=True)
    live_link = models.URLField(blank=True)

    def __str__(self):
        return self.title


class Technology(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="technologies"
    )

    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name