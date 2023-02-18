const {sequelize} = require("../../connection");


const listar = async function(req, res){
    console.log("Listar usuarios");

    const users = await sequelize.query("select * from users");
    res.send("Listado de usuarios");

};

const actualizar = function(req, res){
    console.log("actualizar usuarios");
    res.send("actualizar de usuarios");

};
const eliminar = function(req, res){
    console.log("eliminar usuarios");
    res.send("eliminar de usuarios");

};

module.exports = function(req, res){
    console.log("controller de usuarios");
    res.send("Listado de usuarios");

};
module.exports = {
    listar, actualizar, eliminar
};