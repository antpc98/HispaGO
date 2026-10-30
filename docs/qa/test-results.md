# Resultados de verificación · Entrega 1

El estado vigente y las ejecuciones de la revisión **Plaza de España** se registran
al final de este archivo. Las secciones anteriores a esa revisión son históricas:
sus pantallas y conteos no describen la prioridad actual. No se suman rondas de
regresión como si fueran funcionalidades nuevas.

Fecha: 21 de octubre de 2026, Europe/Madrid.
Rama: `feat/delivery-1-foundation`. Base: `c4b449bd973bce1e02ec1aed896dd2a316f3b60c`.
Los resultados corresponden al árbol de trabajo de esta entrega; el commit final
se identifica en el historial Git y en el resumen de entrega, sin referencias
circulares a un hash todavía no creado.

Entorno: Linux x86_64, Python 3.13.5, Node 24.19.0, PostgreSQL 17.11 en Docker.

## Ejecuciones

| Comprobación | Resultado y evidencia |
|---|---|
| Instalación Python | Locks generados e instalación con `--require-hashes`; 21 paquetes de desarrollo |
| Instalación npm | Dependencias fijadas y lockfile generado; sin `--force` ni `--legacy-peer-deps` |
| Reinstalación congelada | `npm ci --offline` completado desde caché verificada; `uv pip sync --require-hashes` repetido sin cambios |
| Bootstrap local repetido | Conserva los tres `.env`; 4 tests unittest superados |
| PostgreSQL | Compose saludable, versión consultada realmente: 17.11 |
| Migraciones | Migraciones iniciales Django aplicadas; `makemigrations --check --dry-run`: sin cambios |
| Django system check | Sin incidencias |
| Django tests | 8 superadas sobre base PostgreSQL temporal; 0 omitidas |
| HTTP real | Health 200 y Admin login 200 con marca y CSRF |
| Fallo y recuperación de base | Base detenida: health 503; reinicio con mismo volumen: health 200 |
| TypeScript | Sin errores |
| Lint móvil | Sin errores |
| Formato y lint Python | Ruff check y format correctos para backend y scripts con configuración común |
| Formato móvil | Prettier check correcto |
| Jest móvil | 3 suites, 6 pruebas superadas; 0 omitidas |
| Exportación Android | Bundle Hermes generado; no equivale a APK o ejecución nativa |
| Exportación web | Cinco rutas estáticas generadas, incluidos enlaces directos y pantalla no encontrada |
| E2E web | 3 pruebas superadas en Chromium; navegación, filtros y anchos 320/412/1280 px |
| Fuentes e hidratación web | Cinco scripts presentes y fuentes cargadas en navegador; controles operativos |
| Integridad guía fuente | SHA-256 de original y copia: `15dff7d86dd13815c6fa8ae3cb78d58997c68e5418faf7bbe4c0b0540f8ec3e8` |
| Versiones locales Expo | `EXPO_OFFLINE=1 npx expo install --check`: dependencias actualizadas según metadatos incluidos |
| Arranque Metro | Servidor offline en puerto 8083; `/status` operativo y manifiesto Android HTTP 200 usando caché Expo escribible |

Después de reinstalar desde los locks se repitieron las comprobaciones de código,
los tests y ambas exportaciones. El E2E volvió a superar sus tres casos sobre la
exportación final. Total automatizado: **21 pruebas superadas**, 0 omitidas.

## Contraste calculado

Relación WCAG calculada mediante luminancia relativa sRGB:

| Combinación | Relación |
|---|---|
| Azul cerámico sobre cal | 10.44:1 |
| Texto secundario sobre cal | 5.21:1 |
| Terracota sobre cal | 5.53:1 |
| Superficie clara sobre azul | 11.27:1 |
| Salvia sobre azul | 8.87:1 |

Las combinaciones medidas superan 4.5:1 para texto normal. Esta medición no es
una auditoría completa de accesibilidad. TalkBack y escalado nativo están pendientes.

## Fallos detectados y correcciones

- Resolución inicial del runner: Expo Router 58 requiere RNTL 14 y su renderer;
  se corrigieron dependencias y tests asíncronos. Jest 30 satisface los peers.
- La primera exportación web mostraba HTML pero no respondía a pulsaciones.
  El E2E falló en navegación y filtros. Se conservaron los nodos de scripts del
  contexto de documento Expo 58 en `+html.tsx`; las tres pruebas pasaron después.
- TypeScript requería declarar tipos de Jest en su configuración; corregido y
  vuelto a comprobar.
- Las familias tipográficas importadas desde su raíz añadían variantes no usadas.
  Las importaciones se limitaron a cinco archivos.
