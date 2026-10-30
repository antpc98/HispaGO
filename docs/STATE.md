# Estado de HispaGo

Actualizado: 30 de octubre de 2026. Entrega activa: **1 · Base técnica y pulido del piloto**.
Base inspeccionada: `bd356c9` de `feat/delivery-1-foundation`, limpia y coincidente
con el remoto al iniciar. Incremento desarrollado en `feat/delivery-1-plaza-de-espana`
y, por petición posterior de Antonio, integrado por fast-forward y subido a
`feat/delivery-1-foundation`: commit de implementación `4601e970d0403c7153a59f94e23dbcb0e983d9d2`.
Push y coincidencia de la referencia remota comprobados mediante Git. Sin cambios
en `main`, reescritura de historial, borrado de datos, despliegue de servidor ni APK.

## Decisión vigente

Primera experiencia: **Plaza de España · Una historia para mirar despacio**, título completo decidido. Código/slug `plaza-de-espana`. Fígaro queda como siguiente experiencia en backlog. La guía original se conserva íntegra, pero su prioridad anterior está sustituida por [ADR 0002](decisions/0002-plaza-pilot.md) y el único [roadmap vigente](PLAN_ENTREGAS_V1.md).

## Implementado en este incremento

- Inicio con título completo accesible, propuesta y CTA antes de la imagen, sin hero de altura fija.
- Ilustración artística específica de Plaza de España, local y con procedencia; no fotografía, plano ni fuente histórica. Las imágenes anteriores se conservan para el borrador de Fígaro.
- Catálogo local con búsqueda normalizada, filtro por disponibilidad real de narración, limpieza y estados vacíos. Sin categorías temáticas inventadas ni colecciones sin rutas.
- Detalle con propuesta, CTA temprano, enfoque, estado de la primera parada e información práctica agrupada. Sin mapa decorativo ni tres indicadores pendientes dominantes.
- Primera parada como estado editorial reservado: no hay relato disponible ni una escena ficticia en su lugar.
- Dos destinos inferiores, Inicio y Rutas. Detalle/parada pertenecen a Rutas; retornos con destino padre para acceso directo. URL para filtros y sesión en memoria para contexto/scroll; no es progreso turístico.
- Una identificación breve de prototipo con explicación desplegable; sin mensajes internos de números de entrega en la interfaz.
- Fígaro y patio conservados con identidades propias, ficción y acceso directo, excluidos del catálogo del piloto.
- Pruebas y documentación actualizadas. Sin nuevas dependencias, migraciones ni cambios de backend.

## Base técnica conservada

Django 5.2 LTS, PostgreSQL 17, health con consulta real, Admin base con marca/sesión/CSRF. Expo SDK 58, TypeScript, raíz única `src/app/`, tokens editoriales crema/terracota/azul, fuentes locales, locks, CI y configuración sin secretos. No se equiparan estas entregas con las fases internas de la guía antigua.

## Verificación

Tipos, lint y formato superados; 9 pruebas Jest, 12 E2E sobre exportación y 12 sobre
Metro en desarrollo, incluidos los cuatro anchos y encabezados al 200 %. Bundles web
y Android generados; 32 capturas guardadas. Las ejecuciones y sus evidencias se registran
en [QA](qa/test-results.md), separadas del histórico de 8 pruebas Django y 4 de scripts.
Las capturas actuales y su metodología están en [diseño](design/README.md). No inferir
prueba nativa de una captura de Chromium o un bundle.

## Bloqueo editorial de la primera parada

El usuario menciona `AUDIO-2026-10-30-12-19-47.aac`, pero no hay archivo ni referencia de descarga accesible en esta sesión. No se ha escuchado, transcrito ni extraído tono, enfoque o referencias. El registro [editorial](content/plaza-de-espana-editorial.md) conserva la procedencia declarada, el bloqueo y las preguntas para Ana. No hay transcripción ni hechos atribuidos a su voz inventados. Originales privados fuera de Git.

## Límites y comprobaciones pendientes

- Sin catálogo/API de contenido, narración, GPS, mapa, progreso, XP o recorrido turístico publicado. El Admin todavía no edita rutas.
- No están definidos ni verificados total de paradas, duración, distancia, coordenadas, trazado, condiciones de acceso ni accesibilidad.
- Categoría de Plaza de España pendiente de revisión; no hereda Ópera.
- Ana debe revisar material, fuentes, adaptación y localizaciones; la ilustración necesita su valoración editorial.
- Android/iPhone físicos, TalkBack/VoiceOver, escalado de fuente nativo, interrupciones de audio y prueba de campo: pendientes. No hay APK, hosting, EAS ni presentación final.
- Expo Doctor online sigue pendiente de autorización: el envío de metadatos fue rechazado anteriormente. La comprobación offline no lo sustituye.
- Mantenimiento y auditoría de dependencias antes de producción: pendiente. No aplicar `audit fix --force`.
- GitHub Actions remoto no verificado. La API de GitHub fue inaccesible en la entrega anterior; este incremento no acredita PR ni despliegue.

## Siguiente paso

Recibir la fuente de Ana y revisar su transcripción y afirmaciones sin publicarla; avanzar la entrega 2 (editor, publicación inmutable y API). Después, completar la primera parada de extremo a extremo en entrega 3, ampliar al recorrido definido en 4, validar contenido y campo en 5 y preparar la presentación instalable en 6. Fígaro se incorpora después reutilizando el sistema. Sin fechas ni cierres de hitos por haber dibujado pantallas.
