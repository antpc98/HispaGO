# HispaGo · Guía de desarrollo desde cero hasta la V1

**Documento de trabajo para Antonio, Cristina, ChatGPT Work y Codex.**

Versión 1.0 · 13 de octubre de 2026 · Objetivo: una app Android que Ana pueda instalar, recorrer y valorar, con Django/Python y contenidos editables sin programar.

## 1. Qué vamos a entregar

HispaGo debe convertir una ruta cultural por Sevilla en una experiencia narrativa: descubrir una ruta, entender qué propone, seguir sus paradas, escuchar historias, resolver pequeñas dinámicas y terminar con sensación de haber vivido algo.

La primera experiencia será **Las bodas de Fígaro — Amor, secretos y poder en la Sevilla de Mozart**. El título comercial y las localizaciones definitivas deben validarse con Ana. No inventaremos direcciones ni presentaremos escenas de ficción como hechos históricos.

La V1 de este documento es un piloto funcional instalable, con base preparada para evolucionar a publicación. La publicación comercial en tiendas será una entrega posterior: requiere revisión de contenido, privacidad, fichas y pruebas adicionales. Un APK para Ana no equivale a una app ya publicada en Google Play.

### Recorrido que tiene que funcionar de principio a fin

1. Abrir HispaGo y entrar como visitante.
2. Ver un catálogo atractivo con filtros.
3. Abrir Fígaro y consultar duración, distancia, horario recomendado, punto de inicio y condiciones.
4. Iniciar la ruta y ver mapa, paradas y progreso.
5. Abrir una parada, leer o escuchar su relato y resolver una dinámica.
6. Pausar, cerrar la app y recuperar el progreso al abrirla.
7. Completar la ruta y ver un cierre narrativo con resumen y XP.
8. Añadir una nueva parada desde el editor; verla en la app sin recompilar el APK.

**Objetivo editorial propuesto:** una ruta completa con 4–6 paradas aprobadas, al menos tres dinámicas y audios finales en todas sus paradas narradas. La cantidad se ajustará a la ruta real de Ana; no alargaremos la ruta para cumplir un número artificial.

### Alcance

| Incluido en V1 | Ampliación posterior |
|---|---|
| Android con React Native, Expo y TypeScript | Publicación iOS y tiendas |
| Django, API REST, PostgreSQL y Django Admin | Servicios separados y colas si aparece una necesidad real |
| Catálogo, filtros, detalle y ruta guiada | Generación dinámica de rutas con IA |
| Mapa y ubicación mientras la app está abierta | Geofencing y seguimiento continuo en segundo plano |
| Narración pregrabada y transcripción | TTS en tiempo real y conversación con personajes |
| Quiz, observación y decisión narrativa | Rankings y competición social |
| Progreso local de visitante y XP local | Cuentas, sincronización multidispositivo y recompensas de valor |
| Recomendación por reglas de tiempo/intereses/compañía | Clima en vivo y personalización avanzada |
| Funcionamiento online con recuperación de fallos | Paquetes completos offline y mapas descargados |

No hay pagos ni reservas en este piloto. PostGIS y pgvector pertenecen a la evolución de arquitectura: se documentará dónde encajan, pero no son necesarios para ordenar una ruta fija ni para recomendar mediante reglas. Si se necesitan búsquedas espaciales reales, activar PostGIS antes de implementarlas; si existe un caso validado de búsqueda semántica, incorporar pgvector con su evaluación.

## 2. Cómo trabajar los cuatro

| Participante | Responsabilidad | Entregable |
|---|---|---|
| Ana | Criterio turístico, narrativa y validación cultural | Ruta, paradas, textos, fuentes y aprobación editorial |
| Cristina | Experiencia móvil y coordinación funcional | Pantallas, navegación, contenidos cargados y pruebas de uso |
| Antonio | Arquitectura, Django, API e integración | Modelo, backend, despliegue y decisiones técnicas |
| ChatGPT Work | Convertir ideas en requisitos, revisar coherencia y documentación | Historias, criterios de aceptación, revisión de guiones y resultados |
| Codex | Implementar tareas concretas y verificarlas en el repositorio | Código, migraciones, pruebas y cambios revisables |

Estas son responsabilidades, no barreras: Cristina también puede aprender backend y Antonio revisar interfaz. Evitar que dos personas o sesiones modifiquen la misma rama sin coordinación.

**Fuente de verdad:** un repositorio privado con código y documentación. Work y Codex no comparten automáticamente todos los archivos, conversaciones o decisiones. Al cambiar de herramienta, adjuntar la guía, indicar el commit/rama y aportar el estado actual. No asumir que una conversación anterior está disponible.

En cada sesión:

1. Elegir una tarea del tablero.
2. Leer `docs/STATE.md` y el contrato afectado.
3. Crear una rama de trabajo.
4. Implementar y ejecutar las verificaciones de esa tarea.
5. Revisar el resultado en la app o el editor.
6. Actualizar documentación y registrar el commit/PR.

## 3. Requisitos existentes: el Excel de rutas

Se ha leído el contenido actual de **Filtros_rutas.xlsx**. `Hoja1` contiene 30 entradas de ruta y seis columnas; `Hoja2` y `Hoja3` están vacías. El Excel es un catálogo editorial, no una especificación completa de paradas, audios o recorridos.

| Columna real | Representación en HispaGo | Regla |
|---|---|---|
| RUTA | Título y código estable de ruta | Un título no identifica por sí solo una ruta |
| HORARIO | `day`, `night`, `both` | Normalizar DÍA/DIA y los espacios |
| PÚBLICO | Relación con públicos | GENERAL se conserva; otros públicos son nuevos datos |
| CATEGORÍA | Relación con categorías | Normalizar ÓPERA/OPERA; preservar combinaciones |
| UBICACIÓN | Relación con zonas | Una ruta puede recorrer varias zonas |
| ESTADO | `editorial_status` | FINALIZADO no significa publicado ni verificado técnicamente |

Ejemplos reales: Fígaro figura FINALIZADO, El barbero de Sevilla EN PROCESO y Carmen PENDIENTE. Hay dos entradas FLAMENCO, una en Triana y otra en Alameda de Hércules: deben conservarse como rutas diferentes con códigos distintos.

Crear una tabla de normalización revisable en `docs/content/taxonomy.md`: CASCO HISTORICO/CASCO HISTÓRICO → Casco histórico; DIA/NOCHE y sus variaciones → ambos. `OTRAS UBICACIONES` necesita revisión, no una coordenada inventada. Categorías como HISTORIA/ARTE se pueden mapear a dos etiquetas con aprobación editorial; conservar siempre el texto original importado.

**Datos que faltan y hay que recopilar:** duración, distancia del recorrido peatonal, orden de paradas, coordenadas verificadas, accesibilidad, horarios de acceso a interiores, coste si hay entradas externas, idiomas, guiones, licencias, dinámicas y geometría del recorrido. El importador crea borradores con esos campos pendientes; jamás los completa por adivinación.

