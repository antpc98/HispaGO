# HispaGo · Plan de entregas de la V1

Creado: 21 de octubre de 2026. Revisado: 30 de octubre de 2026.

Estado: plan de referencia. El avance y las comprobaciones reales se registran en [STATE.md](STATE.md) y [el informe de QA](qa/test-results.md); este documento por sí solo no acredita funcionalidades ni pruebas ejecutadas.

Fuente técnica de origen: `HispaGo_Guia_Desarrollo_V1.md`, versión 1.0, facilitada por Antonio. Se conserva íntegra como documento histórico, no como instrucciones activas de una sesión. Este es el único roadmap vigente. La decisión de producto del 30 de octubre, solicitada por Ana y trasladada por Antonio, sustituye su prioridad editorial anterior; véase [ADR 0002](decisions/0002-plaza-pilot.md). Los hitos técnicos compatibles siguen vigentes; las fases internas de la guía no equivalen automáticamente a estas entregas.

## 1. Objetivo y alcance

Entregar un piloto Android instalable que permita descubrir una ruta cultural por Sevilla, recorrer sus paradas, leer o escuchar relatos, resolver dinámicas y recuperar el progreso después de cerrar la app.

La primera experiencia piloto es **Plaza de España · Una historia para mirar despacio**. El título completo está decidido y se conserva en un único campo; código/slug estable: `plaza-de-espana`. Ana sigue validando contenido, paradas, localizaciones y recorrido. Fígaro pasa al backlog como siguiente experiencia, sin borrar su ficción ni reutilizar sus identificadores.

El piloto incluirá:

- Backend Django 5.2 LTS con Python 3.13, API REST y PostgreSQL 17.
- Editor de contenidos mediante Django Admin con formularios comprensibles y permisos por función.
- Publicación de versiones inmutables de las rutas y sus contenidos.
- App React Native, Expo y TypeScript, con prioridad Android.
- Catálogo, filtros, recomendaciones por reglas, detalle, mapa y paradas.
- Reproductor global, transcripciones y dinámicas de quiz, observación y decisión narrativa.
- Progreso y XP locales de visitante, sin duplicados y recuperables tras cerrar la app.
- Modo demo identificado y separado de la ubicación real.
- Importador del Excel con validación, informe e idempotencia.
- Configuración reproducible, pruebas automatizadas, pruebas manuales documentadas y preparación de APK.

Quedan fuera de esta V1: cuentas, pagos, reservas, sincronización entre dispositivos, paquetes offline completos, seguimiento GPS en segundo plano, IA conversacional, clima en vivo y publicación comercial en tiendas.

El entorno cloud existente se utilizará para desarrollar y verificar. El hosting persistente del piloto y la publicación del entorno cloud son operaciones distintas.

## 2. Principios de ejecución

1. Trabajar por incrementos verificables y mostrar pronto un flujo completo.
2. Mantener el código, la documentación y el estado de las pruebas alineados.
3. Separar datos sintéticos de desarrollo del contenido editorial publicable.
4. No inventar coordenadas, recorridos peatonales, datos turísticos, licencias ni credenciales.
5. Mantener estable la versión de una ruta mientras exista una sesión en curso.
6. Diferenciar implementación, comprobación automatizada, validación en dispositivo y aprobación editorial.
7. Usar el checkout existente del entorno aislado; no crear otro worktree salvo petición expresa.

Las entregas no equivalen necesariamente a un único PR. Los cambios grandes se dividirán por responsabilidad, conservando un orden de integración claro.

## 3. Entregas y criterios de aceptación

### Entrega 1 · Base técnica y dirección visual

**Objetivo:** disponer de una base reproducible y pulir la experiencia local de Plaza de España, sin anticipar funciones de las entregas siguientes.

Entregables:

- Estructura de monorepo con `backend/`, `mobile/` y `docs/`.
- Django, PostgreSQL y Expo inicializados con versiones compatibles y dependencias fijadas.
- Configuración de desarrollo, archivos `.env.example` sin secretos y servicios locales documentados.
- Endpoint de salud con comprobación de base de datos y Admin inicial con identidad HispaGo.
- App inicial con navegación y pantallas representativas de Explorar, detalle y parada.
- Inicio con propuesta y CTA temprano; catálogo local; detalle y estado del material de la primera parada de Plaza de España. Si no se puede revisar la fuente de Ana, no se ofrece un relato sustitutivo.
- Título completo accesible; portada específica, avisos de prototipo concentrados y navegación Inicio/Rutas. Detalles y paradas pertenecen a Rutas.
- Fígaro conservado como borrador independiente, excluido de la experiencia protagonista.
- Tokens de diseño y componentes iniciales: botones, tarjetas, tipografía y estados de interfaz.
- Verificaciones automáticas iniciales para backend y móvil.
- README de arranque, versiones exactas, decisiones iniciales y `docs/STATE.md`.

