const express = require('express');
const cors = require('cors');
require('dotenv').config();

// PROBLEMA ARREGLADO: Se eliminó import innecesario de { application }
// PROBLEMA ARREGLADO: Se corrigió la ruta del import (estaba apuntando fuera del proyecto)

const app = express();
const userRoute = require("./src/route/users/users.route");
const { testConnection } = require('./connection');

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Rutas principales
app.get('/', function (req, res) {
    res.json({
        message: 'Study App API',
        version: '1.0.0',
        status: 'running',
        timestamp: new Date().toISOString(),
        endpoints: {
            users: '/api/users',
            legacy_users: '/users/list',
            health: '/health'
        }
    });
});

app.get('/health', async function (req, res) {
    try {
        // Verificar conexión a base de datos
        await testConnection();

        res.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            database: 'connected',
            memory: {
                used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
                total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
            }
        });
    } catch (error) {
        res.status(503).json({
            status: 'unhealthy',
            timestamp: new Date().toISOString(),
            database: 'disconnected',
            error: error.message
        });
    }
});

// PROBLEMA ARREGLADO: Se mantiene la ruta legacy para compatibilidad
app.get('/pagina2', function (req, res) {
    res.json({
        application: 'Study APP',
        version: '1.0.0',
        deprecated: true,
        message: 'Esta ruta está deprecada. Usa / para información de la API'
    });
});

// Cargar rutas de usuarios
userRoute(app);

// Manejo de errores 404
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint no encontrado',
        message: `La ruta ${req.method} ${req.originalUrl} no existe`,
        availableEndpoints: [
            'GET /',
            'GET /health',
            'GET /api/users',
            'POST /api/users',
            'PUT /api/users/:id',
            'DELETE /api/users/:id'
        ]
    });
});

// Manejo global de errores
app.use((error, req, res, next) => {
    console.error('Error no manejado:', error);
    res.status(500).json({
        error: 'Error interno del servidor',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Algo salió mal'
    });
});

const PORT = process.env.PORT || 3000;

// PROBLEMA ARREGLADO: Manejo adecuado del servidor con logs y manejo de errores
const server = app.listen(PORT, () => {
    console.log(`🚀 Study App corriendo en puerto ${PORT}`);
    console.log(`📋 Health check disponible en http://localhost:${PORT}/health`);
    console.log(`👥 API de usuarios en http://localhost:${PORT}/api/users`);

    // Probar conexión de base de datos al iniciar
    testConnection().catch(console.error);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM recibido, cerrando servidor...');
    server.close(() => {
        console.log('Servidor cerrado exitosamente');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT recibido, cerrando servidor...');
    server.close(() => {
        console.log('Servidor cerrado exitosamente');
        process.exit(0);
    });
});