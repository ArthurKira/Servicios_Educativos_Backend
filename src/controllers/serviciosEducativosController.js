const serviciosEducativosService = require('../services/ServiciosEducativosService');

/**
 * @route GET /api/servicios-educativos
 * @desc Listar servicios educativos con filtros opcionales
 * @query departamento, provincia, distrito, codigo_modular, nombre_servicio, tipo_gestion, nivel, page, limit
 * @access Public
 */
const listarServiciosEducativos = async (req, res) => {
    try {
        const resultado = await serviciosEducativosService.listarServiciosEducativos(req.query);
        res.json(resultado);
    } catch (error) {
        console.error('Error al listar servicios educativos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al listar servicios educativos',
            error: error.message
        });
    }
};

module.exports = {
    listarServiciosEducativos
};
