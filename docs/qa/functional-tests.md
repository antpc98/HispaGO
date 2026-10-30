# Plan de pruebas funcionales · Entrega 1

Los resultados reales se registran en `test-results.md`. Un caso documentado no
implica que se haya ejecutado. Las pruebas nativas están en `android-checklist.md`.

## Prerrequisitos

Configuración local generada, dependencias instaladas, PostgreSQL saludable y
migraciones aplicadas. Los tests Django crean una base de pruebas independiente.
Para E2E, exportación web actual y navegador Chromium instalado.

| ID | Tipo / implementación | Procedimiento | Resultado esperado |
|---|---|---|---|
| ENV-01 | Unittest de scripts | Ejecutar dos veces bootstrap con los mismos archivos | Configuración existente idéntica; sin secretos en salida |
| ENV-02 | Unittest de scripts | Contraseña local con caracteres reservados | URL codificada; valor no registrado |
| ENV-03 | Unittest de scripts | Backend configurado previamente | Archivo conservado |
| ENV-04 | Unittest de scripts | Puerto fuera de rango | Error antes de crear configuración de backend |
| BE-01 | Django + HTTP | GET `/health/` con PostgreSQL disponible | 200 y comprobación de base `ok`, sin caché |
| BE-02 | Django + HTTP | Simular fallo; detener la base local y repetir health | 503 genérico, sin detalles privados |
| BE-03 | Django | POST `/health/` | 405, sin escritura |
| BE-04 | Django | Acceder a Admin anónimamente | Redirección a login |
| BE-05 | Django + HTTP | Abrir login | Marca HispaGo y token CSRF |
| BE-06 | Django | Enviar login sin CSRF con comprobación activa | 403 |
| BE-07 | Django | Usuario no staff accede al índice | Acceso denegado mediante redirección |
| BE-08 | Django | Usuario staff autenticado abre índice | 200 y cabecera editorial |
| UI-01 | Jest | Comprobar título completo y código/slug | Un único título elegido, identidad estable y Plaza protagonista |
| UI-02 | Jest | Buscar PLAZA DE ESPANA y mirar despacio | Coincidencia normalizada |
| UI-03 | Jest | Filtrar narración disponible | Vacío: referencia editorial no equivale a audio reproducible |
| UI-04 | Jest | Búsqueda inexistente y limpieza | Vacío y recuperación de Plaza |
| UI-05 | Jest | Filtros inválidos y búsqueda de Fígaro | Normalización; backlog no aparece como piloto |
| UI-06 | Jest | Comparar rutas y muestras | Identificadores propios; ficción original conservada; Plaza sin texto inventado ni Ópera |
| UI-07 | Jest | Abrir primera parada del piloto | Estado de fuente, sin reproductor, ficción ni dinámica inventados |
| UI-08 | Jest | Abrir muestra de Fígaro | Patio conservado; ejemplo desplegable/ocultable, sin evaluación |
| WEB-01 | Playwright | Inicio → detalle Plaza → estado de primera parada → volver → Rutas | Título completo, CTA temprano, pertenencia a Rutas, sin mapa/ficción/audio falsos |
| WEB-02 | Playwright | Buscar, filtrar disponibilidad, limpiar, recargar y volver | URL y contexto coherentes; vacío recuperable; entrada inválida normalizada |
| WEB-03 | Playwright (4 casos) | Cuatro pantallas a 320/390/430/768 px; acceso directo, último contenido y controles | Sin desbordamiento/truncado; áreas ≥44 px; barra inferior no tapa contenido; CTA Inicio visible |
| WEB-04 | Playwright, exportación y desarrollo | Seis pantallas, imágenes, SVG y consola React | Portadas correctas, cargadas y ajustadas; sin DOM `accessible`; decoración fuera de foco; sin errores JS/React |
| WEB-05 | Playwright | Explicación desplegable y barra inferior | Límites accesibles; dos destinos reales; categorías vacías retiradas |
| WEB-06 | Playwright | Activar CTA con teclado en Inicio/detalle | Foco llega al encabezado de destino, sin scroll forzado |
| WEB-07 | Playwright | Buscar, desplazar catálogo, abrir detalle y retornar | Conservación deliberada de búsqueda y scroll durante la sesión |
| WEB-08 | Playwright | Duplicar tamaño/alto de línea de todo el texto, incluidos encabezados, en los cuatro anchos | Texto se adapta; acciones y último contenido accesibles por scroll; sin desbordamiento ni recorte |
| WEB-09 | Playwright | Abrir borrador Fígaro y patio directamente | Separado del piloto, ficción explícita y navegación conservada |
| OPS-01 | HTTP + Docker | Detener/arrancar la base conservando volumen | 503 durante fallo y 200 al recuperar |
| OPS-02 | Herramientas | Check Django, migraciones pendientes, lint, tipos y formato | Sin errores |
| BUILD-01 | Expo | Exportar Android y web | Bundles generados, sin afirmar APK instalado |
| SDK-01 | Expo local | `expo install --check` offline | Coincidencia con metadatos incluidos; limitación offline explícita |
| SDK-02 | Expo Doctor online | Consultar configuración y metadatos externos con autorización | Comprobaciones completas o fallos diagnosticados |

## Comandos

Usar los comandos del README en sus directorios respectivos. El runner móvil es
Jest con preset `jest-expo`; `npm test` está configurado. Playwright inicia la
exportación servida mediante `serve`, no un simulador Android.

`npm run test:e2e:dev` ejecuta los casos web sobre Metro en modo desarrollo,
con caché limpia en el puerto 8084. Detecta avisos que React omite en producción.

No se incluyen todavía tests de publicación, catálogo real, progreso o XP porque
esas funciones no existen en la entrega 1. Se añadirán con sus implementaciones.

Los casos UI/WEB anteriores sustituyen la descripción anterior de Fígaro como
protagonista; el informe conserva sus ejecuciones históricas. WEB-03 genera una
serie por ancho y WEB-08 una serie de texto ampliado cuando `CAPTURE_DESIGN=1`.
Texto ampliado por CSS calculado en Chromium no equivale a Dynamic Type o Android
font scaling, zoom del navegador ni iPhone físico. Safe areas con notch y lectores
de pantalla requieren dispositivo. Audio inaccesible y revisión editorial se
registran como bloqueo, no como test de transcripción superado.