Criterios de aceptación:

- Instalación, migraciones, arranque y conexión a PostgreSQL comprobados en el entorno disponible.
- Endpoint de salud verificado mediante una petición real y acceso al Admin comprobado.
- Bundle de la app generado y comprobaciones de TypeScript, lint y compatibilidad de Expo ejecutadas según la configuración elegida.
- Pruebas significativas de la base implementada ejecutadas y sus resultados registrados.
- Pantallas iniciales identificadas como demostración visual, sin presentarlas como integración funcional con el catálogo.
- Comprobaciones pendientes en el equipo de otra persona o Android real indicadas expresamente.
- Anchos 320/390/430/768 px, texto ampliado en navegador, búsqueda, limpieza, filtros, retorno, enlaces directos y recarga documentados con resultados reales.

**Requisitos previos de Antonio:** ninguno que bloquee el inicio. Se adopta HispaGo como nombre de trabajo, español como idioma inicial y la dirección visual descrita en este plan.

Un logotipo, referencias visuales o preferencias de marca existentes son aportaciones opcionales. No son necesarias cuentas de hosting, claves de Maps, audios finales ni el Excel para esta entrega.

### Entrega 2 · Contenido, editor y API

**Objetivo:** poder gestionar contenido sin programar y exponer únicamente versiones publicadas.

Entregables:

- Recibir y revisar el material de la primera parada de Ana: original privado, procedencia, transcripción fiel con tiempos/dudas, adaptación separada y afirmaciones pendientes de fuentes. [Registro de la fuente](content/plaza-de-espana-editorial.md).
- Modelos, restricciones y migraciones de rutas, versiones, lugares, paradas, relatos, audios, dinámicas y taxonomías.
- Admin con búsqueda, filtros, secciones, orden de paradas, formularios por tipo de misión y preescucha de audio.
- Permisos editoriales, validación de publicación y registro de quién publica y cuándo.
- Protección frente a ediciones simultáneas y acciones de duplicar borrador y publicar nueva versión.
- Instantáneas inmutables con conservación de versiones anteriores y referencias a media inmutable.
- API pública de solo lectura con filtros validados, paginación, errores uniformes y URLs absolutas de media.
- Contrato en `docs/api.md` y esquema OpenAPI.

Criterios de aceptación:

- Crear una parada con relato, audio y quiz desde el editor sin modificar código.
- Rechazar una publicación incompleta e indicar los campos que faltan.
- Ocultar borradores en catálogo, detalle y acceso directo a versiones.
- Comprobar que una publicación previa no cambia al editar el borrador.
- Verificar permisos, conflictos de edición, filtros y orden de coordenadas GeoJSON.
- Revisar con Ana la primera parada de Plaza de España antes de presentarla como contenido turístico aprobado. Recibir un audio no equivale a verificar sus afirmaciones ni autoriza clonar su voz.

La facilidad de uso del editor se verificará técnicamente y después con una prueba de Cristina o Ana; son evidencias diferentes.

### Entrega 3 · Primera parada completa

**Objetivo:** completar la primera parada de Plaza de España de extremo a extremo con material revisado de Ana, antes de ampliar el recorrido.

Entregables:

- Flujo conectado: catálogo → detalle → inicio de ruta → parada → audio → quiz → progreso recuperado.
- Cliente API central con timeout, cancelación, tratamiento de errores y reintento.
- Reproductor único con transcripción, controles y recuperación del punto de escucha.
- Persistencia local versionada y XP concedido una sola vez por misión.
- Contenido sintético aislado para desarrollo, con identificación visible de demo.
- Audio solo cuando el archivo, sus derechos, transcripción y revisión estén resueltos. Interacción acordada con Ana; no importar la pregunta ficticia del patio.

Criterios de aceptación:

- Recorrer la primera parada usando datos servidos por la API.
- Cerrar y reabrir conservando versión, parada, progreso y posición de audio.
- Repetir una acción sin duplicar XP.
- Recuperarse de errores de red sin perder el progreso.
- Permitir valorar en una demostración el diseño, la navegación y el ritmo narrativo.

