const express = require('express');
const router = express.Router();
const serviciosEducativosRoutes = require('./serviciosEducativosRoutes');

// Rutas de servicios educativos
router.use('/servicios-educativos', serviciosEducativosRoutes);

module.exports = router;