## 4. Arquitectura y herramientas

La app móvil consulta la API Django. Django Admin permite mantener el contenido. PostgreSQL guarda los datos y un almacenamiento de objetos conserva imágenes y audios. Los guiones y audios se preparan antes de publicar: escuchar no depende de un servicio de IA disponible en ese momento.

| Componente | Elección | Motivo |
|---|---|---|
| Backend | Python 3.13 + Django 5.2 LTS | Base estable; instalar el último parche de la rama 5.2 |
| API | Django REST Framework | Serializadores, permisos y pruebas |
| Base de datos | PostgreSQL 17 local con Docker | Reproducible; usar versión compatible en hosting |
| Editor | Django Admin con formularios e inlines propios | Crear contenido sin código |
| Móvil | React Native + Expo + TypeScript | Prioridad Android, base compartida para iOS |
| Audio | `expo-audio` | Reproducción y estado del reproductor |
| Ubicación | `expo-location`, API estable del SDK elegido | Permisos y posición en primer plano |
| Mapa | `react-native-maps` | Marcadores y polilínea; configurar Google Maps Android |
| Progreso | AsyncStorage | Persistencia local de visitante |
| Archivos cloud | S3 compatible mediante `django-storages` | Media persistente independiente del servidor |
| Hosting piloto | Render o servicio equivalente compatible | Django, PostgreSQL y HTTPS |
| Colaboración | GitHub privado + tablero + PR | Historial compartido |

**Versiones:** los enlaces `latest` de Expo cambian. Inicializar una vez, registrar en `docs/versions.md` el SDK generado, Node, Python, Django, PostgreSQL y fecha. Mantener `package-lock.json` y un `requirements.txt` congelado. En los siguientes equipos instalar desde esos archivos, no crear otra app con un SDK distinto. No instalar versiones alpha para esta V1.

## 5. Descargas e instalación

Ruta principal: Windows 10/11 con PowerShell, Docker Desktop y Android físico. Si usáis macOS/Linux, las diferencias de terminal se indican debajo. No hace falta instalar Android Studio para el camino de compilación cloud con EAS; sí lo necesitaréis si decidís usar emulador o compilar localmente.

### Paso 5.1 · Instalar las herramientas

1. **Git:** https://git-scm.com/downloads. En Windows mantener Git disponible en la terminal y usar las opciones por defecto salvo política del equipo.
2. **VS Code:** https://code.visualstudio.com/download. Instalar extensiones Python, Pylance y soporte de TypeScript; Docker es opcional.
3. **Python:** https://www.python.org/downloads/. Instalar Python 3.13 con el parche disponible. En Windows habilitar PATH si lo ofrece el instalador y comprobar `py -3.13`.
4. **Node.js:** https://nodejs.org/en/download. Instalar una LTS soportada por el SDK Expo elegido; no mezclar distintas mayores entre equipos.
5. **Docker Desktop:** https://docs.docker.com/desktop/setup/install/windows-install/. Seguir el asistente WSL2, activar virtualización si lo requiere, reiniciar y arrancar Docker Desktop. Linux puede usar Docker Engine con Compose; macOS usa Docker Desktop.
6. Crear o usar cuentas de GitHub y Expo. El hosting y Google Cloud se configuran en las fases correspondientes.
7. En Android instalar **Expo Go** desde la tienda para la primera prueba. La demo final usará un APK propio.

Desde una terminal nueva:

```powershell
git --version
py -3.13 --version
node --version
npm --version
docker --version
docker compose version
```

**Resultado:** todos muestran su versión. Si un comando no existe, resolver PATH o instalación antes de continuar. No pegar comandos de Linux en PowerShell sin adaptar la sintaxis.

### Paso 5.2 · Identidad y repositorio

```powershell
git config --global user.name "TU NOMBRE"
git config --global user.email "TU EMAIL DE GIT"
mkdir HispaGo
cd HispaGo
git init -b main
mkdir backend
mkdir docs
```

Crear un repositorio privado vacío en GitHub, sin README si ya se inició localmente. Añadir después el remoto con la URL real del repositorio. Cada persona trabaja con su cuenta. Los certificados de firma, contraseñas y claves cloud no van al repositorio.

Estructura prevista:

```text
HispaGo/
  backend/            Django, API, editor y pruebas
  mobile/             Expo, pantallas y pruebas
  docs/
    STATE.md          estado, bloqueos y próximo paso
    versions.md       versiones exactas utilizadas
    api.md            contrato y ejemplos
    decisions/        decisiones relevantes
    content/          taxonomía, plantilla y checklist editorial
    qa/               pruebas y resultado de la demo
  compose.yaml
  .gitignore
  AGENTS.md
  README.md
```

Crear `.gitignore` antes del primer commit:

```gitignore
.env
.env.*
!.env.example
.venv/
__pycache__/
*.py[cod]
backend/media/
backend/staticfiles/
*.sqlite3
node_modules/
.expo/
*.jks
*.keystore
credentials.json
*.apk
*.aab
```

Las migraciones sí se versionan. Los binarios originales de música y audios se conservan fuera de Git, con un inventario de referencias y derechos.

## 6. Arrancar PostgreSQL y Django

Los siguientes fragmentos levantan la base del proyecto; las funciones de producto se implementan en los hitos posteriores. No son una app completa para copiar y dar por terminada.

### Paso 6.1 · Base de datos local

Crear `compose.yaml` en la raíz:

```yaml
services:
  db:
    image: postgres:17
    environment:
      POSTGRES_DB: hispago
      POSTGRES_USER: hispago
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - "127.0.0.1:5432:5432"
    volumes:
      - hispago_pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U hispago -d hispago"]
      interval: 5s
      timeout: 5s
      retries: 10
volumes:
  hispago_pgdata:
```

Crear `.env` raíz con `POSTGRES_PASSWORD=` y una contraseña local elegida. Crear `.env.example` con el nombre y un valor de ejemplo. No usar la contraseña local en cloud.

```powershell
docker compose up -d
docker compose ps
```

**Resultado:** `db` aparece saludable. Si 5432 está ocupado, cambiar el puerto publicado a `127.0.0.1:5433:5432` y usar 5433 en la URL Django. `docker compose down` detiene servicios conservando el volumen; `down -v` borra la base local y no debe usarse como solución rutinaria.

### Paso 6.2 · Entorno Python

Desde `HispaGo/backend`:

```powershell
py -3.13 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install "Django>=5.2,<5.3" djangorestframework django-environ "psycopg[binary]" Pillow django-cors-headers whitenoise gunicorn django-storages boto3 openpyxl drf-spectacular
python -m pip freeze > requirements.txt
python -m django startproject config .
python manage.py startapp catalog
python manage.py startapp experiences
python manage.py startapp media_assets
```

