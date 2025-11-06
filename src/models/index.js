const sequelize = require('../config/db.config');
const { Sequelize, DataTypes } = require('sequelize');

// Importar modelos
const InstitucionesEducativas = require('./InstitucionesEducativas')(sequelize, DataTypes);
const ServiciosEducativos = require('./ServiciosEducativos')(sequelize, DataTypes);
const LocalEducativo = require('./LocalEducativo')(sequelize, DataTypes);
const MaestraRelaciones = require('./MaestraRelaciones')(sequelize, DataTypes);
const ServiciosBasicos = require('./ServiciosBasicos')(sequelize, DataTypes);
const DatosEstadisticos = require('./DatosEstadisticos')(sequelize, DataTypes);

// Definir relaciones
// Relación Institución -> Servicio (a través de maestra_relaciones)
InstitucionesEducativas.hasMany(MaestraRelaciones, {
    foreignKey: 'id_entidad_origen',
    constraints: false,
    scope: {
        tipo_entidad_origen: 'INSTITUCION',
        tipo_relacion: 'INSTITUCION_SERVICIO'
    },
    as: 'relacionesInstitucion'
});

MaestraRelaciones.belongsTo(InstitucionesEducativas, {
    foreignKey: 'id_entidad_origen',
    constraints: false,
    as: 'institucion',
    scope: {
        tipo_entidad_origen: 'INSTITUCION'
    }
});

ServiciosEducativos.hasMany(MaestraRelaciones, {
    foreignKey: 'id_entidad_destino',
    constraints: false,
    scope: {
        tipo_entidad_destino: 'SERVICIO',
        tipo_relacion: 'INSTITUCION_SERVICIO'
    },
    as: 'relacionInstitucion'
});

MaestraRelaciones.belongsTo(ServiciosEducativos, {
    foreignKey: 'id_entidad_destino',
    constraints: false,
    as: 'servicio',
    scope: {
        tipo_entidad_destino: 'SERVICIO'
    }
});

// Relación Local -> Servicio (a través de maestra_relaciones)
LocalEducativo.hasMany(MaestraRelaciones, {
    foreignKey: 'id_entidad_origen',
    constraints: false,
    scope: {
        tipo_entidad_origen: 'LOCAL',
        tipo_relacion: 'LOCAL_SERVICIO'
    },
    as: 'relacionesServicios'
});

MaestraRelaciones.belongsTo(LocalEducativo, {
    foreignKey: 'id_entidad_origen',
    constraints: false,
    as: 'local',
    scope: {
        tipo_entidad_origen: 'LOCAL'
    }
});

ServiciosEducativos.hasMany(MaestraRelaciones, {
    foreignKey: 'id_entidad_destino',
    constraints: false,
    scope: {
        tipo_entidad_destino: 'SERVICIO',
        tipo_relacion: 'LOCAL_SERVICIO'
    },
    as: 'relacionesLocales'
});

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
    MaestraRelaciones,
    ServiciosBasicos,
    DatosEstadisticos
};

module.exports = db;