Esta entrega es el punto de revisión de experiencia antes de extender el patrón a todas las paradas.

### Entrega 4 · Experiencia completa

**Objetivo:** ampliar al recorrido de Plaza de España que Ana defina y revisar sus localizaciones y datos prácticos. No se fija un número de paradas ni se inventa geometría para completar la interfaz.

Entregables:

- Pantallas restantes: ruta en curso, Mi recorrido, cierre narrativo y resumen.
- Quiz, observación y decisión narrativa con pistas, feedback y reglas de finalización.
- Filtros y recomendaciones por tiempo, intereses y compañía, con explicación del resultado.
- Mapa, marcadores y ubicación de primer plano con gestión de permisos y precisión.
- Navegación peatonal externa cuando no exista geometría verificada.
- Modo demo, recuperación segura de progreso corrupto o antiguo y estados de carga, vacío y error.
- Accesibilidad de controles, etiquetas y texto ampliado.

Criterios de aceptación:

- Completar una ruta demo y comprobar el cierre y el total de XP.
- Mantener utilizable el recorrido manual si se deniega GPS.
- No confundir proximidad con visita o misión completada.
- Conservar una sesión en su versión anterior al publicar una nueva.
- Verificar que las misiones opcionales no bloquean la finalización.
- Registrar por separado lo comprobado automáticamente y lo pendiente de dispositivo real.

La prueba del mapa en APK requiere la configuración real de Google Maps y la firma de esa build. La precisión GPS requiere pruebas de campo.

### Entrega 5 · Revisión editorial y prueba de campo de Plaza de España

**Objetivo:** validar el contenido del piloto y probar la experiencia sobre el terreno; corregirla con el feedback antes de su presentación.

Entregables:

- Comando `import_routes_excel` con `--dry-run`, `--apply`, informe y manifiesto estable de origen.
- Normalización revisable y conservación de los valores originales del Excel.
- Importación en borrador que mantenga separadas las dos rutas FLAMENCO.
- Protección frente a duplicados y sobrescritura silenciosa de contenido enriquecido.
- Carga de Plaza de España con el recorrido que Ana apruebe, textos, dinámicas, imágenes, audios y créditos revisados. Revisión de transcripción y escucha separadas de la validación histórica.
- Plantillas de contenido, inventario de derechos y checklist de publicación.
- Paseo real en Plaza de España con dispositivo y build identificados; incidencias de localización, lectura, audio, ritmo narrativo y acceso. Corrección y repetición de los casos afectados.

Criterios de aceptación:

- Verificar el importador con pruebas automatizadas y después con el Excel real.
- Reimportar el mismo origen sin duplicar rutas.
- No interpretar FINALIZADO editorial como publicado.
- Confirmar la incorporación de una nueva parada desde Admin y su aparición en la app al publicar, sin recompilar.
- Obtener aprobación editorial y completar el checklist antes de presentar Plaza de España como ruta definitiva. El importador se mantiene como hito técnico válido, pero el Excel no debe bloquear una primera parada cargada desde Admin.

Dependencias externas: Excel original, guiones, localizaciones y tiempos comprobados, imágenes y grabaciones con derechos, voz aprobada y revisión de Ana.

La preparación de estos materiales debe comenzar durante las primeras entregas. Las pruebas de campo necesitan una build utilizable: la preparación técnica de la entrega 6 puede avanzar antes, sin declarar cerrado el piloto.

### Entrega 6 · Piloto instalable

**Objetivo:** preparar la V1 piloto de Plaza de España para presentación: APK autónomo conectado a servicios persistentes y validación real documentada.

Entregables:

- Configuración de backend HTTPS, PostgreSQL y almacenamiento de media persistente.
- Procedimiento de despliegue, migraciones, copias de seguridad y restauración de prueba.
- Configuración de producción, comprobación `check --deploy` y límites conocidos documentados.
- Proyecto EAS y perfil preview APK con identificadores y firma reales.
- Verificación de permisos, mapa, audio, privacidad y ausencia de secretos en el bundle.
- Reporte de QA, instrucciones de instalación y guion de demostración para Ana.

Criterios de aceptación:

