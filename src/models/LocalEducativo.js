module.exports = (sequelize, DataTypes) => {
    const LocalEducativo = sequelize.define('LocalEducativo', {
        id_local: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_local'
        },
        codigo_local: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            field: 'codigo_local'
        },
        tipo_local: {
            type: DataTypes.STRING(100),
            field: 'tipo_local'
        },
        geohash: {
            type: DataTypes.STRING(50),
            field: 'geohash'
        },
        latitud: {
            type: DataTypes.DECIMAL(10, 8),
            field: 'latitud'
        },
        longitud: {
            type: DataTypes.DECIMAL(11, 8),
            field: 'longitud'
        },
        departamento: {
            type: DataTypes.STRING(100),
            field: 'departamento'
        },
        provincia: {
            type: DataTypes.STRING(100),
            field: 'provincia'
        },
        distrito: {
            type: DataTypes.STRING(100),
            field: 'distrito'
        },
        ubigeo: {
            type: DataTypes.STRING(6),
            field: 'ubigeo'
        },
        direccion: {
            type: DataTypes.STRING(500),
            field: 'direccion'
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
        tableName: 'local_educativo',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true
    });

    return LocalEducativo;
};

