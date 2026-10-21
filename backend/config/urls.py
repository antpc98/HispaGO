from django.contrib import admin
from django.urls import path

from core.views import health

admin.site.site_header = "HispaGo · Editor cultural"
admin.site.site_title = "HispaGo"
admin.site.index_title = "Tu espacio editorial"

urlpatterns = [
    path("health/", health, name="health"),
    path("admin/", admin.site.urls),
]
