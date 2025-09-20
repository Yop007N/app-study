const { Sequelize } = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

const testConnection = async function(){
    try {
        await sequelize.authenticate();
        console.log("Conectado exitosamente a la base de datos");
    } catch (error) {
        console.error("Error de conexion a la base de datos:", error);
        throw error;
    }
};

testConnection();

module.exports = {
    Sequelize,
    sequelize
};