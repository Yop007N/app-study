const { sequelize } = require("../../../connection");

// PROBLEMA ARREGLADO: Se corrigió la ruta del import (estaba mal)
// PROBLEMA ARREGLADO: Se eliminó el export duplicado que causaba que el objeto fuera sobrescrito

const listar = async function(req, res) {
    try {
        console.log("Listando usuarios");

        // PROBLEMA ARREGLADO: Se usa QueryTypes para evitar SQL injection y obtener resultados correctos
        const [users] = await sequelize.query(
            "SELECT id, name, email, created_at FROM users ORDER BY created_at DESC",
            {
                type: sequelize.QueryTypes.SELECT,
                raw: true
            }
        );

        // PROBLEMA ARREGLADO: Ahora devuelve los datos reales en lugar de texto fijo
        res.status(200).json({
            success: true,
            message: "Usuarios obtenidos exitosamente",
            data: users,
            count: users.length
        });

    } catch (error) {
        console.error("Error al listar usuarios:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor al obtener usuarios",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const actualizar = async function(req, res) {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        // VALIDACIÓN: Verificar que el ID sea válido
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                success: false,
                message: "ID de usuario inválido"
            });
        }

        // VALIDACIÓN: Verificar campos requeridos
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Nombre y email son requeridos"
            });
        }

        // VALIDACIÓN: Verificar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Formato de email inválido"
            });
        }

        const [updatedRows] = await sequelize.query(
            "UPDATE users SET name = :name, email = :email, updated_at = NOW() WHERE id = :id",
            {
                replacements: { id: parseInt(id), name, email },
                type: sequelize.QueryTypes.UPDATE
            }
        );

        if (updatedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            message: "Usuario actualizado exitosamente"
        });

    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor al actualizar usuario",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const eliminar = async function(req, res) {
    try {
        const { id } = req.params;

        // VALIDACIÓN: Verificar que el ID sea válido
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                success: false,
                message: "ID de usuario inválido"
            });
        }

        const [deletedRows] = await sequelize.query(
            "DELETE FROM users WHERE id = :id",
            {
                replacements: { id: parseInt(id) },
                type: sequelize.QueryTypes.DELETE
            }
        );

        if (deletedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            message: "Usuario eliminado exitosamente"
        });

    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor al eliminar usuario",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const crear = async function(req, res) {
    try {
        const { name, email } = req.body;

        // VALIDACIÓN: Verificar campos requeridos
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Nombre y email son requeridos"
            });
        }

        // VALIDACIÓN: Verificar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Formato de email inválido"
            });
        }

        // Verificar si el email ya existe
        const [existingUser] = await sequelize.query(
            "SELECT id FROM users WHERE email = :email",
            {
                replacements: { email },
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "El email ya está registrado"
            });
        }

        const [result] = await sequelize.query(
            "INSERT INTO users (name, email, created_at, updated_at) VALUES (:name, :email, NOW(), NOW()) RETURNING id",
            {
                replacements: { name, email },
                type: sequelize.QueryTypes.INSERT
            }
        );

        res.status(201).json({
            success: true,
            message: "Usuario creado exitosamente",
            data: { id: result[0].id, name, email }
        });

    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor al crear usuario",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// PROBLEMA ARREGLADO: Export único y correcto
module.exports = {
    listar,
    actualizar,
    eliminar,
    crear
};