PowerShell puede bloquear la activación. Como alternativa sin modificar políticas, ejecutar directamente `.\.venv\Scripts\python.exe` en lugar de `python` y omitir la activación. En macOS/Linux: `python3.13 -m venv .venv`, `source .venv/bin/activate` y después los mismos comandos Python. Gunicorn se utilizará en Linux cloud; en Windows local usar `runserver`.

Crear `backend/.env`:

```dotenv
DJANGO_DEBUG=True
DJANGO_SECRET_KEY=REEMPLAZAR_POR_UN_VALOR_ALEATORIO
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=postgresql://hispago:CONTRASENA_LOCAL@127.0.0.1:5432/hispago
CORS_ALLOWED_ORIGINS=http://localhost:8081
```

Si la contraseña contiene símbolos reservados de URL, codificarlos para la URL o definir parámetros separados de conexión. Generar la clave y copiarla únicamente al `.env`:

```powershell
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Crear también `backend/.env.example` con valores de ejemplo. Ninguna clave real debe aparecer en capturas compartidas.

### Paso 6.3 · Ajustes Django

En `config/settings.py`, conservar los bloques creados por Django y aplicar:

```python
import environ

env = environ.Env(DJANGO_DEBUG=(bool, False))
environ.Env.read_env(BASE_DIR / ".env")
SECRET_KEY = env("DJANGO_SECRET_KEY")
DEBUG = env("DJANGO_DEBUG")
ALLOWED_HOSTS = env.list("DJANGO_ALLOWED_HOSTS")
DATABASES = {"default": env.db("DATABASE_URL")}

INSTALLED_APPS += [
    "rest_framework", "corsheaders", "drf_spectacular",
    "catalog", "experiences", "media_assets",
]
MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")
MIDDLEWARE.insert(2, "corsheaders.middleware.CorsMiddleware")
CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS", default=[])
LANGUAGE_CODE = "es-es"
TIME_ZONE = "Europe/Madrid"
USE_TZ = True
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 20,
}
```

La API pública de lectura sobrescribirá el permiso con `AllowAny` y filtrará exclusivamente versiones publicadas. La escritura editorial se hace desde Admin con sesión y CSRF. No dejar un ModelViewSet CRUD abierto porque el catálogo sea público. CORS afecta al navegador; la app nativa no lo necesita para llamar al backend.

En `config/urls.py`, conservar `admin/` y añadir media solo para desarrollo:

```python
from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

```powershell
python manage.py migrate
python manage.py createsuperuser
python manage.py check
python manage.py runserver
```

Abrir `http://127.0.0.1:8000/admin/`. Crear usuarios editoriales individuales con permisos limitados; la cuenta superusuario es de administración, no la cuenta diaria de Cristina o Ana. Cambiar los títulos del Admin a HispaGo.

**Resultado del hito:** base persistente, Admin accesible y ninguna clave versionada. La migración inicial todavía no contiene las entidades de producto: se crean en el hito de modelos.

## 7. Modelo de contenidos: añadir rutas sin tocar código

Implementar modelos y migraciones antes de diseñar pantallas definitivas. La ruta es un contenedor editorial; sus paradas son ordenadas y apuntan a lugares reutilizables.

| Entidad | Campos mínimos y propósito |
|---|---|
| Route | UUID/código estable, slug, título, resumen, descripción, portada, horario, públicos, categorías, zonas, estado editorial y versión pública actual |
| RouteVersion | Número de versión, duración, distancia, recomendaciones, geometría y datos editoriales de esa versión |
| POI | Código, nombre, dirección, latitud, longitud, información de acceso y fuentes del lugar |
| Stop | Ruta/versión, POI, orden, título contextual, indicaciones, radio sugerido, tiempo estimado |
| Story | Parada, idioma, texto, tipo histórico/leyenda/ficción, fuentes, estado de revisión y versión |
| AudioAsset | Archivo, historia/versión, idioma, duración, formato, narrador/preset, licencia, créditos, estado y checksum |
| Mission | Parada, tipo, enunciado, pista, feedback, XP, obligatoriedad y configuración validada |
| MissionOption | Orden, texto y corrección o consecuencia para quiz/decisión |
| Category / Audience / Zone | Etiquetas editables, códigos estables y nombres de presentación |

Coordenadas: `DecimalField` con al menos seis decimales y validación de latitud −90..90 y longitud −180..180. Representación GeoJSON: **[longitud, latitud]**; los componentes móviles usan normalmente objetos `latitude`/`longitude`. Esta diferencia merece una prueba específica.

Restricciones de base: código de ruta único, slug único, `(route_version, order)` único para paradas, XP no negativo y una sola narración principal aprobada por historia/idioma/versión. Reordenar paradas en una transacción para evitar colisiones temporales. No borrar un POI utilizado por una versión publicada.

### Publicación y versiones

Usar estados `draft → review → published → archived`. El estado editorial importado es independiente. Un botón **Validar publicación** muestra los errores; **Publicar nueva versión** crea una instantánea inmutable, incluyendo datos de lugares, textos, dinámicas y referencias a archivos inmutables. Las modificaciones posteriores afectan al borrador.

Una sesión móvil guarda `route_id` y `route_version`. Mientras esté en curso utiliza la misma instantánea. Mantener accesibles las versiones anteriormente publicadas que puedan tener sesiones activas. Nunca sobrescribir el archivo de un audio publicado: crear otro asset y publicar otra versión. Esta regla evita que Ana esté en la parada 3 de una ruta que haya cambiado por debajo.

### Editor que debe implementar Codex

1. Vista de rutas con búsqueda por título/código y filtros de estado/categoría/zona.
2. Formulario de ruta separado en Información, Experiencia, Recorrido, Media y Publicación.
3. Paradas como inline con orden y enlaces a editar historia y dinámicas.
4. Selector de POI existente y alta de POI con coordenadas.
5. Formularios propios para quiz, observación y decisión; evitar obligar a Ana a escribir JSON.
6. Transcripción visible junto al audio y un reproductor de preescucha.
7. Acciones Duplicar borrador, Validar y Publicar versión, con confirmación de los cambios.
8. Historial de quién publicó y cuándo. Edición simultánea: rechazar guardar si cambió la revisión desde que se abrió el formulario, o mostrar un conflicto recuperable.

No hace falta un CMS aparte. Sí hace falta cuidar el Admin: un formulario con cuarenta campos sin explicación no cumple el objetivo de facilidad.

### Añadir una ruta: procedimiento editorial

1. Crear borrador y elegir código estable, por ejemplo `figaro-sevilla`.
2. Añadir portada, resumen, etiquetas y horario recomendado.
3. Introducir duración y distancia revisadas: caminar entre paradas más escuchar y hacer retos.
4. Crear o reutilizar lugares con coordenadas verificadas.
5. Añadir las paradas y ordenar el recorrido.
6. Pegar relatos y marcar si describen historia documentada, leyenda o escena imaginada.
7. Subir narraciones y registrar créditos/licencia.
8. Añadir dinámicas con los formularios.
9. Previsualizar, validar, corregir errores y enviar a revisión editorial.
10. Publicar; refrescar el catálogo móvil y probar desde otra instalación.

