const app = require('./app');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
  console.log(`📑 Documentación Swagger disponible en: http://localhost:${PORT}/api/docs`);
});
