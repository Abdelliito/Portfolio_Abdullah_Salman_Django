from django.contrib import admin
from .models import Experience, Project, Technology


class TechnologyInline(admin.TabularInline):
    model = Technology
    extra = 1


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('role', 'company')
    search_fields = ('role', 'company', 'description')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'github_link', 'live_link')
    list_filter = ('category',)
    search_fields = ('title', 'category', 'description')
    inlines = [TechnologyInline]


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ('name', 'project')
    search_fields = ('name', 'project__title')
