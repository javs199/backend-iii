# Backend Adopciones

API REST minimalista para gestionar adopciones de mascotas.

## Propósito del Proyecto
Este proyecto provee la base funcional de una API REST aplicando una arquitectura limpia en capas (`Routes`, `Controllers`, `Services`, `Repositories`). Está preparado para ser extendido en futuras fases con tests (unitarios e integrales), conexión real a base de datos, y despliegues en contenedores (Docker). Actualmente utiliza persistencia en memoria para facilitar su comprensión, evaluación y desarrollo inicial.

## Entidades Principales
- **Users**: Representa a los adoptantes en el sistema.
- **Pets**: Representa a las mascotas disponibles o adoptadas en el sistema.
- **Adoptions**: Registra el vínculo y el momento exacto en el que un usuario (User) adoptó a una mascota (Pet).

## Endpoints Disponibles

**Users**
- `GET /api/users` - Obtiene todos los usuarios del sistema.

**Pets**
- `GET /api/pets` - Obtiene todas las mascotas del sistema.

**Adoptions**
- `GET /api/adoptions` - Obtiene todas las adopciones registradas.
- `GET /api/adoptions/:aid` - Obtiene el detalle de una adopción en particular.
- `POST /api/adoptions/:uid/:pid` - Genera una nueva adopción asociando al usuario (`uid`) y mascota (`pid`).
- `DELETE /api/adoptions/:aid` - Cancela/elimina una adopción existente y vuelve a dejar a la mascota disponible.

## Stack Usado
- **Node.js**
- **Express**
- **Swagger (swagger-jsdoc, swagger-ui-express)** para documentación OpenAPI.

## Instalación de dependencias

```bash
npm install
```

## Ejecución del proyecto

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## Documentación de la API (Swagger)
Una vez que el servidor esté corriendo, puedes acceder a la documentación interactiva generada con Swagger en la siguiente URL:

[http://localhost:8080/api/docs](http://localhost:8080/api/docs)