- La configuración de Ruff se unificó en la raíz para obtener el mismo resultado
  al ejecutar desde backend o desde el monorepo.
- El manifiesto de Metro intentaba usar el directorio personal de solo lectura.
  Se usó la opción de caché del CLI en una ruta de workspace: manifiesto HTTP 200.
  El depurador nativo usa la versión fallback incluida; no se validó su descarga.

## Bloqueos y pruebas no ejecutadas

**Expo Doctor online:** el intento inicial obtuvo 17/20 comprobaciones correctas.
Las otras tres quedaron afectadas por servicios externos: esquema de configuración,
React Native Directory y consulta remota de versiones. Se observaron respuesta
Forbidden y fallo de resolución de `exp.host`. No se atribuyen esos fallos a código
sin evidencia.

La revisión automática rechazó la escalación porque enviaría metadatos de un
proyecto privado a servicios externos sin autorización explícita. No se ha
intentado sortear el rechazo ni ejecutar esa consulta mediante CI. La comprobación
local del SDK pasó, con la advertencia del propio CLI de que el modo offline no
equivale a su validación online. Se requiere autorización para completar esa parte
y, si continúa bloqueada, acceso de red a los destinos oficiales necesarios.

**Auditoría de dependencias:** durante la preparación se detectaron avisos
transitivos del toolchain, entre ellos `braces`, `node-forge` y `uuid`. Se actualizó
Jest dentro del rango compatible. No se ha acreditado una resolución completa de
la auditoría sobre el lock final ni se han forzado cambios incompatibles. Revisar
antes del piloto y del despliegue público.

**Sin ejecutar:** Android físico, APK, TalkBack, GPS, audio real, pruebas de campo,
instalación en el equipo de Cristina/Antonio y GitHub Actions remoto. No existen
todavía las funciones de producto de entregas posteriores.

## Corrección posterior · Atributo `accessible` en SVG web

Antonio informó de un aviso React en su arranque local de desarrollo:
`Received false for a non-boolean attribute accessible`. En `Icon` y `PatioArt`,
la propiedad nativa se reenviaba a un elemento SVG del DOM.

Se conservó `accessible={false}` para nativo y se usaron `aria-hidden` y
`focusable={false}` para la decoración en web. React Native Web convierte la
segunda propiedad en `tabIndex=-1`. El contenedor de la ilustración mantiene su
rol de imagen y descripción. No se silenció LogBox ni se convirtió el valor
nativo en una cadena para el DOM.

Se añadió WEB-04, que fallaba antes de la corrección por ausencia de los atributos
web, y un runner Metro de desarrollo para captar los avisos que la exportación
de producción no muestra.

Comprobaciones de la corrección:

- TypeScript, lint y formato correctos.
- Jest: 6 pruebas superadas.
- E2E sobre exportación: 4 pruebas superadas.
- E2E sobre Metro en desarrollo: 4 pruebas superadas, incluida consola React sin
  el aviso de `accessible`; ninguna excepción JS en el caso de regresión.
- Exportaciones web y Android regeneradas correctamente; sin afirmar ejecución
  en Android físico.

Durante la preparación del runner se detectó un fallo de caché de Metro
(`Requiring unknown module`) con servidores simultáneos. Se detuvo el servidor
de prueba anterior y se arrancó el runner con caché limpia y modo no interactivo;
los cuatro casos pasaron. El runner usa el puerto 8084 y un solo worker.

No se añadieron dependencias. La reinstalación npm y las pruebas de backend no
se repitieron para este cambio de interfaz. La validación en Android físico y
Expo Doctor online mantienen sus estados pendientes.

Evidencia aportada por Antonio desde Windows: `npm ci` completó la instalación
tras activar `NODE_USE_SYSTEM_CA=1`, y la demo se abrió en su navegador local.
El aviso SVG procede de esa prueba; la verificación automatizada de la corrección
se realizó en el entorno Linux, no en su equipo.

## Revisión visual basada en las referencias de Antonio

Se incorporaron Inicio, catálogo separado, portadas artísticas y navegación
inferior. Se conserva la parada demo. El mapa, datos turísticos, audio y progreso
siguen pendientes de sus fases; no se añadió una API ni persistencia.

### Verificaciones

- TypeScript, lint y formato sin errores tras regenerar los tipos de Expo Router
  al arrancar Metro con la nueva ruta `/routes`.
- Jest: 3 suites y 6 pruebas superadas.
- Playwright sobre exportación: 5 casos superados.
- Playwright sobre Metro en desarrollo: 5 casos superados.
- Cobertura funcional: Inicio → Rutas → detalle → parada, búsqueda, filtros,
  colecciones de Inicio, barra inferior y estado seleccionado accesible.