- Instalar el APK y usarlo con el ordenador de desarrollo apagado y datos móviles.
- Verificar audio, interrupciones, auriculares, cierre y recuperación de progreso en Android real.
- Registrar el comportamiento de audio al bloquear la pantalla.
- Probar en campo localizaciones, tiempos y caminos.
- Comprobar los cambios editoriales desde otra instalación.
- Registrar commit, build, fecha, limitaciones y resultados; etiquetar `v0.1.0-pilot` cuando se cumplan los criterios.

Dependencias externas: acceso autorizado a hosting, almacenamiento, Expo/EAS y Google Maps; dispositivo Android; aprobación editorial y paseo real. Los costes y la contratación se decidirán cuando corresponda. Las credenciales se facilitarán por los mecanismos seguros de cada plataforma, nunca en documentación o chat.

### Después del piloto · Fígaro como siguiente experiencia

Reutilizar el sistema de contenido, pantallas, publicación y reproducción. Conservar `demo-figaro`, `figaro-demo` y `demo-patio` para los borradores sintéticos actuales; cualquier identidad editorial definitiva se decidirá sin convertirlos en Plaza de España. Revisar con Ana guiones, localizaciones, derechos y recursos específicos. No hay fecha comprometida ni hito de Fígaro declarado terminado.

### Dependencias y orden funcional

| Orden | Hito / entrega | Trabajo técnico que puede avanzar | Dependencia externa y evidencia de cierre |
|---|---|---|---|
| 1 | Pulir Entrega 1 | Configuración, diseño, navegación, pruebas y documentación | Revisión visual; Android real sigue separado de web |
| 2 | Primera fuente de Ana / 2 | Editor, modelo, validación y API | AAC accesible, permiso de uso, transcripción revisable, fuentes y aprobación de Ana |
| 3 | Primera parada completa / 3 | Audio, interacción y recuperación de estado | Guion/audio/interacción revisados; pruebas de interrupción en dispositivo |
| 4 | Ampliación / 4 | Pantallas, mapas y fallos sobre datos de prueba aislados | Ana define paradas; localizaciones, geometría y datos prácticos contrastados |
| 5 | Prueba en Plaza de España / 5 | Build de ensayo y correcciones (preparación de 6 en paralelo) | Paseo real, dispositivo/build y feedback registrados; repetición tras corregir |
| 6 | Presentación / 6 | Servicios persistentes, APK, guion y QA | Accesos seguros, derechos, aprobación editorial y dispositivo; sin fechas inventadas |
| 7 | Siguiente experiencia | Reutilizar el sistema para Fígaro | Material y validación específicos, nunca una sustitución de datos del piloto |

Esta tabla ordena las entregas existentes, no crea otro roadmap ni acredita avance. Consultar STATE y QA para conocer lo realmente ejecutado.

## 4. Dirección visual

Inspiración: Sevilla antigua y cercana, a través de patios, cal, albero, azulejería, cerámica y rejería. La identidad debe mantener claridad y comodidad de uso en el móvil.

Propuesta inicial, pendiente de validación visual:

- Fondos de cal y marfil.
- Azul cerámico profundo como color estructural.
- Acentos de albero y terracota.
- Títulos de carácter editorial y texto de lectura sencillo y legible.
- Motivos geométricos discretos en separadores y cabeceras.
- Imágenes culturales con procedencia y derechos registrados.
- Lenguaje cálido y natural, sin imitar el acento por escrito.

Se documentarán colores, tipografías, espaciado, componentes y estados en `docs/design/`. El contraste se comprobará y los estados no dependerán solo del color. Los controles tendrán un área táctil de al menos 44–48 puntos.

Inicio, catálogo, detalle y estado de la primera parada son las pantallas actuales de referencia. La clasificación temática de Plaza de España aún no está aprobada: no se hereda Ópera. No se muestran colecciones vacías como rutas. Al incorporar narración y orientación reales, el relato/audio y el recorrido tendrán sus prioridades de uso respectivas.

## 5. Organización prevista del repositorio

```text
HispaGO/
├── backend/                    Django, API, editor, migraciones y pruebas
├── mobile/                     Expo, interfaz, estado y pruebas
├── docs/
│   ├── PLAN_ENTREGAS_V1.md      Este plan
│   ├── STATE.md                Estado real, bloqueos y siguiente tarea
│   ├── versions.md             Versiones exactas y fecha
│   ├── api.md                  Contrato público
│   ├── architecture.md         Estructura y responsabilidades
│   ├── decisions/              Decisiones y consecuencias
│   ├── design/                 Identidad y componentes
│   ├── content/                Guía fuente, taxonomía y publicación
│   └── qa/                     Plan funcional y resultados
├── .github/workflows/          Verificaciones automáticas
├── compose.yaml
├── AGENTS.md
└── README.md
```

