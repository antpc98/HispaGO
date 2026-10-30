# Dirección visual · Plaza de España

Revisión de Entrega 1 · 30 de octubre de 2026. Primera experiencia: **Plaza de España · Una historia para mirar despacio**. El nombre está decidido; la valoración visual y turística de Ana sigue pendiente. Fígaro permanece en backlog con sus recursos separados.

## Composición y jerarquía

- Se conserva crema, terracota, azul profundo y tipografía editorial: Cormorant Garamond + DM Sans, locales.
- Inicio cambia el hero fijo de 425 px por contenido fluido: título completo → descripción → CTA → ilustración 3:2. El acceso principal no depende de bajar más allá de una imagen.
- El título es un solo dato y etiqueta accesible. Se permite salto visual después de `·`, sin truncar ni reducirlo a una tipografía minúscula. Catálogo usa “Plaza de España” como etiqueta compacta, con título completo en el nombre accesible de la tarjeta.
- Portada artística propia reconocible, sin Giralda, personajes u ópera representando Plaza. Se muestra completa con `contain`, sin estirar ni recortar sus torres.
- Detalle: propuesta, CTA al estado del material, imagen, enfoque, muestra disponible e información práctica. No hay mapa decorativo ni métricas pendientes dominantes.
- Sin colecciones de Inicio que abran categorías vacías. Catálogo protagonista; filtro de disponibilidad explícito y vacío recuperable. Las clasificaciones temáticas esperan revisión de contenido, no se deducen del edificio.
- Barra Inicio/Rutas, con pertenencia de detalle/parada a Rutas y márgenes finales para no tapar contenido.

## Avisos y controles

Un control “Prototipo · Qué puedes explorar” muestra las capacidades/limitaciones de forma desplegable y accesible. No se repiten demo/vista previa/por validar en cada bloque. La fuente inaccesible y la falta de datos prácticos se explican en su contexto. No hay referencias de entregas futuras en textos turísticos.

Se retira el sol decorativo de la cabecera y los cierres/eslóganes repetidos. Cada control tiene acción; no hay botones que aparenten reproducción, favoritos, navegación GPS o progreso. Controles de al menos 44 px (principales 48–52); foco web al entrar y posibilidad de tabular/activar con teclado.

## Tokens conservados

| Uso | Valor |
|---|---|
| Cal / fondo | `#F7F3E9` |
| Superficie | `#FFFCF6` |
| Azul profundo / texto | `#182C3D` |
| Texto secundario | `#5E6865` |
| Terracota / acción | `#A4422D` |
| Arena / aviso | `#E9DDC2` |
| Oliva / recurso secundario | `#756238` |

Texto sobre fondos sólidos: contraste estable sin depender del velo de una imagen. Referencias de medición en QA. No es una auditoría completa de accesibilidad ni acredita experiencia en dispositivo.

## Evidencias actuales

Capturas en `screenshots/plaza-de-espana/`, generadas por Playwright cuando `CAPTURE_DESIGN=1`. Las imágenes antiguas de Fígaro en la carpeta superior se conservan como histórico, no representan la prioridad vigente.

| Inicio · 390 px | Catálogo · 390 px | Detalle · 390 px |
|---|---|---|
| [Inicio](screenshots/plaza-de-espana/inicio-390.png) | [Rutas](screenshots/plaza-de-espana/explorar-390.png) | [Detalle](screenshots/plaza-de-espana/detalle-390.png) |

[Estado de primera parada](screenshots/plaza-de-espana/parada-390.png). Hay series de Inicio/catálogo/detalle/parada a 320, 390, 430 y 768 px, tanto normales como con todo el texto (incluidos encabezados) ampliado al 200 %. Se espera a hidratación, fuentes y carga real de imágenes. Las 32 capturas se guardan a escala CSS para no añadir imágenes retina innecesarias al repositorio.

Método: Chromium emulado con viewport ajustado; ampliación de tamaño y alto de línea calculados sobre nodos de texto. No equivale a zoom completo del navegador, font scaling nativo, iPhone real, safe area con notch ni APK. SafeAreaView y separación inferior se conservan; comprobar en dispositivo.

Reproducir desde `mobile`, tras exportar web:

```sh
CAPTURE_DESIGN=1 npm run test:e2e
```

En PowerShell: `$env:CAPTURE_DESIGN='1'`, `npm.cmd run test:e2e`, después `Remove-Item Env:CAPTURE_DESIGN`. En cloud se indica Chromium del sistema mediante `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium`. Resultados reales y límites en [QA](../qa/test-results.md).
