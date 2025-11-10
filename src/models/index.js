const sequelize = require('../config/db.config');
const { Sequelize, DataTypes } = require('sequelize');

// Importar modelos
const InstitucionesEducativas = require('./InstitucionesEducativas')(sequelize, DataTypes);
const ServiciosEducativos = require('./ServiciosEducativos')(sequelize, DataTypes);
const LocalEducativo = require('./LocalEducativo')(sequelize, DataTypes);
const ServiciosBasicos = require('./ServiciosBasicos')(sequelize, DataTypes);
const DatosEstadisticos = require('./DatosEstadisticos')(sequelize, DataTypes);
const RelInstitucionServicioLocal = require('./RelInstitucionServicioLocal')(sequelize, DataTypes);
const UbicacionGeografica = require('./UbicacionGeografica')(sequelize, DataTypes);
const DreUgel = require('./DreUgel')(sequelize, DataTypes);

// Definir relaciones
// Relación Servicios Básicos -> Local
LocalEducativo.hasMany(ServiciosBasicos, {
    foreignKey: 'id_local',
    as: 'serviciosBasicos'
});

// Relación Datos Estadísticos -> Servicio
ServiciosEducativos.hasMany(DatosEstadisticos, {
    foreignKey: 'id_servicio',
    as: 'datosEstadisticos'
});

const db = {
    sequelize,
    Sequelize,
    InstitucionesEducativas,
    ServiciosEducativos,
    LocalEducativo,
    ServiciosBasicos,
    DatosEstadisticos,
    RelInstitucionServicioLocal,
    UbicacionGeografica,
    DreUgel
};

module.exports = db;