- Cuatro pantallas comprobadas a 320, 412 y 1280 px, sin desbordamiento horizontal.
- Exportaciones web (6 rutas estáticas) y Android generadas; las dos imágenes
  locales están incluidas en el bundle Android.
- Capturas revisadas de Inicio, Rutas, detalle y parada. Se espera a fuentes e
  imágenes antes de capturar; no son capturas de un Android físico.
- Sin dependencias nuevas ni cambios en lockfiles o backend. No se repitieron
  las pruebas de PostgreSQL para este cambio de interfaz.

El E2E detectó que `accessibilityState.selected` no exponía por sí solo el estado
en esta versión web. Los filtros declaran `aria-pressed` y las pestañas
`aria-selected` en web, conservando el estado nativo. También se corrigió el
ajuste de las imágenes: dimensiones porcentuales explícitas evitan que el tamaño
intrínseco del PNG produzca un recorte excesivo. La regresión comprueba imágenes
cargadas dentro de su contenedor, descripciones y ausencia del aviso SVG.

### Contraste de la revisión

Luminancia relativa sRGB de los colores sólidos:

| Combinación | Relación |
|---|---|
| Azul oscuro sobre cal | 12.92:1 |
| Texto secundario sobre cal | 5.20:1 |
| Terracota sobre cal | 5.58:1 |
| Texto claro sobre botón terracota | 6.04:1 |
| Texto cálido sobre azul de categoría | 8.82:1 |
| Texto cálido sobre oliva de categoría | 4.95:1 |
| Azul oscuro sobre arena | 10.63:1 |

Se oscureció el oliva de las categorías para mejorar el contraste del texto
pequeño y se reforzó el velo de las portadas. Estas medidas no sustituyen una
auditoría completa de accesibilidad o pruebas nativas con texto ampliado.

Expo Doctor online, Android físico, aprobación editorial e infraestructura
del piloto conservan sus estados pendientes. Esta revisión no cierra las fases
de contenido, mapa, audio o entrega del APK.

## Revisión vigente · Plaza de España · 30 de octubre de 2026

Rama de revisión: `feat/delivery-1-plaza-de-espana`. Base inspeccionada:
`bd356c9b58e02799111b1096e91d746c46f8a5ae` de `feat/delivery-1-foundation`, limpia
y coincidente con su remoto al iniciar. Resultados del árbol de trabajo preparado
para revisión; sin commit/push/PR/despliegue implícitos.

Entorno: Linux, Node 24.19.0, dependencias existentes sin cambios, Playwright 1.64.1,
Chromium del sistema 154.0.8037.57. Expo SDK 58. Pruebas web con emulación de Pixel 7
y viewports CSS ajustados, no Android/iPhone físicos.

### Ejecuciones del incremento

| Comando / comprobación | Resultado acreditado |
|---|---|
| `npm run typecheck` | Superada sobre código y tests finales |
| `npm run lint` | Superada; en cloud con `EXPO_NO_TELEMETRY=1` y caché Expo escribible |
| `npm run format:check` | Superada |
| `npm test` | 3 suites, **9 pruebas superadas**, 0 omitidas |
| `npm run export:web -- --max-workers 2` | Superada: **8 rutas estáticas**, incluidas Plaza, fuente editorial y borrador Fígaro |
| `npm run export:android -- --max-workers 2` | Superada sobre la UI final: bundle Hermes y recursos locales; **no APK** |
| `CAPTURE_DESIGN=1 npm run test:e2e` | **12 casos superados**, 0 omitidos, sobre exportación final |
| `npm run test:e2e:dev` | **12 casos superados**, 0 omitidos, con encabezados al 200 % en los cuatro anchos; no se acredita la ronda anterior con colisión de trazas |
| `EXPO_OFFLINE=1 npx expo install --check` | Superada con advertencia explícita del CLI: usa metadatos locales, no sustituye Doctor online |
| `git diff --check` | Superada |
| Enlaces Markdown e inventario visual | 16 MD comprobados (guía original excluida), sin enlaces locales rotos; 32 capturas presentes |
| Búsqueda del nombre descartado en código/docs | Sin coincidencias; no se ha usado en la nueva configuración |
| Integridad guía original | SHA-256 conservado: `15dff7d86dd13815c6fa8ae3cb78d58997c68e5418faf7bbe4c0b0540f8ec3e8` |
| Backend / locks | Diff sin cambios; no se han vuelto a ejecutar PostgreSQL/Django ni reinstalado dependencias para esta revisión de interfaz |
| Audio de Ana | **Bloqueado**: AAC y referencia de descarga inaccesibles; sin escucha, transcripción, extracción de tono o revisión factual |

