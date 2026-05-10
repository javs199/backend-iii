# Backend Adopciones

## 1. Descripción general
API REST minimalista diseñada para gestionar el ciclo de adopciones de mascotas. El foco técnico principal de este proyecto es la construcción de una arquitectura sólida para el router `adoption.router.js`, su validación exhaustiva mediante pruebas funcionales, su documentación interactiva y su posterior contenerización para despliegue universal.

## 2. Objetivo académico
Este proyecto forma parte de la entrega final del curso Backend III. Su objetivo no es construir una aplicación monolítica repleta de integraciones y base de datos, sino demostrar el dominio de conceptos avanzados de backend como:
- Separación de responsabilidades mediante arquitectura por capas.
- Pruebas funcionales rigurosas con alta cobertura.
- Documentación automatizada de APIs.
- Prácticas modernas de despliegue mediante Docker y publicación en DockerHub.

## 3. Stack utilizado
- **Entorno de ejecución:** Node.js
- **Framework web:** Express
- **Pruebas y Cobertura:** Jest, Supertest
- **Documentación API:** Swagger (swagger-jsdoc, swagger-ui-express)
- **Contenerización:** Docker
- **Distribución en la nube:** DockerHub
- **Seguridad:** Docker Scout

## 4. Estructura del proyecto
La arquitectura sigue un patrón limpio por capas, aislando rutas, controladores, servicios y persistencia:

```text
backend-adopciones/
├── src/
│   ├── app.js                 # App de Express (Aislada para Supertest)
│   ├── server.js              # Entrypoint real (Levanta el puerto 8080)
│   ├── config/                # Configuraciones (Swagger)
│   ├── routes/                # Definición de Endpoints
│   ├── controllers/           # Manejo de Req/Res
│   ├── services/              # Lógica de Negocio Central (Lanza errores)
│   ├── repositories/          # Lógica de Persistencia y Acceso a Datos
│   ├── middlewares/           # Manejador Global de Errores
│   └── data/                  # Base de datos Fake en Memoria y Reset de estado
├── tests/
│   └── functional/            # Suites de tests funcionales (Supertest)
├── .dockerignore
├── .env.example
├── Dockerfile
├── jest.config.js
├── package.json
└── README.md
```

## 5. Entidades principales
- **Users**: Representan a los adoptantes potenciales.
- **Pets**: Mascotas disponibles en el sistema con su estado de adopción actual.
- **Adoptions**: Registro vinculante e inmutable (hasta ser eliminado) que une a un usuario y una mascota mediante sus respectivos IDs.

## 6. Endpoints disponibles

### 🔹 Módulo de Usuarios
- `GET /api/users`: Lista todos los usuarios.

### 🔹 Módulo de Mascotas
- `GET /api/pets`: Lista todas las mascotas.

### 🔹 Módulo de Adopciones (Router Principal)
- `GET /api/adoptions`: Lista todas las adopciones históricas.
- `GET /api/adoptions/:aid`: Obtiene el detalle de una adopción en particular.
- `POST /api/adoptions/:uid/:pid`: Crea una adopción (vincula un User a un Pet). Valida que la mascota no haya sido adoptada previamente.
- `DELETE /api/adoptions/:aid`: Cancela una adopción y libera a la mascota para volver a ser adoptada.

## 7. Documentación Swagger/OpenAPI
El proyecto cuenta con documentación autogenerada y visualmente interactiva donde se pueden probar las peticiones directamente.
* **URL (Local):** [http://localhost:8080/api/docs](http://localhost:8080/api/docs)

## 8. Instalación local

1. Clonar este repositorio.
2. Ingresar a la carpeta raíz del proyecto.
3. Instalar las dependencias de Node.js:
```bash
npm install
```

## 9. Ejecución local

Para iniciar el servidor en modo desarrollo (usando Nodemon):
```bash
npm run dev
```

Para iniciar el servidor en modo producción:
```bash
npm start
```
El servidor escuchará por defecto en el puerto **8080**.

## 10. Ejecución de tests funcionales
La suite de pruebas con Jest + Supertest está construida de forma que **no levanta el puerto real** y asegura que cada test inicie con un entorno de datos totalmente limpio.
```bash
npm test
```

## 11. Ejecución de cobertura (Coverage)
```bash
npm run test:coverage
```

### Resultados Destacados (Adoption Router)
- **Test Suites:** 1 passed, 1 total
- **Tests:** 12 passed, 12 total
- **Cobertura destacada:** `adoption.router.js`, `adoption.controller.js` y `adoption.service.js` alcanzan 100% de cobertura en la suite funcional.

## 12. Dockerización
El proyecto ha sido contenerizado utilizando `node:20-alpine` como imagen base para asegurar el mínimo peso de la imagen final y máxima velocidad de empaquetado. Un archivo `.dockerignore` previene que código basura, módulos locales, entornos virtuales y reportes de cobertura lleguen a la imagen.

## 13. Ejecución con Docker local
Si deseas construir y probar la imagen en tu máquina sin utilizar Node.js nativo:
```bash
# 1. Construir la imagen
docker build -t backend-adopciones:1.0.0 .

# 2. Levantar el contenedor
docker run -d --name backend-adopciones-test -p 8080:8080 backend-adopciones:1.0.0
```

## 14. Imagen en DockerHub
La imagen oficial compilada está alojada públicamente en el registro de DockerHub para ser utilizada desde cualquier servidor.
* **URL Pública:** [https://hub.docker.com/r/javs199/backend-adopciones](https://hub.docker.com/r/javs199/backend-adopciones)

**Tags disponibles:**
- `javs199/backend-adopciones:1.0.0`
- `javs199/backend-adopciones:latest`

## 15. Ejecución directa desde DockerHub
Cualquier persona puede ejecutar el proyecto de forma rápida descargando la imagen desde DockerHub:
```bash
# 1. Descargar imagen
docker pull javs199/backend-adopciones:1.0.0

# 2. Ejecutar contenedor
docker run -d --name backend-adopciones-dockerhub-test -p 8080:8080 javs199/backend-adopciones:1.0.0
```

## 16. Escaneo básico de seguridad (Docker Scout)
Como buena práctica, la imagen base ha sido analizada contra vulnerabilidades utilizando `docker scout`.
```bash
docker scout quickview javs199/backend-adopciones:1.0.0
```
**Resultados del análisis (Imagen base node:20-alpine):**
- 0 Críticas, 11 Altas, 3 Medias, 2 Bajas.
- *Nota académica:* Se decidió mantener `node:20-alpine` de forma deliberada por ofrecer la mayor estabilidad LTS compatible con las librerías exigidas en la cursada, evitando así posibles dependencias rotas al subir a Node 26.

## 17. Notas técnicas importantes
- Los errores globales controlados (ej: `PET_ALREADY_ADOPTED` o `USER_NOT_FOUND`) han sido silenciados del `console.error` nativo de la terminal de pruebas cuando `NODE_ENV === "test"`. Esto mantiene la salida de Jest impecable.
- Se implementó una base de datos ficticia en memoria (arrays de objetos en `src/data/`), junto con una utilidad de reinicio `resetFakeData()`, lo cual garantiza un ambiente aislado de pruebas E2E y previene la falsificación de positivos por acumulación de estado de memoria.

## 18. Autor
- **Alumno:** Jesus Vargas
- **Curso:** 77315 – Programación Backend (III): Testing y Escalabilidad Flex
