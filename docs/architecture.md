# Arquitectura · Entrega 1

## Componentes actuales

```text
App Expo (Android / web)
  └─ Demo local tipada → componentes → tres pantallas

Backend Django
  ├─ GET /health/ → SELECT 1 → PostgreSQL 17
  └─ /admin/ → autenticación de sesión + CSRF → PostgreSQL 17
```

La app y el backend son independientes en esta entrega. La conexión al catálogo
se incorporará después; no se simula una API pública con datos turísticos.

## Backend

- `config/`: settings, URLs, WSGI y ASGI.
- `core/`: salud operativa y pruebas de acceso editorial.
- `requirements.in`: límites de dependencias directas.
- `requirements.txt` y `requirements-dev.txt`: resolución congelada y hashes.

Los endpoints DRF futuros parten de `IsAuthenticated`; cada lectura pública
deberá declarar `AllowAny` y filtrar exclusivamente contenido publicado. No hay
CRUD de visitantes. Media local de desarrollo y estáticos tienen rutas separadas;
WhiteNoise no se utiliza para servir audios subidos.

La base se publica solo en loopback. El volumen Docker conserva datos al recrear
el contenedor. No existe todavía configuración de producción, almacenamiento
cloud o estrategia operativa de copias: corresponden a la entrega 6.

## Móvil

- `src/app/`: única raíz de Expo Router y documentos web.
- `src/screens/`: presentación y estado transitorio de filtros/ejemplo.
- `src/components/`: interfaz reutilizable e ilustración original.
- `src/design/`: tokens de color, tipografía y espaciado.
- `src/demo/`: contenido sintético local; no publicable.
- `e2e/`: recorridos reales en navegador sobre la exportación web.

Sin estado persistente, red de catálogo, audio ni permisos nativos en esta entrega.
No se solicitan ubicación ni datos personales. Las fuentes se empaquetan como
archivos locales; no se descargan desde Google al abrir una pantalla.

## Evolución prevista

Entrega 2 añade dominio editorial, publicación inmutable, API y esquema OpenAPI.
Entrega 3 incorpora cliente API, audio global y progreso local versionado.
Entrega 4 añade mapa y ubicación de primer plano. Los módulos nativos se
instalarán con la matriz compatible del SDK fijado, en el hito que los necesite.

PostGIS, pgvector, cuentas, pagos y colas no se necesitan para esta base.
