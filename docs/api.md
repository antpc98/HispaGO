# API · Contrato disponible en la entrega 1

## GET /health/

Lectura pública operativa. Ejecuta `SELECT 1` sobre la conexión predeterminada.
No expone nombres de servidor, excepciones, credenciales ni versiones de software.

Respuesta 200:

```json
{ "status": "ok", "checks": { "database": "ok" } }
```

Si la base no está disponible, respuesta 503:

```json
{ "status": "unavailable", "checks": { "database": "unavailable" } }
```

Cabecera `Cache-Control: no-store`. GET y HEAD permitidos; métodos de escritura
devuelven 405. Es una comprobación de conexión, no una validación de contenidos
ni una confirmación de despliegue listo para producción.

## /admin/

Interfaz editorial base de Django. Requiere usuario activo con acceso staff y
sesión autenticada. Formularios protegidos por CSRF. El contenido cultural y los
permisos editoriales específicos se implementarán en la entrega 2.

## Contrato previsto, todavía no implementado

`/api/v1/taxonomy/`, `/api/v1/routes/`, detalle, versiones, experiencia y
`/api/schema/` pertenecen a la entrega 2. No deben consumirse como disponibles.
Los requisitos de filtros, paginación, permisos y versiones están en la guía.
