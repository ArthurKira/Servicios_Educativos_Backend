const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { sequelize } = require('./src/models');
const routes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/api', routes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        message: 'API de Servicios Educativos',
        version: '1.0.0',
        endpoints: {
            serviciosEducativos: '/api/servicios-educativos'
        }
    });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Inicializar servidor
const startServer = async () => {
    try {
        // Probar conexión a la base de datos
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos establecida correctamente.');

        // Sincronizar modelos (opcional, comentar en producción)
        // await sequelize.sync({ alter: true });
        // console.log('✅ Modelos sincronizados.');

        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
            console.log(`📚 Endpoint: http://localhost:${PORT}/api/servicios-educativos`);
        });
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

startServer();

module.exports = app;