Esta estructura es el objetivo de la entrega 1; su inclusión aquí no significa que los archivos ya existan.

En backend, separar reglas de negocio y publicación de los formularios del Admin y las vistas API. En móvil, separar presentación, cliente API, progreso persistente y reproductor. Evitar servicios adicionales sin una necesidad demostrada.

## 6. Pruebas funcionales documentadas

Las pruebas ejecutables se acompañarán de Markdown que permita entender su propósito y reproducirlas:

| Archivo previsto | Contenido |
|---|---|
| `docs/qa/functional-tests.md` | ID, requisito, precondiciones, pasos y resultado esperado |
| `docs/qa/test-results.md` | Commit, entorno, comando o procedimiento, resultado y evidencia de cada ejecución |
| `docs/qa/android-checklist.md` | Pruebas manuales de GPS, audio, accesibilidad, interrupciones y campo |

Estados de resultado: **pendiente**, **superada**, **fallida**, **bloqueada** y **omitida con motivo**. Indicar cuándo una prueba automatizada no sustituye la manual.

Casos críticos mínimos:

- Los borradores no son accesibles a visitantes.
- Una publicación incompleta se rechaza con errores comprensibles.
- Las versiones publicadas permanecen estables al editar.
- Los filtros respetan su semántica y los parámetros inválidos devuelven 400.
- Las coordenadas GeoJSON conservan el orden longitud/latitud.
- Reimportar no duplica rutas ni pisa contenido enriquecido.
- Cerrar y abrir conserva el progreso y la versión.
- Repetir una misión no duplica XP.
- Datos locales corruptos y fallos de red se recuperan de forma segura.
- El recorrido funciona manualmente al denegar GPS.
- Cambiar de parada no reproduce dos audios simultáneamente.
- Añadir y publicar contenido no necesita recompilar el APK.

## 7. Ramas, revisión y subidas

- Una rama por incremento coherente; varios PR si una entrega resulta demasiado grande.
- Cada PR explica comportamiento, validación realizada y limitaciones.
- Integrar en `main` cambios verificados con la documentación y `STATE.md` actualizados.
- Mantener versiones fijadas y lockfiles; versionar las migraciones.
- Conservar secretos, credenciales de firma, APK y originales de audio fuera de Git.
- Distinguir la subida de código al repositorio, el despliegue del backend y la distribución del APK.
- Registrar identificadores reales de commit y build; no inventar resultados ni accesos.

Las operaciones remotas se ejecutarán cuando estén dentro del encargo autorizado y con los accesos disponibles. Este plan no confirma push, PR, despliegue ni publicación realizados.

## 8. Qué hace falta para comenzar

**La entrega 1 puede comenzar sin aportaciones adicionales de Antonio.**

Supuestos iniciales:

- Nombre de trabajo: HispaGo.
- Idioma: español.
- Plataforma prioritaria: Android.
- Arquitectura y límites: los de la guía fuente.
- Diseño: la dirección sevillana descrita en este documento.
- Datos iniciales: demostración identificada, sin atribuirle validez turística.

Si ya existen logotipo, tipografías, imágenes propias o referencias visuales, podrán incorporarse respetando sus licencias. Su ausencia no bloquea el trabajo.

El Excel, contenido aprobado, voz y cuentas externas se pedirán al llegar al paso que los necesite. No se requieren para preparar la base técnica y visual.

## 9. Registro histórico del plan inicial (sustituido como estado activo)

- Repositorio inspeccionado: `/workspace/HispaGO`.
- Rama local: `main`, sin commits en el momento de redactar el plan.
- Código de aplicación y pruebas: todavía no implementados.
- Este documento define el trabajo; no inicia automáticamente la entrega 1.
- Siguiente paso propuesto: implementar la entrega 1 y avanzar después hacia la primera parada completa de la entrega 3, previa base editorial y API de la entrega 2.

Las líneas anteriores describen el repositorio vacío del 21 de octubre; no son instrucciones de arranque ni estado actual. Consultar STATE. No se fijan fechas ni estimaciones comprometidas. El siguiente paso vigente es recibir/revisar la fuente de Ana y preparar la base editorial de entrega 2, antes de la parada vertical de entrega 3.
