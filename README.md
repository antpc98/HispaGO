# HispaGo

Experiencias culturales por Sevilla. Base de la **entrega 1**: Django/PostgreSQL y
una demo visual Android/web con Explorar, detalle y parada.

La demo contiene ficción identificada y datos locales de presentación. Todavía no
consulta un catálogo, reproduce audio, solicita GPS ni guarda progreso. La
[guía fuente](docs/content/HispaGo_Guia_Desarrollo_V1.md), el
[plan de entregas](docs/PLAN_ENTREGAS_V1.md) y el [estado actual](docs/STATE.md)
describen el alcance y lo pendiente.

## Requisitos

- Git, Python **3.13.5**, Node **24.19.0** con npm y Docker con Compose v2.
- Versiones de librerías en [docs/versions.md](docs/versions.md); no recrear el
  proyecto con otra plantilla ni actualizar mayores durante la instalación.
- Android físico y Expo Go compatible con SDK 58 son opcionales para explorar esta
  base. Si no hay compatibilidad, hará falta una development build en una entrega
  posterior. La comprobación web no sustituye una prueba Android.

Clonar y situarse en la raíz:

```sh
git clone https://github.com/antpc98/HispaGO.git
cd HispaGO
```

## Configuración local

El generador crea `.env`, `backend/.env` y `mobile/.env` con secretos locales
aleatorios y permisos restringidos cuando el sistema lo permite. No muestra
valores ni sobrescribe archivos existentes. Se puede ejecutar de nuevo.

Linux/macOS:

```sh
python3.13 scripts/bootstrap_env.py
docker compose up -d --wait
python3.13 -m venv backend/.venv
backend/.venv/bin/python -m pip install --require-hashes -r backend/requirements-dev.txt
```

Windows PowerShell:

```powershell
py -3.13 scripts/bootstrap_env.py
docker compose up -d --wait
py -3.13 -m venv backend/.venv
.\backend\.venv\Scripts\python.exe -m pip install --require-hashes -r backend/requirements-dev.txt
```

Si la distribución Linux no incluye `venv`/`ensurepip`, instala el paquete oficial
correspondiente o usa uv, como en el entorno cloud preparado:

```sh
uv venv --python python3.13 backend/.venv
uv pip sync --python backend/.venv/bin/python --require-hashes backend/requirements-dev.txt
```

Los `.env.example` documentan los nombres, sin claves reales. Si el puerto 5432
está ocupado, cambia `POSTGRES_PORT` en `.env` y el puerto de `DATABASE_URL` en
`backend/.env`. Cambiar una contraseña de `.env` no cambia la de un volumen de
PostgreSQL ya creado: actualiza la credencial de base sin borrar el volumen.

## Backend y editor

Linux/macOS, desde la raíz:

```sh
cd backend
.venv/bin/python manage.py migrate --noinput
.venv/bin/python manage.py collectstatic --noinput
.venv/bin/python manage.py check
.venv/bin/python manage.py createsuperuser
.venv/bin/python manage.py runserver 127.0.0.1:8000
```

En Windows, desde `backend`, sustituye `.venv/bin/python` por
`.\.venv\Scripts\python.exe`. La creación de superusuario es interactiva y solo
se hace cuando necesites una cuenta local propia; no forma parte del arranque
automático ni se incluye una contraseña predeterminada.

Acceso local: `http://127.0.0.1:8000/admin/`. Solo existe el Admin base de Django;
los formularios de rutas se incorporan en la entrega 2.

Desde otra terminal en la raíz:

```sh
python3.13 scripts/smoke_backend.py
```

En PowerShell usa `py -3.13`. El smoke comprueba `/health/` mediante una consulta
real a base y el formulario de acceso al Admin con CSRF. El servicio devuelve
503 si falla la base y no expone detalles de conexión.

## App y demo visual

Con Node 24.19.0, desde `mobile`:

```sh
npm ci
npm start
```

Usa las opciones de Expo para abrir web o un dispositivo compatible. Para abrir
directamente la demo web de desarrollo:

```sh
npm run web
```

