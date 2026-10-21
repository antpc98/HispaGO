"""Create ignored local configuration without replacing existing files or logging secrets."""

import os
import secrets
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parent.parent


def create_private_file(path: Path, content: str) -> None:
    try:
        descriptor = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    except FileExistsError:
        print(f"Conservado: {path.relative_to(ROOT)}")
        return
    with os.fdopen(descriptor, "w", encoding="utf-8", newline="\n") as target:
        target.write(content)
    print(f"Creado: {path.relative_to(ROOT)}")


def main() -> None:
    root_env = ROOT / ".env"
    create_private_file(
        root_env,
        f"POSTGRES_PASSWORD={secrets.token_urlsafe(36)}\nPOSTGRES_PORT=5432\n",
    )
    values = {}
    for line in root_env.read_text(encoding="utf-8").splitlines():
        if line.strip() and not line.lstrip().startswith("#") and "=" in line:
            name, value = line.split("=", 1)
            values[name.strip()] = value.strip().strip("\"'")
    password = values.get("POSTGRES_PASSWORD", "")
    port = values.get("POSTGRES_PORT", "5432")
    if not password or password.startswith("CAMBIAR_"):
        raise SystemExit("Configura POSTGRES_PASSWORD en .env antes de continuar.")
    if not port.isdecimal() or not 1 <= int(port) <= 65535:
        raise SystemExit("POSTGRES_PORT debe ser un puerto válido.")
    create_private_file(
        ROOT / "backend" / ".env",
        "DJANGO_DEBUG=True\n"
        f"DJANGO_SECRET_KEY={secrets.token_urlsafe(64)}\n"
        "DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,[::1]\n"
        f"DATABASE_URL=postgresql://hispago:{quote(password, safe='')}@127.0.0.1:{port}/hispago\n"
        "CORS_ALLOWED_ORIGINS=http://localhost:8081\n",
    )
    create_private_file(
        ROOT / "mobile" / ".env",
        "EXPO_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1\n",
    )


if __name__ == "__main__":
    main()
