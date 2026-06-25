from django.shortcuts import render

from bio.models import Bio
from education.models import Education
from skills.models import Skill
from experience_projects.models import Project, Experience


def home(request):

    bio = Bio.objects.first()

    education = Education.objects.all()

    skills = Skill.objects.all()

    projects = Project.objects.all()

    experiences = Experience.objects.all()

    context = {
        'bio': bio,
        'education': education,
        'skills': skills,
        'projects': projects,
        'experiences': experiences,
    }

    return render(request, 'home.html', context)