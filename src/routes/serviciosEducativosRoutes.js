const express = require('express');
const router = express.Router();
const { listarServiciosEducativos } = require('../controllers/serviciosEducativosController');

/**
 * @route GET /api/servicios-educativos
 * @desc Listar servicios educativos con filtros opcionales
 * @query departamento, provincia, distrito, codigo_modular, nombre_servicio, tipo_gestion, nivel, page, limit
 * @access Public
 */
router.get('/', listarServiciosEducativos);

module.exports = router;

