module.exports = (sequelize, DataTypes) => {
    const ServiciosBasicos = sequelize.define('ServiciosBasicos', {
        id_servicio_basico: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_servicio_basico'
        },
        id_local: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_local'
        },
        tipo_servicio: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'tipo_servicio'
        },
        estado_servicio: {
            type: DataTypes.STRING(50),
            field: 'estado_servicio'
        },
        proveedor: {
            type: DataTypes.STRING(100),
            field: 'proveedor'
        },
        fecha_inicio_convenio: {
            type: DataTypes.DATEONLY,
            field: 'fecha_inicio_convenio'
        },
        fecha_fin_convenio: {
            type: DataTypes.DATEONLY,
            field: 'fecha_fin_convenio'
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
        tableName: 'servicios_basicos',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true
    });

    return ServiciosBasicos;
};

