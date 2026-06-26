from django.shortcuts import render

from bio.models import Achievement, Bio, Service
from education.models import Education
from skills.models import Skill
from experience_projects.models import Experience, Project, Technology


def _display_url(url):
    return url.replace('https://', '').replace('http://', '').rstrip('/')


def _phone_href(phone):
    return ''.join(char for char in phone if char.isdigit() or char == '+')


def home(request):

    bio = Bio.objects.first()

    education = Education.objects.all()

    skills = Skill.objects.all()

    projects = Project.objects.prefetch_related('technologies').all()

    experiences = Experience.objects.all()

    achievements = Achievement.objects.all()

    services = Service.objects.prefetch_related('features').all()

    category_icons = {
        Skill.FRONTEND: 'fas fa-paint-brush',
        Skill.BACKEND: 'fas fa-server',
        Skill.DATABASE: 'fas fa-database',
        Skill.TOOLS: 'fas fa-wrench',
    }

    skill_categories = []
    skills_list = list(skills)
    for category, label in Skill.CATEGORY_CHOICES:
        category_skills = [
            skill for skill in skills_list if skill.category == category
        ]
        if category_skills:
            skill_categories.append({
                'name': label,
                'value': category,
                'icon': category_icons.get(category, 'fas fa-code'),
                'skills': category_skills,
            })

    typing_roles = []
    if bio:
        typing_roles = [
            role.strip()
            for role in bio.typing_text.splitlines()
            if role.strip()
        ]
        if not typing_roles:
            typing_roles = [bio.professional_title or bio.title]

    context = {
        'bio': bio,
        'education': education,
        'current_education': education.first(),
        'skills': skills,
        'skill_categories': skill_categories,
        'projects': projects,
        'experiences': experiences,
        'achievements': achievements,
        'services': services,
        'typing_roles': typing_roles,
        'project_count': projects.count(),
        'technology_count': Technology.objects.count(),
        'achievement_count': achievements.count(),
        'linkedin_label': _display_url(bio.linkedin) if bio and bio.linkedin else '',
        'github_label': _display_url(bio.github) if bio and bio.github else '',
        'phone_href': _phone_href(bio.phone) if bio and bio.phone else '',
    }

    return render(request, 'home.html', context)
