# Arquitectura · Entrega 1

## Sistema existente

```text
App Expo (Android / web)
  └─ Configuración local tipada → componentes → Inicio, Rutas, detalle y estado de parada

Backend Django
  ├─ GET /health/ → SELECT 1 → PostgreSQL 17
  └─ /admin/ → autenticación de sesión + CSRF → PostgreSQL 17
```

La app y el backend son independientes. La app no simula una API editorial, no publica contenido ni guarda progreso. No se añaden dependencias en la revisión de Plaza de España.

## Backend conservado

- `config/`: settings, URLs, WSGI y ASGI; `core/`: salud y acceso editorial.
- Locks de requisitos con hashes, PostgreSQL en loopback y volumen persistente.
- DRF parte de `IsAuthenticated`; futuras lecturas públicas necesitan `AllowAny` y filtro de versiones publicadas. No hay CRUD de visitantes.
- Media de desarrollo separada de estáticos; WhiteNoise no sirve grabaciones editoriales.
- Sin cambios de datos ni migraciones por cambiar la experiencia protagonista.

## Datos locales y procedencia

- `mobile/src/demo/catalog.ts`: `RoutePreview`, configuración protagonista y backlog. Título completo único, código/slug estable, etiqueta compacta, descripción, enfoque, portada, categoría nullable, estado y muestra con tipo/procedencia.
- `mobile/src/demo/content.ts`: borrador sintético original de Fígaro preservado. No importable como contenido editorial.
- `pilot-preview` es una presentación local, no una publicación; `backlog` queda fuera de búsqueda turística.
- `editorial-pending` reserva el estado de la primera parada, sin texto inventado. `fiction` contiene únicamente la escena de Fígaro. Referencia al AAC no significa archivo disponible ni permiso de publicación.
- `assets/images/`: recursos locales, con [inventario](content/assets.md). Plaza tiene recurso propio; Fígaro conserva los anteriores.
- Las categorías visibles se derivan de clasificaciones revisadas de las propuestas del catálogo. Actualmente ninguna: no se muestran chips temáticos vacíos. Disponibilidad de narración es un eje independiente y da vacío explícito.
- Para añadir una segunda experiencia se añade configuración y una entrada de Router; se reutilizan `RouteDetailScreen` y `StopScreen`, sin sobrescribir identidades.

El registro de la fuente editorial y el protocolo de revisión están en [plaza-de-espana-editorial.md](content/plaza-de-espana-editorial.md). Originales privados fuera de Git y del bundle.

## Pantallas y navegación

| URL | Responsabilidad | Sección inferior |
|---|---|---|
| `/` | Propuesta protagonista y CTA temprano | Inicio |
| `/routes` | Búsqueda y filtros locales, catálogo piloto | Rutas |
| `/routes/plaza-de-espana` | Título completo, propuesta, acceso a estado de primera parada | Rutas |
| `/stops/plaza-de-espana-primera-parada` | Estado del material de Ana, sin reproducción ni relato | Rutas |
| `/routes/figaro-demo` | Borrador siguiente, accesible directamente, no catalogado | Rutas |
| `/stops/patio-demo` | Ficción original y ejemplo desplegable sin evaluación | Rutas |

Se retira la pestaña La propuesta: no tenía finalidad propia fuera del detalle. Cada retorno usa `dismissTo` al padre; si no existe en la pila, lo sustituye. Las pestañas usan `replace`. No se usa volver ciegamente al historial de otro sitio web.

`PreviewSessionProvider` mantiene búsqueda/disponibilidad/categoría y posiciones de scroll **solo en memoria**. El catálogo escribe los filtros en URL para enlaces directos y recarga; normaliza filtros inválidos. Al abrir detalle guarda su contexto para retornar. `Screen` restaura scroll al volver y dirige foco web al encabezado sin moverlo. Una sesión nueva no recupera progreso, porque no existe esa función.

`+html.tsx` conserva nodos y atributos del contexto de Expo Router 58 e idioma español: no retirarlos, pues hidratan los controles. Las fuentes son locales. La ampliación de texto en navegador no sustituye Dynamic Type/TalkBack ni prueba nativa.

## Componentes y estados

Tokens en `src/design/tokens.ts`; UI en `src/components/`, pantallas en `src/screens/`. `Artwork` permite ajustar sin recorte con proporción 3:2; títulos y CTA se sitúan sobre fondo sólido para contraste estable. SVG decorativos usan ARIA en web y accesibilidad nativa específica, nunca `accessible=false` en DOM.

Una explicación de prototipo desplegable sustituye avisos repetidos; los estados locales (fuente no disponible, información práctica sin revisar, ficción) se explican donde afectan la acción. No hay falso reproductor ni mapa ocupando el detalle. `MapPreview`, `PatioArt` y `TileRule` permanecen como componentes históricos sin uso en el piloto; no acreditan funcionalidad.

## Evolución

El único orden vigente es [PLAN_ENTREGAS_V1.md](PLAN_ENTREGAS_V1.md): entrega 2 dominio/editor/API y revisión de fuente; 3 primera parada completa; 4 recorrido definido y ubicaciones; 5 validación editorial/campo; 6 presentación con servicios y APK. Después, Fígaro. PostGIS, pgvector, cuentas, pagos o colas no se necesitan para esta base.
