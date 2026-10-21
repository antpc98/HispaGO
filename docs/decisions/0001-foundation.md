# ADR 0001 · Base técnica, demo local y comprobación reproducible

Fecha: 21 de octubre de 2026. Estado: adoptada para la entrega 1.

## Decisión

- Python 3.13.5, Django 5.2.18 LTS y PostgreSQL 17.11.
- Imagen PostgreSQL fijada por digest de manifiesto en Compose y CI.
- Expo SDK 58 estable (58.0.16), React Native 0.88.0, React 19.3.0 y Node 24.19.0.
- Dependencias exactas y lockfile npm; locks Python con hashes de artefactos.
- Una única raíz `mobile/src/app/` y navegación mediante Expo Router.
- Datos de demostración locales separados del futuro dominio editorial.
- Jest 30 y React Native Testing Library 14, compatibles con los peers del SDK.
- E2E web complementario con Playwright y Chromium.

La selección de Expo utiliza las versiones del paquete oficial
`expo-template-default@58.0.25` y la tabla `expo/bundledNativeModules.json`.
No se han seleccionado versiones alpha o canary ni se ha forzado la resolución
con `--legacy-peer-deps`.

## Exportación web con SDK 58

El documento `+html.tsx` conserva `headNodes`, `bodyNodes` y atributos de
`useServerDocumentContext`, además del idioma español. Omitir esos nodos producía
HTML visible sin scripts de hidratación: los botones no respondían. El E2E
detectó ese fallo; la integración se corrigió usando la API del SDK instalado.

Las fuentes se importan desde sus subdirectorios para incluir únicamente los
cinco pesos/estilos utilizados, evitando empaquetar toda la familia.

## Verificación y límites

Se usan PostgreSQL real y peticiones HTTP reales para la base. Los tests de
fallos, permisos y UI complementan esas comprobaciones. La navegación web no
acredita comportamiento nativo en Android.

La red del entorno bloqueó servicios externos de Expo Doctor. El intento de
escalación fue rechazado por revisión automática por el envío de metadatos de
configuración. La validación local con la tabla del SDK continúa disponible;
la consulta online queda pendiente de autorización explícita. No se activan
exclusiones ni se modifica CI para ejecutar indirectamente la consulta rechazada.

## Fuentes técnicas utilizadas

- Documentación Django 5.2: https://docs.djangoproject.com/en/5.2/
- Metadatos de versiones de npm de Expo, plantilla oficial y dependencias.
- API de Expo Router y contexto del documento de la versión instalada.
- README oficial de React Native Testing Library 14: render y eventos asíncronos.
- Documentación de base: la guía fuente adjunta al proyecto.