**Prueba clave:** Cristina debe poder añadir una parada con texto, audio y quiz sin abrir VS Code ni pedir a Antonio una migración.

## 8. Importar el Excel sin perder significado

Construir un comando `import_routes_excel` con `--dry-run` y `--apply`. Son comandos de proyecto que Codex tiene que implementar; no existen en Django por defecto.

```powershell
python manage.py import_routes_excel "RUTA_AL_EXCEL" --dry-run
python manage.py import_routes_excel "RUTA_AL_EXCEL" --apply
```

Reglas:

- Leer únicamente filas con título en Hoja1; comprobar las seis cabeceras.
- Conservar valores originales en el registro de importación y aplicar la tabla de normalización.
- Crear 30 borradores; no publicar ninguno automáticamente.
- Dar códigos distintos a los dos FLAMENCO usando su zona, con revisión de posibles colisiones.
- Generar un informe de categorías desconocidas, campos pendientes y acciones realizadas.
- Conservar un manifiesto de IDs de origen. El Excel no tiene clave estable: en la primera importación asignar `source_id` en un manifiesto revisado; no deduplicar solo por título ni por número de fila en futuras hojas reordenadas.
- Segunda ejecución con el mismo origen: no duplicar; cambios ambiguos se presentan para revisión. No pisar silenciosamente contenido enriquecido en el Admin.

No confundir HORARIO con horario de apertura de un monumento, ni UBICACIÓN con ruta GPS.

## 9. API: contrato antes de conectar pantallas

Crear `docs/api.md` y esquema OpenAPI. Usar `/api/v1/`, IDs estables, errores uniformes y URLs de media absolutas. La lista se pagina; el móvil debe leer `results` y `next`.

| Método y ruta | Comportamiento |
|---|---|
| GET `/health/` | Estado simple sin secretos; chequeo operativo de base según configuración |
| GET `/api/v1/taxonomy/` | Categorías, zonas, públicos y horarios |
| GET `/api/v1/routes/` | Catálogo de versiones publicadas y filtros |
| GET `/api/v1/routes/{slug}/` | Detalle de versión pública actual |
| GET `/api/v1/routes/{slug}/versions/{version}/` | Instantánea de una versión publicada concreta |
| GET `/api/v1/routes/{slug}/versions/{version}/experience/` | Paradas, historias, dinámicas y referencias de media de esa versión |
| GET `/api/schema/` | Contrato OpenAPI para desarrollo |

Filtros de V1: `category`, `zone`, `audience`, `schedule`, `max_minutes`, `search`. Los slugs/códigos son valores del contrato; las etiquetas mostradas al usuario pueden cambiar. Ejemplo: `?schedule=night&max_minutes=90` incluye rutas nocturnas y de ambos horarios que quepan en 90 minutos.

Semántica: varios valores de una misma faceta se combinan con OR y las distintas facetas con AND. Rechazar parámetros inválidos con 400 y mensaje claro. No devolver resultados vacíos por un error de escritura sin avisar. No devolver borradores mediante IDs directos: 404 también en los endpoints de detalle y versiones.

Ejemplo orientativo de detalle:

```json
{
  "id": "UUID",
  "slug": "figaro-sevilla",
  "version": 1,
  "title": "Las bodas de Fígaro",
  "estimated_minutes": 75,
  "distance_meters": 1800,
  "schedule": "night",
  "categories": [{"code": "opera", "name": "Ópera"}],
  "start": {"latitude": 37.0, "longitude": -5.0},
  "stops_count": 5,
  "audio_available": true
}
```

Los números y coordenadas del ejemplo **no son datos de la ruta real**. No deben cargarse en el contenido publicado.

Para el visitante, el progreso es local; no crear endpoints de usuario ni tokens para simular seguridad. El APK contiene material público y las respuestas de dinámicas pueden inspeccionarse: XP es entretenimiento local, no un sistema antifraude. Si más adelante se crean cuentas/recompensas, validar respuestas y XP en backend, filtrar por propietario y usar autenticación móvil apropiada con almacenamiento seguro.

### Personalización sencilla

Solicitar tiempo disponible, intereses y compañía con opciones definidas editorialmente. Primero filtrar rutas viables y después puntuar por coincidencias de etiquetas y cercanía al inicio si hay permiso de ubicación. Explicar: “Te la proponemos por tu interés en ópera y porque encaja en 90 minutos”. No llamar IA a estas reglas.

Clima V1: mostrar recomendaciones estáticas de cada ruta, como “evitar horas de calor”. Una integración meteorológica en vivo queda fuera del piloto; añadirla requiere proveedor, error/frescura, claves backend y criterios de adecuación revisados. No afirmar “accesible” o “apta para niños” sin datos validados.

## 10. App móvil: instalación y conexión

### Paso 10.1 · Crear Expo

Desde la raíz de HispaGo:

```powershell
npx create-expo-app@latest mobile
cd mobile
npx expo install expo-location expo-audio react-native-maps @react-native-async-storage/async-storage
npx expo-doctor
```

Usar TypeScript y la navegación Expo Router del proyecto generado. Conservar su estructura real (`app/` o `src/app/` según la plantilla), sin mezclar dos raíces de navegación. Registrar el SDK y la versión de Node antes del primer commit. Las dependencias nativas se instalan con `expo install` para respetar compatibilidad.

Primer arranque:

```powershell
npx expo start
```

Escanear el QR desde Expo Go con móvil y ordenador en la misma red. Si el SDK no coincide con Expo Go instalado, seguir la matriz compatible o pasar a development build; no resolverlo instalando dependencias al azar.

### Paso 10.2 · Conectar al backend desde el teléfono

`localhost` en el móvil es el móvil, no el ordenador. Obtener la IP LAN del ordenador con `ipconfig`; en macOS/Linux consultarla en ajustes de red. Ejemplo ilustrativo: `192.168.1.50`.

1. En `backend/.env` añadir esa IP a `DJANGO_ALLOWED_HOSTS`.
2. Ejecutar desde backend: `python manage.py runserver 0.0.0.0:8000`.
3. Permitir Python/puerto 8000 únicamente en la red privada local si el firewall lo bloquea.
4. En `mobile/.env` poner `EXPO_PUBLIC_API_URL=http://192.168.1.50:8000/api/v1` con la IP real.
5. Reiniciar Expo tras cambiar el entorno.
6. Abrir `http://IP_REAL:8000/health/` en el navegador del teléfono cuando el endpoint esté implementado.

