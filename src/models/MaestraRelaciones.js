module.exports = (sequelize, DataTypes) => {
    const MaestraRelaciones = sequelize.define('MaestraRelaciones', {
        id_relacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_relacion'
        },
        tipo_entidad_origen: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'tipo_entidad_origen'
        },
        id_entidad_origen: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_entidad_origen'
        },
        tipo_entidad_destino: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'tipo_entidad_destino'
        },
        id_entidad_destino: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_entidad_destino'
        },
        tipo_relacion: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'tipo_relacion'
        },
        metadata: {
            type: DataTypes.JSON,
            field: 'metadata'
        },
        fecha_asignacion: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            field: 'fecha_asignacion'
        },
        fecha_fin: {
            type: DataTypes.DATEONLY,
            field: 'fecha_fin'
        },
        estado: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
            field: 'estado'
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
        tableName: 'maestra_relaciones',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true
    });

    return MaestraRelaciones;
};

