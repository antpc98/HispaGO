from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.db import OperationalError
from django.test import Client, TestCase
from django.urls import reverse


class HealthTests(TestCase):
    def test_ready_with_real_database(self):
        response = self.client.get(reverse("health"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok", "checks": {"database": "ok"}})
        self.assertEqual(response["Cache-Control"], "no-store")

    def test_database_failure_returns_503_without_details(self):
        with patch("core.views.connection.cursor", side_effect=OperationalError("private detail")):
            response = self.client.get(reverse("health"))
        self.assertEqual(response.status_code, 503)
        self.assertEqual(
            response.json(),
            {"status": "unavailable", "checks": {"database": "unavailable"}},
        )
        self.assertNotContains(response, "private detail", status_code=503)

    def test_probe_is_read_only(self):
        self.assertEqual(self.client.post(reverse("health")).status_code, 405)


class AdminTests(TestCase):
    def test_anonymous_user_is_redirected_to_login(self):
        response = self.client.get(reverse("admin:index"))
        self.assertRedirects(response, "/admin/login/?next=/admin/")

    def test_login_page_has_brand_and_csrf(self):
        response = self.client.get(reverse("admin:login"))
        self.assertContains(response, "HispaGo · Editor cultural")
        self.assertContains(response, "csrfmiddlewaretoken")

    def test_login_requires_csrf(self):
        response = Client(enforce_csrf_checks=True).post(
            reverse("admin:login"), {"username": "editor", "password": "unused"}
        )
        self.assertEqual(response.status_code, 403)

    def test_non_staff_cannot_access_editor(self):
        user = get_user_model().objects.create_user("visitor", password="test-only-password")
        self.client.force_login(user)
        self.assertEqual(self.client.get(reverse("admin:index")).status_code, 302)

    def test_staff_can_access_editor(self):
        user = get_user_model().objects.create_user(
            "editor", password="test-only-password", is_staff=True
        )
        self.client.force_login(user)
        response = self.client.get(reverse("admin:index"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Tu espacio editorial")