La demo actual no necesita backend. En entregas posteriores,
`EXPO_PUBLIC_API_URL` contendrá la URL pública de la API, nunca secretos. En un
teléfono, `127.0.0.1` apunta al teléfono: se usará la IP LAN del ordenador en
desarrollo, añadiéndola a `DJANGO_ALLOWED_HOSTS`, o HTTPS en el piloto.

Expo puede necesitar sus servicios online. En una máquina con red limitada, el
arranque offline soportado es `npx expo start --offline`. No equivale
a validar su configuración con los servicios online.

En este entorno cloud el directorio personal es de solo lectura. Se han usado
cachés en `/workspace/.cache`, sin cambiar `HOME`. Desde `mobile`, el arranque
comprobado es:

```sh
__UNSAFE_EXPO_HOME_DIRECTORY=/workspace/.cache/hispago-expo EXPO_NO_TELEMETRY=1 npx expo start --offline --port 8083
```

La variable de Expo es una opción del CLI para ubicar sus ajustes/caché; se pasa
solo en la terminal, nunca en el `.env` del proyecto. npm puede usar
`--cache /workspace/.cache/npm` y uv `UV_CACHE_DIR=/workspace/.cache/uv`.
El depurador nativo nuevo no pudo instalarse en la caché personal: Expo utilizó
su versión fallback. El servidor Metro y el manifiesto Android sí se comprobaron.

## Verificaciones

Backend, desde `backend` (sustituye el ejecutable en Windows):

```sh
.venv/bin/ruff check . ../scripts
.venv/bin/ruff format --check . ../scripts
.venv/bin/python -m unittest discover -s ../scripts -p 'test_*.py' -v
.venv/bin/python manage.py check
.venv/bin/python manage.py makemigrations --check --dry-run
.venv/bin/python manage.py test --verbosity 2
```

Los tests Django requieren PostgreSQL disponible y un usuario **de desarrollo**
con permiso de crear la base temporal `test_hispago`; Compose ya lo proporciona.
No ejecutes estas pruebas apuntando a producción.

Móvil, desde `mobile`:

```sh
npm run typecheck
npm run lint
npm run format:check
npm test
npm run export:android -- --max-workers 2
npm run export:web -- --max-workers 2
npx playwright install chromium
npm run test:e2e
```

El E2E arranca el servidor de la exportación web, recorre las pantallas y comprueba
filtros y adaptación a varios anchos. **Un bundle Android no es un APK instalado.**

Para comprobar también avisos de React exclusivos del desarrollo:

```sh
npm run test:e2e:dev
```

Este runner arranca Metro offline en el puerto 8084 con caché limpia y verifica
las mismas pantallas, incluidos los SVG decorativos y su accesibilidad web.

La comprobación local de versiones se puede ejecutar sin enviar configuración:

```sh
EXPO_OFFLINE=1 npx expo install --check
```

Expo advierte que la comprobación offline usa sus metadatos locales. Expo Doctor
completo (`npm run doctor`) necesita servicios externos y envía metadatos del
proyecto; su ejecución online está pendiente de autorización en este entorno.
No se ha omitido una comprobación mediante exclusiones para obtener un resultado
de éxito. Consulta el [informe](docs/qa/test-results.md).

En PowerShell, establece `$env:EXPO_OFFLINE='1'`, ejecuta `npx expo install --check`
y después elimina la variable con `Remove-Item Env:EXPO_OFFLINE`.

## Documentación y colaboración

- [Arquitectura](docs/architecture.md), [decisiones](docs/decisions/0001-foundation.md)
  y [API inicial](docs/api.md).
- [Dirección visual y capturas](docs/design/README.md).
- [Casos funcionales](docs/qa/functional-tests.md), [resultados](docs/qa/test-results.md)
  y [Android pendiente](docs/qa/android-checklist.md).
- [Créditos de recursos](docs/content/assets.md).
- [AGENTS.md](AGENTS.md) para continuar sin perder contexto.

CI ejecuta verificaciones de backend y móvil sobre PostgreSQL. El workflow no
ejecuta la consulta online pendiente de Expo Doctor. Los resultados de GitHub
Actions solo se considerarán verificados cuando exista una ejecución real.

Para detener la base conservando los datos: `docker compose stop`. Para volver:
`docker compose up -d --wait`. No uses `docker compose down -v` como reparación;
elimina los datos del volumen.
