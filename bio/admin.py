from django.contrib import admin
from .models import Achievement, Bio, Service, ServiceFeature


@admin.register(Bio)
class BioAdmin(admin.ModelAdmin):
    list_display = ('name', 'professional_title', 'email', 'location')
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'title', 'description', 'professional_title', 'short_description')
        }),
        ('Hero', {
            'fields': ('typing_text', 'hero_tagline', 'profile_image', 'resume', 'availability_text')
        }),
        ('About', {
            'fields': ('about_paragraph_1', 'about_paragraph_2', 'career_objective', 'strengths')
        }),
        ('Contact', {
            'fields': ('email', 'phone', 'linkedin', 'github', 'location')
        }),
    )


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('title', 'organization', 'date', 'display_order')
    list_editable = ('display_order',)
    search_fields = ('title', 'organization', 'description', 'credential')


class ServiceFeatureInline(admin.TabularInline):
    model = ServiceFeature
    extra = 1


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'display_order')
    list_editable = ('display_order',)
    search_fields = ('title', 'description')
    inlines = [ServiceFeatureInline]