`EXPO_PUBLIC_` significa visible dentro del paquete de la app. Solo URLs/configuración pública; jamás claves de TTS, Django o S3. Usar HTTP solo en desarrollo LAN si la build lo permite. La preview final usa HTTPS; las restricciones de tráfico HTTP nativo pueden bloquear una build propia aunque Expo Go funcionase.

Un túnel de Expo lleva el bundle JavaScript, no expone automáticamente el backend Django. No abrir puertos del router doméstico para la demo.

### Paso 10.3 · Pantallas y comportamiento

| Pantalla | Elementos y resultado esperado |
|---|---|
| Bienvenida | Identidad HispaGo, promesa corta, entrar como visitante |
| Explorar | Portadas, duración, categorías, filtros y estados de carga/error/vacío |
| Detalle | Historia de la experiencia, datos prácticos, inicio, créditos y CTA |
| Ruta en curso | Mapa, lista ordenada, parada actual, progreso y continuar |
| Parada | Relato, tipo de narrativa, audio, indicaciones y dinámica |
| Dinámica | Enunciado, opciones/pista, feedback y XP |
| Final | Cierre narrativo, progreso completado y resumen |
| Mi recorrido | Continuar, reiniciar con confirmación y explicar almacenamiento local |

Diseño inicial propuesto, no decisión cerrada de marca: tonos cálidos de Sevilla, azul profundo, acento dorado, portadas culturales y tipografía legible. Evitar que parezca un listado administrativo. Botones de al menos 44–48 puntos, contraste suficiente, escalado de texto y etiquetas para lectores de pantalla. No expresar estados solo por color.

Componentes reutilizables: tarjeta de ruta, selector de filtros, tarjeta de parada, reproductor global, bloque de relato, renderer de dinámica, contador de progreso y panel de error con reintento.

Crear cliente API central con timeout, tratamiento de 400/404/500 y cancelación al abandonar pantalla. Evitar peticiones duplicadas al renderizar y no consultar el backend cada segundo mientras se escucha un audio.

## 11. Mapa, recorrido y ubicación

### Configurar el mapa Android

1. Crear un proyecto Google Cloud específico de HispaGo.
2. Habilitar Maps SDK for Android y configurar facturación si el proveedor la requiere.
3. Fijar el identificador Android, por ejemplo `com.hispago.app`, antes de generar builds.
4. Crear una clave restringida a Maps SDK for Android y al package + SHA-1 de firma de cada build utilizada. Los fingerprints de desarrollo y preview pueden ser distintos.
5. Añadir la configuración mediante el plugin `react-native-maps` que corresponda al SDK y versión instalados. Consultar su documentación versionada; las propiedades del plugin pueden variar.
6. Generar una build nueva cuando cambie la configuración nativa. Una clave de mapa restringida es configuración cliente; las credenciales privadas de servidor nunca van ahí.
7. Comprobar el mapa en el APK propio. Que aparezca en Expo Go no demuestra que la firma y clave de HispaGo estén bien configuradas.

Guardar una geometría peatonal verificada para la ruta. **No usar una línea recta entre marcadores como indicación de camino transitable.** Si todavía no hay geometría, mostrar marcadores y lista; para llegar a la siguiente parada abrir navegación peatonal externa mediante enlace. No implementar cálculo de rutas viarias en la primera semana.

### Ubicación de primer plano

Solicitar permiso cuando el usuario pulsa “Ver mi ubicación”, con explicación breve. Si lo deniega, el mapa, la lista y la ruta manual siguen funcionando. No pedir ubicación permanente ni background para V1.

Proximidad: calcular distancia al POI y considerar la precisión reportada. Radio inicial sugerido de 60 m ajustable por parada; si la precisión es mala, no desbloquear con falsa certeza. Mostrar “Estás cerca” y ofrecer abrir parada; no reproducir audio de golpe ni marcar un quiz como completado por llegar.

Detener watchers al salir de la ruta o pasar a background. La V1 no promete avisos GPS con la pantalla apagada. Separar detección de proximidad del estado de visita y de misión completada.

**Modo demo:** permite avanzar manualmente y simular llegada sin estar físicamente en Sevilla. Etiquetarlo claramente; nunca modificar las coordenadas reales ni usar la simulación en la validación de campo. La geolocalización real se prueba caminando.

## 12. Audio: buena voz y carga sencilla

El requisito creativo recuperado es una voz masculina adulta, andaluza natural —preferentemente sevillana/occidental—, potente, cálida, misteriosa y con temple. El acento no se resuelve escribiendo “andaluz” en un prompt: el motor y la voz tienen que ser capaces de producirlo.

### Paso 12.1 · Validar una muestra antes de producir todo

1. Ana revisa un fragmento de 60–90 segundos de “La Casa de Fígaro”.
2. Elegir motores/voces que permitan el uso previsto; comprobar idioma, acento, control expresivo y derechos. No asumir que Codex o Work tienen un generador de voz instalado.
3. Producir hasta tres variantes comparables con el mismo texto y volumen percibido similar.
4. Escuchar en teléfono y auriculares. Ana puntúa naturalidad, claridad, acento, emoción y coherencia con HispaGo.
5. Elegir una variante y registrar `HISPAGO_NARRATOR_V1`: proveedor/modelo/voz/versiones, parámetros, pronunciaciones y ejemplo aprobado.
6. Si ninguna sirve, revisar la voz o grabar un narrador; no multiplicar una muestra que no gusta.

La app admite audio grabado o sintetizado. El pipeline TTS es un adaptador opcional: toma guion aprobado y genera un archivo revisable. No llama al motor en cada reproducción. Un audio generado permanece en estado pendiente hasta escucharlo y aprobarlo.

### Paso 12.2 · Organización y derechos

Nomenclatura sugerida: `figaro__p01__es-ES__narration__v001.mp3`. Guardar el master, el archivo usado en app, el guion y el preset. Registrar autoría, URL de origen si aplica, licencia exacta, atribución y restricciones.

Los originales de música descargados de Wikimedia Commons se conservan en FLAC/OGG, sin reemplazarlos ni convertirlos automáticamente, respetando la preferencia previa. Una composición antigua de dominio público no implica que cualquier grabación sea libre. Cada grabación requiere revisión de derechos. No asumir que todos los FLAC/OGG se reproducirán igual en todas las builds: probar el archivo real en Android. Si se necesita una copia de distribución distinta, tratarla como una decisión explícita, conservando el original y sin modificarlo por defecto.

Narraciones nuevas: preferir un formato de distribución probado en el dispositivo, como MP3; conservar también el master cuando exista. La música ambiental es opcional para V1. Si se añade, probar balance y reducción de volumen al hablar; nunca dejarla tapar la voz.

### Paso 12.3 · Subir, reproducir y versionar

1. Editor abre la historia aprobada y sube su archivo en AudioAsset.
2. Sistema valida tamaño, tipo real y extensión permitida; el límite se define en configuración.
3. Introducir duración y créditos; preescuchar y aprobar.
4. Publicación comprueba que audio y texto corresponden a la misma versión.
5. App muestra play/pausa, progreso, buscar posición, reintentar y transcripción.

