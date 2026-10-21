from django.db import DatabaseError, connection
from django.http import JsonResponse
from django.views.decorators.http import require_safe


@require_safe
def health(request):
    """Readiness probe: a real query, with no infrastructure or credential details."""
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            cursor.fetchone()
    except DatabaseError:
        response = JsonResponse(
            {"status": "unavailable", "checks": {"database": "unavailable"}}, status=503
        )
    else:
        response = JsonResponse({"status": "ok", "checks": {"database": "ok"}})
    response["Cache-Control"] = "no-store"
    return response
