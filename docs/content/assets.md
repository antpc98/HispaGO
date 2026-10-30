# Recursos, procedencia y derechos · Entrega 1

Prioridad vigente (30 de octubre): **Plaza de España · Una historia para mirar despacio**.
Los recursos de Fígaro se conservan para la siguiente experiencia, no se asocian a Plaza.
La guía original se mantiene íntegra como fuente histórica; su prioridad anterior está
sustituida por el roadmap vigente y ADR 0002.

| Recurso | Procedencia | Uso y estado |
|---|---|---|
| Patio vectorial y cenefa | Código original de esta entrega | Ilustración geométrica de una escena imaginada; no fotografía ni localización verificada |
| Iconos lineales | Trazados originales simples en `Icon.tsx` | Interfaz, sin descarga de una biblioteca de imágenes |
| Favicon web | Trazado original de una H en SVG embebido en `+html.tsx` | Sin petición externa, mantiene el sitio sin error de recurso inexistente |
| Cormorant Garamond | Paquete `@expo-google-fonts/cormorant-garamond@0.4.1` | SIL Open Font License 1.1; licencia incluida en el paquete npm |
| DM Sans | Paquete `@expo-google-fonts/dm-sans@0.4.2` | SIL Open Font License 1.1; licencia incluida en el paquete npm |
| Texto del patio | Ficción creada para demostrar la interfaz | Identificado como demo; no aprobado para la ruta editorial |
| Título de Fígaro y concepto | Guía de desarrollo facilitada por Antonio | Propuesta pendiente de aprobación editorial |
| Guía de desarrollo | Archivo aportado por Antonio | Copia íntegra en esta carpeta; SHA-256 verificado al incorporarla |
| `mobile/assets/images/sevilla-hero.png` | Generada para HispaGo con la herramienta de imágenes de la sesión | Evocación artística de Sevilla; no fotografía ni prueba de una ubicación |
| `mobile/assets/images/figaro-cover.png` | Generada para HispaGo con la herramienta de imágenes de la sesión | Protagonista ficticia de ópera y ciudad imaginada; no retrato de una persona identificada ni escena histórica documentada |
| `mobile/assets/images/plaza-de-espana.png` | Generada específicamente para esta revisión con la herramienta de imágenes disponible | Ilustración artística de Plaza de España; no fotografía, reconstrucción validada ni plano. Uso local de presentación, pendiente de valoración editorial de Ana |

## Ilustraciones de la revisión visual

Se crearon a partir de descripciones propias para aproximar el ambiente de las
referencias de interfaz aportadas por Antonio. No se extrajeron imágenes de las
pantallas de referencia ni se descargó material de un banco de fotografías.
El generador no expuso identificador de modelo, versión o semilla. No se presenta
su resultado como reconstrucción geográfica o histórica.

| Archivo | Resolución | SHA-256 |
|---|---|---|
| `sevilla-hero.png` | 1024 × 1536 | `9de31f3403a39682a04f03c4316e8878661c49fc9cd08066859e559a8840db18` |
| `figaro-cover.png` | 1536 × 1024 | `37b8cf6bb2d004865daa73e64e6852758a76ea83e73339cd80bf0a8090c441ef` |

Se versionan las copias utilizadas en la app. Las imágenes forman parte del
bundle y no necesitan un servicio de generación disponible al abrir la demo.
La selección y aprobación del material editorial definitivo siguen en la entrega 5,
con revisión temprana de la primera fuente de Ana en entrega 2.
El patio vectorial anterior se conserva en código como recurso de la primera
propuesta; las pantallas revisadas usan las nuevas portadas.

Las fuentes son de distribución abierta, no contenido turístico. Al preparar
una distribución nativa se conservarán las licencias y atribuciones pertinentes.
Se conservan copias de las dos licencias en `licenses/`.

No hay música, grabaciones, fotografías, coordenadas ni geometría turística en
esta entrega. No se han contratado servicios ni producido una voz provisional.

Para la entrega editorial, registrar cada archivo: autor, origen, licencia,
atribución, versión, checksum y aprobación. Los originales de grabaciones se
conservarán fuera de Git, siguiendo la guía.

## Recurso específico de Plaza de España · 30 de octubre de 2026

- Archivo: `mobile/assets/images/plaza-de-espana.png`, 1536 × 1024 px, PNG local.
- SHA-256: `1ecd335b03de0f56caa6d9d30b0dd739cb15d3707b068fe59659eff924e0ee4a`.
- Generación mediante la capacidad de imágenes de la sesión, con descripción propia:
  fachada curva reconocible, dos torres, canal y cerámica azul; sin Giralda,
  personajes de ópera, texto ni marcas de mapa. No se extrajo de la referencia
  del usuario ni de una fotografía privada. Sin modelo/semilla expuestos por la herramienta.
- Inspección visual: recurso artístico reconocible, no reconstrucción medida.
  La fidelidad arquitectónica y su uso editorial definitivo requieren valoración de Ana.
- La app usa proporción 3:2 y `contain` para mostrar el encuadre completo. Texto
  fuera de la imagen y descripción accesible que identifica su naturaleza artística.
- El original generado se conserva fuera del repo; la copia usada va en el bundle.
  No depende de un generador al abrir la app.

El AAC mencionado por Antonio **no está disponible** entre los adjuntos accesibles.
No se ha copiado a Git, transcrito, escuchado ni imitado la voz. Su registro de
procedencia y revisión está en [plaza-de-espana-editorial.md](plaza-de-espana-editorial.md).
