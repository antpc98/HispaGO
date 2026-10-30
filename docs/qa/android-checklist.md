# Verificación Android · Pendiente

Ninguna fila de este documento se considera ejecutada por pasar Jest, Playwright
o la exportación Android. Registrar dispositivo, versión Android, build, commit,
fecha, responsable y evidencia al realizar cada prueba.

| Caso | Resultado esperado | Estado |
|---|---|---|
| Abrir prototipo compatible | Plaza de España protagonista, CTA temprano y portada reconocible | Pendiente de dispositivo |
| Navegación Inicio/catálogo/detalle/estado de parada | Entrar, volver, conservar contexto y usar atrás del sistema correctamente | Pendiente de dispositivo |
| Safe areas y último contenido | Sin solapamiento con notch/barra del sistema o navegación inferior | Pendiente de dispositivo |
| Fuente ampliada | Textos legibles y controles sin recortes | Pendiente de dispositivo |
| TalkBack | Orden comprensible, botones y estados anunciados | Pendiente de dispositivo |
| APK autónomo | Arranque sin Metro ni ordenador | Entrega 6, no disponible |
| GPS denegado e impreciso | Ruta manual y proximidad honesta | Entrega 4, no disponible |
| Audio, llamadas y auriculares | Controles e interrupciones seguros | Entregas 3–4, no disponible |
| Pantalla bloqueada | Comportamiento comprobado y documentado | Entregas 3–6, no disponible |
| Cierre y reapertura | Progreso conservado y XP no duplicado | Entregas 3–4, no disponible |
| Paseo real | Localizaciones, tiempos y caminos verificados | Entregas 5–6, no disponible |

No hay prueba real en iPhone ni VoiceOver. Las capturas a 320/390/430/768 px y el
texto ampliado en Chromium son emulación web, no validan safe areas con notch ni
escalado de fuente nativo. El material de Ana y la validación de Plaza de España
deben resolverse antes de marcar la experiencia turística como funcional.
