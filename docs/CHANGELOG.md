# Cambios

## En revisión · 30 de octubre de 2026 · Entrega 1

- Plaza de España · Una historia para mirar despacio pasa a primer piloto por la solicitud de Ana trasladada por Antonio. Título único y código `plaza-de-espana`.
- Inicio con CTA temprano y menor peso de imagen; catálogo sin colecciones vacías, búsqueda/filtro de disponibilidad y limpieza; detalle sin mapa decorativo ni indicadores prácticos vacíos.
- Navegación Inicio/Rutas; detalle y parada pertenecen al catálogo. Contexto de búsqueda y scroll en memoria, URL recargable y foco web.
- Material de la primera parada referenciado, no transcrito ni escuchado: AAC inaccesible. Pantalla explícita sin relato, audio o dinámica inventados.
- Fígaro conserva identidad, textos, imágenes y acceso directo como borrador separado de la prioridad piloto.
- Roadmap único actualizado, procedencia y dependencias editoriales registradas, pruebas ampliadas y evidencias en QA/diseño.

Subido por petición de Antonio a `feat/delivery-1-foundation`, mediante integración
fast-forward del commit `4601e97`; referencia remota comprobada. `main` se conserva
sin cambios. No implica despliegue de servidor, APK ni funciones de entregas
posteriores. Los resultados de pruebas se acreditan solo en [QA](qa/test-results.md).

### Archivos de este incremento

Código/configuración:

- `mobile/src/demo/catalog.ts` (nuevo), `content.ts` (ficción original conservada),
  `PreviewSession.tsx` (nuevo): configuración y estado temporal.
- `mobile/src/screens/HomeScreen.tsx`, `ExploreScreen.tsx`, `RouteDetailScreen.tsx`,
  `StopScreen.tsx`: jerarquía, catálogo, detalle y estado editorial/ficción separados.
- `mobile/src/components/ui.tsx`, `Artwork.tsx`, `MapPreview.tsx`: navegación,
  accesibilidad, composición y retirada del mensaje interno del mapa histórico.
- `mobile/src/app/_layout.tsx`, `+html.tsx`, `routes/figaro-demo.tsx`,
  `stops/patio-demo.tsx`; nuevas entradas `routes/plaza-de-espana.tsx` y
  `stops/plaza-de-espana-primera-parada.tsx`.
- `mobile/assets/images/plaza-de-espana.png` (nuevo); los recursos anteriores no se borran.
- `mobile/src/demo/content.test.ts`, `mobile/src/screens/ExploreScreen.test.tsx`,
  `StopScreen.test.tsx`, `mobile/jest.setup.ts`; los tres archivos de `mobile/e2e/`
  y ambos `mobile/playwright*.config.ts` (salidas de pruebas separadas).
- `.gitignore`: exclusión de originales de audio privados.

Markdown y evidencias:

- `README.md`, `AGENTS.md`, `docs/PLAN_ENTREGAS_V1.md`, `docs/STATE.md`,
  `docs/architecture.md`, `docs/design/README.md`, `docs/content/assets.md`.
- Nuevos `docs/decisions/0002-plaza-pilot.md`,
  `docs/content/plaza-de-espana-editorial.md` y este `docs/CHANGELOG.md`.
- `docs/qa/functional-tests.md`, `test-results.md`, `android-checklist.md`.
- `docs/design/screenshots/plaza-de-espana/`: series por ancho y texto al 200 %;
  las capturas de Fígaro de la carpeta superior quedan como histórico.

Sin cambios en dependencias, lockfiles, backend o migraciones. La guía fuente
original conserva su checksum. La prioridad sustituida se explica sin reescribir
esa fuente ni borrar los resultados de pruebas anteriores.

## Historial anterior

- `bd356c9`: revisión visual sevillana de Inicio, Rutas, Fígaro y patio ficticio (prioridad sustituida por la revisión actual).
- `1ae5dfe`: corrección de accesibilidad SVG web.
- `ed408d6`: base técnica y demo de Entrega 1.
- `c4b449b`: plan inicial de entregas.
