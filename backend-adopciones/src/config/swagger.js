const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Adoption API',
      version: '1.0.0',
      description: 'API REST minimalista para gestionar adopciones de mascotas',
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Extraemos la doc directamente de los comentarios en las rutas
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
