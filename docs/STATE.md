# Estado de HispaGo

Actualizado: 21 de octubre de 2026. Entrega activa: **1 · Base y dirección visual**.

## Implementado

- Monorepo organizado, guía fuente preservada e instrucciones para futuras tareas.
- Django 5.2 LTS, PostgreSQL 17 y configuración local generada sin secretos en Git.
- Salud con consulta real a base y Admin base con marca, sesión y CSRF.
- Expo SDK 58, TypeScript y única raíz de navegación `src/app/`.
- Explorar, detalle y parada demo con identidad sevillana, ilustraciones originales,
  búsqueda/categorías locales y ejemplo desplegable.
- Dependencias fijadas, CI, tests y documentación de arranque, arquitectura,
  decisiones, versiones, recursos y QA.

## Verificado

Migraciones y PostgreSQL real, 8 pruebas Django, 4 pruebas de configuración local,
6 pruebas Jest y 3 E2E web. Health/Admin mediante HTTP y recuperación tras detener
la base. Tipos, lint, exportación Android y web. Resultados y alcance exacto:
`docs/qa/test-results.md`.

Reinstalación desde locks y arranque Metro offline con manifiesto Android HTTP 200
también comprobados. El entorno cloud requiere caché Expo en una ruta escribible;
el comando está en README. La descarga del depurador nativo nuevo queda sin
comprobar y Expo utiliza su fallback.

## Pendiente para cerrar la comprobación completa

- Autorizar Expo Doctor online: la revisión automática bloqueó el envío de
  metadatos de configuración a servicios externos. Pasó la comprobación local con
  la tabla del SDK, que no sustituye la remota.
- Revisar visualmente la propuesta con Antonio/Ana y probar la base en Android
  compatible y en otro equipo. No se ha generado APK.
- Revisar los avisos de mantenimiento y dependencias antes de producción.

## Límites actuales

La app no consume la API, no guarda progreso, no solicita GPS ni reproduce audio.
Las pantallas y el relato son demostración identificada. No hay ruta real publicada
ni datos turísticos inventados. El Admin todavía no edita contenidos culturales.

No hay hosting, EAS, bucket, credenciales de mapas ni publicación comercial.

La API de GitHub responde Forbidden desde este entorno incluso con escalación.
No se ha podido crear ni consultar un PR mediante esa API; el acceso Git es una
capacidad distinta y no demuestra acceso a GitHub Actions o PR.

## Siguiente entrega

Entrega 2: dominio de contenidos, formularios editoriales, permisos, publicación
inmutable, API y contrato OpenAPI. Mantener separado el material demo de los
futuros borradores editoriales.

Después, construir la primera parada vertical completa de la entrega 3 antes de
extenderla a toda la ruta.

## Aportaciones externas posteriores

El Excel original, contenidos y coordenadas verificados, narración aprobada y
derechos se incorporan al llegar a sus hitos. No han bloqueado la base técnica.
Las cuentas y credenciales de despliegue se gestionarán de forma segura cuando
sean necesarias.
