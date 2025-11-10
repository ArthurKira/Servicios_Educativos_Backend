module.exports = (sequelize, DataTypes) => {
    const InstitucionesEducativas = sequelize.define('InstitucionesEducativas', {
        id_institucion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_institucion'
        },
        codigo_institucion_educativa: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            field: 'codigo_institucion_educativa'
        },
        nombre_institucion: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'nombre_institucion'
        },
        razon_social: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'razon_social'
        },
        ruc: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: 'ruc'
        },
        cod_ooii: {
            type: DataTypes.STRING(6),
            field: 'cod_ooii'
        },
        tipo_institucion: {
            type: DataTypes.STRING(100),
            field: 'tipo_institucion'
        },
        gestion: {
            type: DataTypes.STRING(50),
            field: 'gestion'
        },
        telefono: {
            type: DataTypes.STRING(20),
            field: 'telefono'
        },
        email: {
            type: DataTypes.STRING(100),
            field: 'email'
        },
        director: {
            type: DataTypes.STRING(200),
            field: 'director'
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
        tableName: 'instituciones_educativas',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true
    });

    return InstitucionesEducativas;
};

