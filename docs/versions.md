# Versiones fijadas · Entrega 1

Resolución e instalación: 21 de octubre de 2026. Plataforma comprobada: Linux x86_64.

| Componente | Versión |
|---|---|
| Python | 3.13.5 (`.python-version`) |
| Django | 5.2.18 LTS |
| Django REST Framework | 3.18.3 |
| psycopg / psycopg-binary | 3.3.6 |
| PostgreSQL | 17.11, imagen oficial fijada por digest |
| Node | 24.19.0 (`.nvmrc`) |
| npm comprobado | 11.9.0 |
| Expo SDK | 58 (`expo@58.0.16`) |
| Expo Router | 58.0.24 |
| React / React DOM | 19.3.0 |
| React Native | 0.88.0 |
| React Native Web | 0.21.4 |
| react-native-svg | 15.16.0 |
| TypeScript | 6.0.3 |
| Jest / jest-expo | 30.5.2 / 58.0.11 |
| React Native Testing Library | 14.1.0 |
| Test Renderer | 1.3.1 |
| Playwright | 1.64.1 |
| ESLint / configuración Expo | 9.39.5 / 58.0.4 |
| Prettier | 3.9.10 |
| Expo Doctor | 1.21.5 |
| Ruff | 0.17.1 |
| uv usado en cloud | 0.12.23 |
| Docker / Compose comprobados | 28.4.0 / 2.40.3 |

La lista completa está en `backend/requirements*.txt` y `mobile/package-lock.json`.
Instalar desde los locks; no regenerar el proyecto con `create-expo-app@latest`.

## Actualización controlada

Python: modificar límites en los `.in` solo cuando sea necesario y regenerar
ambos locks con uv 0.12.23, desde `backend`:

```sh
uv pip compile requirements.in --python-version 3.13 --generate-hashes --no-emit-index-url --output-file requirements.txt
uv pip compile requirements-dev.in --python-version 3.13 --generate-hashes --no-emit-index-url --output-file requirements-dev.txt
```

Revisar que las versiones comunes coincidan en ambos locks y ejecutar las
comprobaciones de backend. Los hashes se verifican durante la instalación.

Expo: seguir la matriz del SDK fijado. Los módulos nativos se instalan con
`expo install`, se revisan los cambios y se ejecutan tipos, lint, tests y bundles.
No usar `audit fix --force`, cambios de SDK o exclusiones de doctor como una
corrección automática de compatibilidad.

La consulta online de Expo Doctor sigue pendiente. ESLint 9 emite un aviso de
fin de soporte; la actualización a ESLint 10 requiere comprobar la compatibilidad
de la configuración Expo y se revisará en mantenimiento. El toolchain contiene
además avisos transitivos detectados durante la instalación/auditoría inicial;
la base no constituye una revisión de seguridad de producción.
