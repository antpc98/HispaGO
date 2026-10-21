# Identidad visual · Sevilla, a tu paso

Dirección inicial de la entrega 1, pendiente de valoración de Antonio y Ana.

La interfaz se inspira en cal, patios, cerámica, albero y rejería. Usa composición
editorial, ornamentación geométrica discreta y lenguaje cercano. La ilustración
representa un patio imaginado: no es una localización de Fígaro.

## Tokens

| Uso | Valor |
|---|---|
| Fondo de cal | `#F8F3EA` |
| Superficie | `#FFFCF6` |
| Azul cerámico / texto principal | `#153E4A` |
| Texto secundario | `#5E6865` |
| Terracota / acento textual | `#A6422C` |
| Albero decorativo | `#D5A552` |
| Salvia / superficies | `#DDE4D6` |

El albero no se usa como texto informativo sobre fondo claro. Los valores de
contraste medidos y las comprobaciones de accesibilidad están en el reporte QA.

Títulos: Cormorant Garamond. Texto y controles: DM Sans. Los archivos se
empaquetan localmente y sus licencias se registran en el inventario de recursos.

Controles de al menos 48 puntos de alto, categorías seleccionadas con marca y
color, etiquetas accesibles, texto ampliable y adaptación a anchos de pantalla.
La prueba de lector de pantalla y texto grande en Android sigue pendiente.

## Pantallas de referencia

- [Explorar](screenshots/explorar.png): propuesta, búsqueda y categorías locales.
- [Detalle](screenshots/detalle.png): presentación, datos pendientes y acceso a la parada demo.
- [Parada](screenshots/parada.png): relato ficticio, audio pendiente y ejemplo desplegable.

Las capturas proceden de Chromium con viewport móvil, no de un APK instalado.
La exportación web es una herramienta de revisión; el producto principal sigue
siendo Android.

Para regenerarlas después de exportar web, desde `mobile` en Linux:

```sh
CAPTURE_DESIGN=1 npm run test:e2e
```

En PowerShell: `$env:CAPTURE_DESIGN='1'` y después `npm run test:e2e`.
