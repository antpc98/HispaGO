# ADR 0002 · Plaza de España como primer piloto

Fecha: 30 de octubre de 2026. Estado: adoptada por petición de Antonio, que traslada la solicitud de Ana. Sustituye la prioridad de Fígaro de la guía original y del plan inicial; no cambia el stack de ADR 0001.

## Producto y fuente de verdad

Inspección inicial: `feat/delivery-1-foundation` estaba limpia en `bd356c9`, igual que
su referencia remota. Inicio contenía hero fijo, cuatro colecciones y enlaces a
categorías vacías; `/routes` destacaba `demoRoute` de Fígaro; detalle y parada
importaban ese objeto directamente. La pestaña La propuesta apuntaba al mismo
detalle. El patio y su pregunta eran ficción; mapa, audio y métricas eran
placeholders. Búsqueda y desplegable sí funcionaban, pero no API, GPS, reproducción,
XP o persistencia. La prioridad anterior aparecía en plan, guía, estado, diseño,
arquitectura, tests y recursos; este incremento alinea los documentos activos y
conserva la guía y resultados antiguos como historia explícita.

Primera experiencia: **Plaza de España · Una historia para mirar despacio**. Es un solo título decidido, no título más subtítulo; un salto visual después de `·` no altera los datos ni su etiqueta accesible. Código y slug: `plaza-de-espana`, independientes de futuros cambios comerciales. El roadmap vigente es [PLAN_ENTREGAS_V1.md](../PLAN_ENTREGAS_V1.md); STATE registra lo realmente disponible. La guía original se conserva íntegra como fuente histórica sustituida en esta prioridad.

Fígaro es la siguiente experiencia en backlog. Se conservan `demo-figaro`, `figaro-demo`, `demo-patio`, `patio-demo`, su ficción e imágenes. No se reutilizan para Plaza de España. La configuración de presentación está en `mobile/src/demo/catalog.ts`; no son modelos editoriales publicados ni una migración de base de datos.

## Límite editorial

Ana decide las paradas y valida el contenido turístico, las fuentes, localizaciones, recorrido y datos prácticos. El título ya no requiere elección. La categoría del piloto es `null` hasta una revisión: no se infiere Historia, Arte u Ópera del nombre o de la imagen.

El usuario identifica `AUDIO-2026-10-30-12-19-47.aac` como fuente de la primera parada. No hay archivo accesible ni identificador de adjunto utilizable en esta sesión; no se ha escuchado, transcrito ni extraído su enfoque. Ver [registro editorial](../content/plaza-de-espana-editorial.md). La descripción de la app es una propuesta de producto del encargo, no una adaptación atribuida al audio. La pantalla de primera parada muestra el bloqueo, no una muestra narrativa ficticia ni un reproductor falso.

Originales privados fuera de Git; referencia sin rutas personales ni URLs privadas. Transcripción fiel revisable con tiempos y dudas separada de la adaptación; revisión factual separada de la escucha. No clonar voz ni fabricar grabaciones.

## Navegación y avisos

- Inicio presenta el piloto y una acción principal antes de la ilustración.
- Rutas contiene el catálogo local; detalle y parada pertenecen a Rutas. Se elimina La propuesta como pestaña redundante.
- Volver usa `dismissTo` al destino padre: recupera la pantalla existente o la sustituye si el acceso fue directo. Las pestañas cambian de sección mediante `replace`, sin depender de un historial externo.
- Búsqueda y disponibilidad usan URL y estado de sesión en memoria. Al abrir un detalle se conserva el contexto; al recargar el catálogo se recuperan los filtros presentes en URL, no un progreso turístico.
- Scroll de catálogo/detalle recordado durante la sesión; nueva sesión sin scroll guardado. Foco web dirigido al encabezado al entrar, sin desplazar el scroll restaurado.
- Un control de 48 px abre la explicación de prototipo. No hay mensajes de números de entrega en la interfaz turística, mapa pendiente dominante ni campos prácticos vacíos repetidos.
- El sol anterior era decoración sin acción; se retira. No se añaden controles de favoritos, perfil, reproducción o inicio de recorrido inexistentes.

## Catálogo y reutilización

Las antiguas colecciones de Inicio mezclaban conceptos: Arte y cultura abría Ópera, mientras otras categorías estaban vacías. Se retiran esas colecciones y sus filas de próximas rutas. Las categorías futuras se derivan de las clasificaciones revisadas de las propuestas visibles; con ninguna revisada no se muestra una taxonomía ficticia. La disponibilidad es un filtro distinto: “Con narración disponible” produce un vacío explicado porque no hay reproducción en Entrega 1. La búsqueda se normaliza en acentos, mayúsculas y espacios exteriores. Limpiar restablece búsqueda y todos los filtros.

Portada, título completo, etiqueta compacta, descripción, enfoque, clasificación, estado y muestra salen de la configuración. Los componentes compartidos no convierten el patio de Fígaro en una parada de Plaza de España. Añadir una propuesta exige configuración y entradas de Expo Router, no rehacer pantallas.

## Consecuencias

Sin nuevas dependencias, cambio de stack ni migraciones. Se mantienen los hitos técnicos, con revisión del material de Ana antes de la parada completa y ampliación validada antes de campo/presentación. Web/Chromium, bundle Android, dispositivo y paseo real siguen siendo evidencias diferentes. Ninguna pantalla acredita audio, mapa o progreso implementados.
