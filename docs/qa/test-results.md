# Resultados de verificación · Entrega 1

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
