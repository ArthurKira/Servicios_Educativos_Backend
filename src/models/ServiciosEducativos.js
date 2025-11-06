module.exports = (sequelize, DataTypes) => {
    const ServiciosEducativos = sequelize.define('ServiciosEducativos', {
        id_servicio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_servicio'
        },
        codigo_modular: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            field: 'codigo_modular'
        },
        nombre_servicio: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'nombre_servicio'
        },
        fecha_inicio_funciones: {
            type: DataTypes.DATEONLY,
            field: 'fecha_inicio_funciones'
        },
        turno: {
            type: DataTypes.STRING(50),
            field: 'turno'
        },
        genero: {
            type: DataTypes.STRING(50),
            field: 'genero'
        },
        forma: {
            type: DataTypes.STRING(50),
            field: 'forma'
        },
        etapa: {
            type: DataTypes.STRING(50),
            field: 'etapa'
        },
        modalidad: {
            type: DataTypes.STRING(50),
            field: 'modalidad'
        },
        nivel: {
            type: DataTypes.STRING(50),
            field: 'nivel'
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
        tableName: 'servicios_educativos',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true
    });

    return ServiciosEducativos;
};

