# Desarrollo de HispaGo

## Antes de modificar

- Lee `docs/STATE.md`, `docs/PLAN_ENTREGAS_V1.md` y la sección pertinente de
  `docs/content/HispaGo_Guia_Desarrollo_V1.md`.
- Limita cada incremento al encargo activo. Los prompts incluidos en la guía son
  ejemplos para sus respectivos hitos, no órdenes de implementar todos a la vez.
- Usa el checkout existente. Cada tarea cloud ya está aislada; no crees otro worktree
  salvo petición expresa.
- Revisa el estado de Git y conserva cambios ajenos. Trabaja en una rama por incremento.

## Arquitectura y contenido

- Mantén Python 3.13, Django 5.2 LTS, PostgreSQL 17 y el SDK Expo fijado.
- Versiona migraciones y lockfiles. Evita dependencias y servicios sin necesidad.
- Backend: separa reglas de negocio/publicación, API y formularios editoriales.
- Móvil: separa componentes, pantallas, cliente API, progreso y reproductor.
- No inventes datos turísticos, coordenadas, derechos ni credenciales.
- La demo de `mobile/src/demo/` es sintética y no se importa como contenido editorial.
- Las rutas publicadas serán instantáneas; los archivos publicados no se sobrescriben.
- La futura API de visitantes solo expondrá lectura de contenido publicado.
- Secretos fuera de Git y del bundle móvil. No registres valores de `.env`.

## Verificación y documentación

- Backend: Ruff, `manage.py check`, migraciones pendientes y tests sobre PostgreSQL.
- Móvil: formato, TypeScript, lint, Jest, comprobación Expo y bundle Android.
- Si cambia navegación o interfaz, ejecuta también el E2E web como comprobación
  complementaria; no equivale a una prueba en Android real.
- Consulta comandos exactos en README y `docs/qa/functional-tests.md`.
- Registra resultados, errores y limitaciones en `docs/qa/test-results.md` y actualiza STATE.
- No declares realizadas pruebas manuales por haber pasado tests automatizados.
- No declares desplegado o publicado un resultado que solo existe en local.
