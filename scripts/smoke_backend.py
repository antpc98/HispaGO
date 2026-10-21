"""Check an already running backend using only Python's standard library."""

import argparse
import json
from urllib.error import HTTPError
from urllib.request import urlopen


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base-url", default="http://127.0.0.1:8000")
    parser.add_argument("--expected-status", type=int, choices=[200, 503], default=200)
    args = parser.parse_args()
    base_url = args.base_url.rstrip("/")
    try:
        response = urlopen(f"{base_url}/health/", timeout=10)
    except HTTPError as error:
        response = error
    with response:
        status = response.status
        payload = json.load(response)
        cache_control = response.headers.get("Cache-Control")
    expected = "ok" if args.expected_status == 200 else "unavailable"
    if status != args.expected_status or payload != {
        "status": expected,
        "checks": {"database": expected},
    }:
        raise SystemExit("La respuesta de salud no coincide con la esperada.")
    if cache_control != "no-store":
        raise SystemExit("El endpoint de salud no debe almacenarse en caché.")
    print(f"Salud HTTP {status}: verificada.")
    if status == 200:
        with urlopen(f"{base_url}/admin/login/", timeout=10) as response:
            page = response.read().decode("utf-8")
            if response.status != 200 or "HispaGo · Editor cultural" not in page:
                raise SystemExit("La página de acceso editorial no coincide con la esperada.")
            if "csrfmiddlewaretoken" not in page:
                raise SystemExit("Falta la protección CSRF en el formulario editorial.")
        print("Acceso al Admin y formulario CSRF: verificados.")


if __name__ == "__main__":
    main()
