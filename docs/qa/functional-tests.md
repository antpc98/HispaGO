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
| UI-01 | Jest | Buscar Fígaro sin acento, mayúsculas y espacios | Coincidencia normalizada |
| UI-02 | Jest | Combinar texto con categoría distinta | Estado vacío |
| UI-03 | Jest | Categoría Todas sin búsqueda | Una propuesta demo |
| UI-04 | Jest | Seleccionar Historia y restablecer filtros | Estado vacío y recuperación de Fígaro |
| UI-05 | Jest | Escribir búsqueda inexistente | Estado vacío y aviso de demostración visible |
| UI-06 | Jest | Abrir parada y desplegar/ocultar ejemplo | Audio deshabilitado; ejemplo visible y después oculto |
| WEB-01 | Playwright | Explorar → detalle → parada → ejemplo → volver | URLs correctas, controles responden, sin excepciones JS |
| WEB-02 | Playwright | Filtrar, restablecer y buscar FIGARO | Estado vacío y recuperación |
| WEB-03 | Playwright | Enlaces directos a tres pantallas a 320/412/1280 px | Contenido visible sin desbordamiento horizontal |
| OPS-01 | HTTP + Docker | Detener/arrancar la base conservando volumen | 503 durante fallo y 200 al recuperar |
| OPS-02 | Herramientas | Check Django, migraciones pendientes, lint, tipos y formato | Sin errores |
| BUILD-01 | Expo | Exportar Android y web | Bundles generados, sin afirmar APK instalado |
| SDK-01 | Expo local | `expo install --check` offline | Coincidencia con metadatos incluidos; limitación offline explícita |
| SDK-02 | Expo Doctor online | Consultar configuración y metadatos externos con autorización | Comprobaciones completas o fallos diagnosticados |

## Comandos

Usar los comandos del README en sus directorios respectivos. El runner móvil es
Jest con preset `jest-expo`; `npm test` está configurado. Playwright inicia la
exportación servida mediante `serve`, no un simulador Android.

No se incluyen todavía tests de publicación, catálogo real, progreso o XP porque
esas funciones no existen en la entrega 1. Se añadirán con sus implementaciones.
