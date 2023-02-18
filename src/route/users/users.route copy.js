const userController =require('../../controller/users/users.controller');

module.exports = function(app){

    app.get("/users/list",userController.listar);
    app.get("/users/update",userController.actualizar);
    app.get("/users/delete",userController.eliminar);

};