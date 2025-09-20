const userController = require('../../controller/users/users.controller');

// PROBLEMA ARREGLADO: Se corrigieron los métodos HTTP según estándares RESTful
// ANTES: Usaba GET para UPDATE y DELETE (violación de estándares)
// AHORA: Usa métodos HTTP apropiados (POST, PUT, DELETE)

module.exports = function(app) {

    // Obtener lista de usuarios
    app.get("/api/users", userController.listar);

    // Crear nuevo usuario
    app.post("/api/users", userController.crear);

    // Actualizar usuario por ID
    app.put("/api/users/:id", userController.actualizar);

    // Eliminar usuario por ID
    app.delete("/api/users/:id", userController.eliminar);

    // RUTAS LEGACY (para compatibilidad temporal)
    // Se mantienen temporalmente pero se recomienda migrar a las nuevas rutas /api/users
    app.get("/users/list", userController.listar);
    app.post("/users/create", userController.crear);
    app.put("/users/update/:id", userController.actualizar);
    app.delete("/users/delete/:id", userController.eliminar);
};