Los casos WEB-01–09 del plan se distribuyen en 12 tests ejecutables: cuatro casos
normales por ancho, un caso de ampliación que recorre los cuatro anchos y los
flujos de navegación, búsqueda, explicación, foco, scroll, recursos y borrador.
No se suman repeticiones parciales a estos conteos.

### Cobertura y evidencias

- Inicio, Rutas, detalle y estado editorial a **320, 390, 430 y 768 px**.
- Todo el texto ampliado al **200 %**, incluidos encabezados, en esos cuatro
  anchos; la prueba comprueba que el tamaño calculado del encabezado se duplica.
- Sin desbordamiento horizontal ni texto/control recortado; controles ≥44 px,
  CTA principal de Inicio visible sin scroll en condiciones normales (alto 844 px).
- Barra inferior completamente visible y último contenido alcanzable por scroll,
  sin quedar tapado en condiciones normales; ampliación mantiene acceso por scroll.
- Título completo y nombre accesible, imágenes locales cargadas dentro del marco,
  sin Giralda/personajes de Fígaro en Plaza; SVG decorativos fuera de tabulación.
- Búsqueda sin acentos, vacío/limpieza, disponibilidad real sin narración,
  URL recargable, filtros inválidos, retorno a catálogo con búsqueda y scroll,
  foco y activación por teclado. El acceso directo conserva destinos padre.
- Fígaro/patio siguen navegables por sus URLs propias y su ficción no aparece en
  la primera parada del piloto. La ausencia de audio no se oculta con un reproductor.

**32 capturas** en `docs/design/screenshots/plaza-de-espana/`, a escala CSS,
esperando hidratación, fuentes y carga de imágenes. Representan el viewport de
la app con scroll interior, no un recorrido turístico completo. Se han inspeccionado
visualmente ejemplos de Inicio, catálogo, detalle y estado editorial, incluidos
título y texto ampliado. [Índice de diseño](../design/README.md).

### Fallos encontrados y correcciones

- Tipos de rutas generados anteriores a las nuevas entradas: regenerados al
  iniciar Expo, sin editar los tipos generados ni ocultar errores con casts.
- La nueva ref de ScrollView requiere `ScrollViewInstance` en RN 0.88; corregida.
- Lint detectó mutación de un ref devuelto por un hook: acceso al scroll encapsulado
  en callbacks del proveedor, sin desactivar reglas.
- Primer lint sin la configuración de caché intentó usar el directorio personal
  de solo lectura: repetido con las variables documentadas en README.
- Retorno de scroll fallaba porque una pantalla oculta emitía posición cero:
  registro limitado a pantalla enfocada y layout válido, restauración al recuperar
  tamaño/foco. La regresión pasó después; no se resetean deliberadamente los filtros.
- Hidratación/foco: espera al efecto accesible antes de acciones críticas y evita
  robar foco de un control ya activado. El foco programático del título no dibuja
  un marco decorativo; los controles mantienen su foco de teclado.
- Favicon inexistente generaba un 404 de consola: añadido SVG original embebido,
  sin filtrar errores ni silenciar LogBox.
- La primera ampliación no incluía encabezados HTML. Se reforzó para incluirlos,
  verificar el tamaño duplicado y recorrer los cuatro anchos. Detectó 3 px de
  desbordamiento vertical del título: aumentado interlineado, sin reducir la letra.
- Una ronda de pruebas de desarrollo coincidió con otra de exportación y colisionó
  en sus artefactos de trazas. No se acredita como superada. Ahora cada modalidad
  tiene su `outputDir`; la verificación final se realiza secuencialmente. No iniciar
  E2E antes de terminar la exportación ni compartir Metro durante exportaciones.

### Contraste de esta revisión

Recalculado mediante luminancia relativa sRGB, sobre fondos sólidos (el texto ya
no depende de la imagen):

| Combinación | Relación |
|---|---|
| Azul profundo / crema | 12.92:1 |
| Texto secundario / crema | 5.20:1 |
| Terracota / crema | 5.58:1 |
| Texto claro / botón terracota | 6.04:1 |
| Azul profundo / arena | 10.63:1 |

No es una auditoría completa WCAG. No se han probado lectores de pantalla,
font scaling nativo, safe areas con notch o comportamiento real de iPhone/Android.
La ampliación CSS en Chromium no equivale a esas pruebas ni al zoom completo del
navegador. APK, paseo real, aprobación turística/derechos y audio siguen pendientes.
Expo Doctor online no se ha repetido: mantiene su autorización pendiente.
GitHub Actions remoto tampoco se ha ejecutado/verificado en este incremento.
