# Backend III - API REST de Adopciones

Una API REST para gestionar adopciones de mascotas. Desarrollada como proyecto final del Bootcamp Backend III de Coder House.

## Repositorio

GitHub: [javs199/backend-iii](https://github.com/javs199/backend-iii)

## Requisitos

- Node.js >= 22

## Instalación local

Primero, navega a la carpeta del proyecto:

```bash
cd backend-adopciones
```

Instala las dependencias:

```bash
npm install
```

## Ejecución local

Primero, navega a la carpeta del proyecto:

```bash
cd backend-adopciones
```

Inicia el servidor en modo desarrollo con hot-reload:

```bash
npm run dev
```

O inicia en modo producción:

```bash
npm start
```

El servidor se ejecutará en `http://localhost:8080`

## Documentación de API

Accede a la documentación interactiva de Swagger en:

```
http://localhost:8080/api/docs
```

## Tests

Primero, navega a la carpeta del proyecto:

```bash
cd backend-adopciones
```

Ejecuta los tests:

```bash
npm test
```

## Cobertura de tests

Primero, navega a la carpeta del proyecto:

```bash
cd backend-adopciones
```

Genera el reporte de cobertura:

```bash
npm run test:coverage
```

El reporte HTML se genera en:

```
coverage/lcov-report/index.html
```

Abre este archivo en tu navegador para ver la cobertura detallada.

## Docker

### Build de la imagen

Primero, navega a la carpeta del proyecto:

```bash
cd backend-adopciones
```

Construye la imagen Docker:

```bash
docker build -t backend-adopciones:1.0.0 .
```

### Ejecutar el contenedor

Primero, navega a la carpeta del proyecto:

```bash
cd backend-adopciones
```

Ejecuta el contenedor:

```bash
docker run -d --name backend-adopciones -p 8080:8080 backend-adopciones:1.0.0
```

Accede a la API en `http://localhost:8080`

### Imagen pre-compilada

Las imágenes oficiales están disponibles en DockerHub:

[javs199/backend-adopciones](https://hub.docker.com/r/javs199/backend-adopciones)

Tags disponibles:
- `1.0.0`
- `latest`

```bash
docker run -d --name backend-adopciones -p 8080:8080 javs199/backend-adopciones:latest
```

## Endpoints

### Users
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/docs` - Documentación completa en Swagger

### Pets
- `GET /api/pets` - Obtener todas las mascotas
- `GET /api/docs` - Documentación completa en Swagger

### Adoptions
- `GET /api/adoptions` - Obtener todas las adopciones
- `GET /api/adoptions/:aid` - Obtener una adopción por ID
- `POST /api/adoptions/:uid/:pid` - Crear una nueva adopción
- `DELETE /api/adoptions/:aid` - Cancelar una adopción
- `GET /api/docs` - Documentación completa en Swagger

## Tecnologías

- **Express.js** - Framework web
- **Jest** - Testing framework
- **Swagger/OpenAPI** - Documentación de API
- **Docker** - Containerización

## Estructura del proyecto

```
src/
├── data/           Datos fake para desarrollo
├── repositories/   Acceso a datos (patrón Repository)
├── services/       Lógica de negocio
├── controllers/    Manejadores de requests
├── routes/         Definición de endpoints
├── middlewares/    Middleware de manejo de errores
├── config/         Configuración (Swagger)
├── app.js          Setup de Express
└── server.js       Entry point
```

## Licencia

MIT
