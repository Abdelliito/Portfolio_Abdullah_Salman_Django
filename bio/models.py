from django.db import models

class Bio(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    description = models.TextField()
    professional_title = models.CharField(max_length=120, blank=True)
    typing_text = models.TextField(
        blank=True,
        help_text="Enter one typing animation phrase per line.",
    )
    hero_tagline = models.TextField(blank=True)
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    availability_text = models.CharField(max_length=120, blank=True)
    about_paragraph_1 = models.TextField(blank=True)
    about_paragraph_2 = models.TextField(blank=True)
    career_objective = models.TextField(blank=True)
    strengths = models.TextField(blank=True)
    short_description = models.TextField(blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=30, blank=True)
    linkedin = models.URLField(blank=True)
    github = models.URLField(blank=True)
    location = models.CharField(max_length=120, blank=True)

    def __str__(self):
        return self.name


class Achievement(models.Model):
    title = models.CharField(max_length=200)
    organization = models.CharField(max_length=200)
    description = models.TextField()
    date = models.CharField(max_length=100)
    icon = models.CharField(max_length=80, blank=True, default='fas fa-certificate')
    credential = models.CharField(max_length=120, blank=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', '-id']

    def __str__(self):
        return self.title


class Service(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=80, blank=True, default='fas fa-laptop-code')
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'title']

    def __str__(self):
        return self.title


class ServiceFeature(models.Model):
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name='features',
    )
    text = models.CharField(max_length=200)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.text
