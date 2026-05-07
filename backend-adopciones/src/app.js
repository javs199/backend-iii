const express = require('express');
const swaggerDocs = require('./config/swagger');
const errorHandler = require('./middlewares/errorHandler');

const userRouter = require('./routes/user.router');
const petRouter = require('./routes/pet.router');
const adoptionRouter = require('./routes/adoption.router');

const app = express();

// Middlewares base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Swagger (Documentación)
swaggerDocs(app);

// Rutas
app.use('/api/users', userRouter);
app.use('/api/pets', petRouter);
app.use('/api/adoptions', adoptionRouter);

// Manejo centralizado de errores
app.use(errorHandler);

module.exports = app;