Un solo reproductor global evita dos voces simultáneas. Al cambiar de parada parar el anterior. Guardar el punto de escucha de forma moderada, por ejemplo cada cinco segundos y al pausar; restaurarlo al volver. Si falla la descarga, permitir leer y reintentar. Usar URLs HTTPS, MIME correcto y soporte HTTP Range en almacenamiento/CDN.

Configurar `expo-audio` conforme al SDK elegido. Probar llamadas, desconexión de auriculares y pausa de otra app. La reproducción con pantalla bloqueada es deseable si se configura y verifica en build nativa; no marcarla como hecha por probar solo en Expo Go. Su configuración nativa y controles deben documentarse, o el piloto debe declarar que requiere primer plano.

## 13. Dinámicas y progreso

Las dinámicas son contenido tipado. Añadir otra instancia de un tipo existente no necesita código; crear un tipo nuevo sí requiere renderer, validación y pruebas.

| Tipo V1 | Qué edita Ana | Qué hace el móvil |
|---|---|---|
| Quiz | Pregunta, 2–4 opciones, correcta, pista y explicación | Evalúa, muestra feedback y concede XP una vez |
| Observación | Qué buscar, pista y confirmación | Usuario confirma tras observar; no pedir foto en V1 |
| Decisión narrativa | Opciones y consecuencia literaria de cada una | Muestra consecuencia; sin ramas geográficas nuevas |

Ejemplo ficticio para probar el sistema: “¿Qué conflicto mueve esta escena: amor, poder o ambos?”. No publicarlo como parte de Fígaro sin aprobación de Ana.

Reglas de estado:

1. Ruta `not_started → in_progress → completed`.
2. Visitar una parada no equivale a escucharla ni completar su misión.
3. Permitir continuar sin terminar el audio; no obligar a escuchar el 100 %.
4. La ruta termina cuando se confirman sus paradas y se resuelven las dinámicas obligatorias. Las opcionales no bloquean.
5. Un error en quiz permite reintentar y usar pista; definir si resta XP. Para el piloto, propuesta: sin penalización, XP solo en la primera finalización.
6. Repetir pulsaciones, volver atrás o reiniciar la app no duplica XP.

Persistir en AsyncStorage un objeto versionado: `storage_schema_version`, `route_id`, `route_version`, parada actual, estados de paradas, IDs de misiones completadas y posición de audio. Guardar inmediatamente los cambios significativos. Implementar migración o recuperación segura si cambia el esquema; un JSON corrupto no debe bloquear la app.

Separar contenido cacheado de progreso. En esta V1 desinstalar o borrar datos pierde el progreso y cambiar de móvil no lo transfiere; comunicarlo en Mi recorrido. No pedir nombre/email si no se utilizan. Conservar solo lo necesario y no enviar histórico de GPS.

## 14. Publicar el piloto en un entorno estable

La presentación a Ana no debe depender del ordenador de Antonio encendido. Usar API HTTPS pública con contenido piloto publicado, base persistente y media persistente.

### Paso 14.1 · Preparar código y archivos

Crear rama y PR. Añadir tests y ejecutar `python manage.py check`, `python manage.py test`, `npx tsc --noEmit` y `npx expo-doctor`. Si la plantilla incorpora lint, ejecutarlo. Congelar dependencias. Añadir `README` con instrucciones de clonación:

```powershell
git clone URL_REAL_DEL_REPOSITORIO
cd HispaGo
docker compose up -d
```

Después, cada equipo crea sus `.env` desde los ejemplos, instala backend con `python -m pip install -r requirements.txt`, ejecuta migraciones y móvil con `npm ci`. El `.env` raíz debe existir antes de arrancar la base.

### Paso 14.2 · Media cloud

Elegir un bucket S3 compatible. Registrar proveedor, región, endpoint si lo requiere y política de acceso. Configurar `django-storages` con backend S3, secretos por variables del hosting y URLs HTTPS. Para el piloto se puede servir únicamente contenido publicado bajo prefijo público; los borradores quedan privados. Django debe emitir las URLs públicas solo desde las versiones publicadas y usar previsualización editorial autenticada para media de borrador.

Configurar `STORAGES` en producción con `storages.backends.s3.S3Storage` para media y `whitenoise.storage.CompressedManifestStaticFilesStorage` para estáticos. Mantener filesystem local para desarrollo. WhiteNoise no es el almacenamiento de audios subidos.

Crear política y credencial restringida al bucket/prefijos necesarios. Definir límite de subida, CORS del bucket si existe cliente web y soporte Range. No subir borradores a una URL pública adivinable. Copiar los audios/imágenes locales al bucket mediante una tarea documentada antes de publicar las rutas; una fila de base de datos no copia por sí sola el archivo.

### Paso 14.3 · Django en Render

1. Conectar el repositorio privado al hosting.
2. Crear PostgreSQL con versión compatible; guardar su URL interna en variables del servicio.
3. Crear Web Service Python con Root Directory `backend`.
4. Build Command: `pip install -r requirements.txt && python manage.py collectstatic --noinput`.
5. Ejecutar `python manage.py migrate --noinput` en pre-deploy si el plan lo permite; de lo contrario mediante tarea/shell documentada antes de dirigir tráfico. No lanzar migraciones desde cada worker web.
6. Start Command: `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT`.
7. Configurar `DJANGO_DEBUG=False`, clave aleatoria propia, hosts reales, URL de base, variables de media y origins web exactos si existen.
8. Configurar health check a `/health/` y verificar logs sin secretos.
9. Crear un administrador mediante shell/tarea segura, nunca una contraseña hardcodeada de arranque.
10. Cargar contenido validado y media, publicar y probar desde móvil por datos móviles.

En settings de producción: configurar cookies de sesión/CSRF seguras, HTTPS, `CSRF_TRUSTED_ORIGINS` con esquemas/hosts precisos y `SECURE_PROXY_SSL_HEADER` solo según el proxy confiable del hosting. Activar redirección HTTPS tras verificar esa cabecera para evitar bucles. Activar HSTS después de confirmar HTTPS; no incluir subdominios que no se controlan.

Ejecutar `python manage.py check --deploy` con configuración de producción y resolver advertencias relevantes. La base y el bucket tienen copias de seguridad; hacer al menos una restauración de prueba. Elegir un plan que conserve los datos y no suspenda el servicio durante la demo, verificando condiciones y precio al contratar. No basar la demo en una promesa de hosting gratis permanente.

## 15. Generar e instalar un APK para Ana

### Paso 15.1 · Development build cuando haga falta

Desde `mobile`:

```powershell
npx expo install expo-dev-client
npx eas-cli@latest login
npx eas-cli@latest build:configure
```

