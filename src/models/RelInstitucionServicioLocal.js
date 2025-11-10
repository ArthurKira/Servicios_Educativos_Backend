module.exports = (sequelize, DataTypes) => {
    const RelInstitucionServicioLocal = sequelize.define('RelInstitucionServicioLocal', {
        id_relacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_relacion'
        },
        codigo_institucion_educativa: {
            type: DataTypes.STRING(8),
            allowNull: true,
            field: 'codigo_institucion_educativa'
        },
        codigo_modular: {
            type: DataTypes.STRING(7),
            allowNull: false,
            field: 'codigo_modular'
        },
        codigo_local: {
            type: DataTypes.STRING(6),
            allowNull: true,
            field: 'codigo_local'
        },
        fecha_asociacion: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            field: 'fecha_asociacion'
        },
        observacion: {
            type: DataTypes.STRING(255),
            field: 'observacion'
        },
        estado_activo: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
            field: 'estado_activo'
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: 'created_at'
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: 'updated_at'
        }
    }, {
        tableName: 'rel_institucion_servicio_local',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true
    });

    return RelInstitucionServicioLocal;
};