Revisar `app.json` o `app.config.ts`: nombre HispaGo, slug, icono, splash, `android.package`, permisos/plugins de ubicación y mapa. Mantener el `projectId` que configure EAS; no inventarlo. Configurar el texto de permisos según plataforma. Expo Go es solo una herramienta de arranque: probar pronto una build propia para detectar errores de mapa, firma y permisos.

### Paso 15.2 · Preview instalable

Crear o completar `eas.json` respetando lo generado:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {"buildType": "apk"},
      "env": {
        "EXPO_PUBLIC_API_URL": "https://HOST_REAL/api/v1"
      }
    },
    "production": {}
  }
}
```

La preview no tiene `developmentClient=true`: debe funcionar sin Metro ni ordenador. Confirmar configuración del mapa y restricciones de firma para esa build.

```powershell
npx eas-cli@latest build --platform android --profile preview
```

Descargar el APK desde el resultado de EAS y entregarlo por el canal que acordéis. Android puede pedir permiso temporal para instalar desde ese origen. Usar únicamente la build del proyecto; tras instalar, abrir por datos móviles y con el ordenador apagado.

Guardar credenciales de firma de forma segura y documentar quién administra EAS. Compartir acceso por roles, no contraseñas. Para Google Play se generará una build de producción AAB y se completarán sus requisitos; el APK no se sube como sustituto de ese proceso.

## 16. Hitos ejecutables y criterios de salida

No avanzar solo porque el código compile. Cada hito produce un resultado comprobable.

| Hito | Trabajo | Se da por terminado cuando… |
|---|---|---|
| H0 · Base | Herramientas, Git, versiones, Postgres, Django y Expo | Ambos equipos arrancan backend y móvil siguiendo README |
| H1 · Contenido | Modelos, Admin, versiones, importador y validación | Importación repetible y Cristina crea una parada sin código |
| H2 · API | Catálogo, filtros, detalle, experiencia y contrato | Móvil consume datos; borradores/versiones privadas no se filtran |
| H3 · Experiencia | Pantallas, mapa, paradas y progreso | Se recorre una ruta desde inicio hasta cierre y se recupera tras cerrar |
| H4 · Audio/dinámicas | Reproductor, tres tipos y voz | Narración aprobada, controles fiables y XP sin duplicados |
| H5 · Editorial | Fígaro completo, derechos y recorrido | Ana valida guion/localizaciones; no hay placeholders publicados |
| H6 · Entrega | Hosting, media, QA y APK | Funciona con ordenador apagado y datos móviles; paseo probado |

Orden recomendado: desarrollar una primera parada vertical completa al terminar H2 —API, pantalla, audio y una misión— antes de repetir el patrón por todas las paradas. Así detectamos pronto si la experiencia tiene sentido.

### Estimación de planificación

Como estimación de trabajo, no garantía: 90–150 horas conjuntas para piloto cuidado si el contenido llega razonablemente preparado; reservar margen para voz, edición, permisos y pruebas de campo. Con 15–20 horas conjuntas por semana, pensar en unas 6–10 semanas, ajustando tras la primera parada funcional. Si aparecen problemas de derechos o cambia el alcance, rehacer la estimación. Registrar horas reales por hito, no prometer una fecha basándose solo en generación de código.

## 17. Pruebas que importan

### Automatizadas de backend

- Reimportar el Excel no duplica rutas; ambos FLAMENCO permanecen separados.
- FINALIZADO importado no expone la ruta públicamente.
- Catálogo, detalle y versiones ocultan borradores a visitantes.
- Publicación falla si faltan coordenadas, guion, derechos o dinámica válida.
- Versión publicada permanece igual después de editar el borrador.
- Filtros respetan horario ambos, zonas múltiples y límites de duración.
- Coordenadas GeoJSON no se intercambian y errores de parámetros devuelven 400.
- Usuario editorial sin permiso no publica ni modifica contenido protegido.

### Automatizadas de móvil

- Rehidratar una sesión conserva parada/versión/progreso.
- Completar una misión dos veces no duplica XP.
- Progreso corrupto o de esquema anterior se recupera de forma segura.
- Errores de red muestran reintento y mantienen progreso.

El runner móvil se elegirá compatible con el SDK y se documentará en `package.json`; no anunciar `npm test` como válido antes de configurarlo.

### Pruebas manuales en Android real

| Caso | Resultado esperado |
|---|---|
| Primera instalación | Catálogo cargado, sin pantalla de desarrollo |
| Denegar GPS | Ruta usable manualmente y explicación clara |
| GPS impreciso | No confirmar llegada de forma engañosa |
| Audio por datos móviles | Play, pausa y búsqueda funcionan sin duplicación |
| Llamada/auriculares | Interrupción controlada y reanudación segura |
| Pantalla bloqueada | Comportamiento verificado y documentado |
| Red caída a mitad de ruta | Estado conservado, texto cacheado si disponible y reintento |
| Cerrar app y abrir | Sesión recuperada |
| Publicar otra versión | Sesión anterior mantiene su versión; nueva sesión usa la nueva |
| Texto grande | Botones y textos no se cortan |
| Paseo real | Localizaciones, tiempos y caminos coinciden con la realidad |
| Otra instalación | Los cambios publicados aparecen sin recompilar |

La V1 es online: conservar progreso y textos ya cargados no garantiza audios ni mapas sin red. No enseñar un botón “Descargar ruta” hasta implementar paquetes, hashes, límites y pruebas offline completas.

## 18. Checklist editorial de publicación

- [ ] Portada propia o con permiso y créditos.
- [ ] Título/resumen revisados; sin contenido de prueba.
- [ ] Horario recomendado y acceso a interiores separados.
- [ ] Duración realista y distancia peatonal revisada.
- [ ] Todas las coordenadas y el orden comprobados.
- [ ] Geometría peatonal verificada o navegación externa indicada.
- [ ] Historia, leyenda y ficción etiquetadas con honestidad.
- [ ] Relatos y transcripciones aprobados.
- [ ] Audio inteligible y pronunciaciones revisadas.
- [ ] Derechos de cada grabación e imagen registrados.
- [ ] Retos claros, feedback útil y XP configurado.
- [ ] Condiciones de accesibilidad y seguridad descritas sin promesas inventadas.
- [ ] Prueba en móvil y recorrido de campo registrada.

## 19. Prompts para Codex y Work

Usar los prompts por hito. Adjuntar esta guía y dar la ruta real del repositorio. Una orden enorme “haz toda la app” dificulta saber qué funciona y qué se ha inventado.

### Prompt inicial para Codex

```text
Vamos a construir HispaGo siguiendo HispaGo_Guia_Desarrollo_V1.md.
Backend: Django 5.2 LTS/Python 3.13/DRF/PostgreSQL.
Móvil: Expo/React Native/TypeScript, Android primero.
Lee la guía, AGENTS.md y docs/STATE.md antes de modificar.
Inspecciona el repositorio y respeta las versiones ya fijadas.
Implementa solo el hito H0. Si no hay repo, crea la estructura local.
Crea .env.example sin secretos, README reproducible y docs/versions.md.
No inventes contenidos turísticos, coordenadas ni credenciales.
Ejecuta las comprobaciones disponibles y distingue las que no puedas ejecutar.
Entrega cambios revisables y actualiza STATE con próximo paso y bloqueos.
No contrates servicios, publiques en tiendas ni envíes mensajes al equipo.
```

### H1 · Modelos y editor

```text
Implementa H1 de la guía: modelos, restricciones, migraciones, Admin amigable,
formularios por tipo de misión, validación y versiones publicadas inmutables.
El importador de Filtros_rutas.xlsx debe soportar dry-run, aplicar, informe
e idempotencia con manifiesto de origen. Conserva los dos FLAMENCO.
FINALIZADO editorial nunca equivale a publicado.
Añade pruebas de importación, validación, permisos y estabilidad de versiones.
Demuestra cómo Cristina añade ruta/parada/audio/quiz sin editar código.
```

### H2–H4 · Integración progresiva

```text
Implementa el siguiente hito pendiente de STATE, según esta guía y docs/api.md.
Primero entrega una parada vertical: catálogo → detalle → ruta → parada →
audio → quiz → progreso recuperable. Usa datos de prueba claramente separados
y no publicables. Después extiende al resto de pantallas y tipos de dinámica.
Mantén IDs/versiones, permisos públicos de solo lectura y un reproductor global.
Verifica errores, denegación de GPS, progreso y XP idempotente.
Explica qué necesita un dispositivo real o credenciales para comprobarse.
```

### Revisión de Work antes de demo

```text
Revisa HispaGo usando esta guía, STATE, contrato API, reporte de QA y capturas
actuales. No asumas acceso al repositorio si no se adjunta.
Comprueba el recorrido de visitante, facilidad editorial, coherencia narrativa,
licencias registradas, claridad de ficción/historia y límites reales de la V1.
Devuelve bloqueantes, mejoras y preguntas editoriales para Ana con evidencias.
No declares funcionalidades probadas si solo aparece su código.
```

### Reglas de proyecto para AGENTS.md

```text
Lee docs/STATE.md y esta guía antes de trabajar.
Mantén Django 5.2 LTS y el SDK Expo fijado; no actualices mayores sin decisión.
Evita servicios adicionales sin necesidad demostrada.
Todo contenido turístico debe tener procedencia o marcarse como demo no publicada.
Rutas publicadas son instantáneas; media publicada no se sobrescribe.
La API de visitantes es lectura de publicado; no habilites CRUD anónimo.
Secretos fuera de Git y del bundle móvil.
Cada tarea termina con verificación apropiada y STATE actualizado.
No marques pruebas manuales como realizadas por haber pasado tests unitarios.
```

## 20. Presentación a Ana y cierre de V1

Preparar un recorrido de 10–15 minutos: abrir APK, elegir Fígaro, escuchar una parada, resolver un reto, continuar, terminar y mostrar cómo se añade contenido desde Admin. Usar modo demo para la presentación sentada y otro registro para el paseo real.

Preguntas útiles:

1. ¿Se reconoce tu propuesta turística y narrativa?
2. ¿La voz transmite lo que buscabas?
3. ¿Entiendes dónde empezar y qué hacer en cada parada?
4. ¿Las dinámicas enriquecen o interrumpen el paseo?
5. ¿Podrías introducir otra ruta tú misma con estos formularios?
6. ¿Qué cambiarías antes de mostrársela a alguien ajeno al proyecto?

Anotar por separado fallos que bloquean, cambios editoriales y mejoras. No preguntar solo “¿está guay?”: una respuesta amable no valida que el producto sea usable.

**V1 terminada cuando:** APK instalado y autónomo, backend/media persistentes, Fígaro completo aprobado, editor usable sin código, pruebas críticas superadas y limitaciones documentadas. Etiquetar el commit como `v0.1.0-pilot`, guardar build ID/fecha y crear backlog posterior.

## 21. Problemas frecuentes

| Problema | Qué revisar |
|---|---|
| Django no conecta a Postgres | Docker saludable, puerto, DATABASE_URL y contraseña del volumen existente |
| Cambié contraseña de Docker y falla | Cambiar variable no modifica un usuario ya creado en el volumen; actualizar credencial en DB sin borrar datos |
| El móvil no ve la API | IP LAN, misma red, firewall privado, Allowed Hosts y URL de API |
| Expo abre pero API no | El QR/túnel de Expo no expone Django |
| Mapa blanco en APK | SDK Maps, clave, package, SHA-1 de esa firma y nueva build tras cambio nativo |
| Audio 404 tras despliegue | Archivo realmente copiado a bucket, key correcta y permisos/URL HTTPS |
| Audio se duplica | Instancias de reproductor, listeners y limpieza al cambiar parada |
| Django devuelve 403 en Admin | CSRF, host/origen, HTTPS/proxy y cookies; no desactivar protección |
| Publicación cambia ruta en curso | Instantánea/versionado incompletos o media sobrescrita |
| El editor muestra ruta pero app no | Estado publicado, versión activa, filtros y refresco de catálogo |
| Progreso desaparece | Escritura AsyncStorage, claves/versión de esquema o datos borrados |

## 22. Fuentes técnicas y fecha de consulta

Consultadas el 13/10/2026. Usar documentación que coincida con las versiones fijadas. Las instrucciones de proveedor, precios y SDK se revisan de nuevo al ejecutar instalación o contratación.

- Django y ramas soportadas: https://www.djangoproject.com/download/
- Django 5.2: https://docs.djangoproject.com/en/5.2/
- Checklist producción: https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/
- DRF permisos: https://www.django-rest-framework.org/api-guide/permissions/
- DRF autenticación: https://www.django-rest-framework.org/api-guide/authentication/
- Crear Expo: https://docs.expo.dev/get-started/create-a-project/
- Entorno Expo: https://docs.expo.dev/get-started/set-up-your-environment/
- Audio: https://docs.expo.dev/versions/latest/sdk/audio/
- Ubicación: https://docs.expo.dev/versions/latest/sdk/location/
- Mapas: https://docs.expo.dev/versions/latest/sdk/map-view/
- Configuración react-native-maps: https://github.com/react-native-maps/react-native-maps/blob/master/docs/installation.md
- Builds internas: https://docs.expo.dev/build/internal-distribution/
- APK: https://docs.expo.dev/build-reference/apk/
- Django en Render: https://render.com/docs/deploy-django
- Django-storages S3: https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html

Fuente funcional actual: Filtros_rutas.xlsx, Hoja1, leído durante la preparación de esta guía. Las condiciones previas de Android/Expo, narrativa de Sevilla y voz se recuperaron como contexto de proyecto; los nuevos límites y detalles de implementación son propuestas explícitas de esta guía.
