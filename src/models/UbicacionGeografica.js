module.exports = (sequelize, DataTypes) => {
    const UbicacionGeografica = sequelize.define('UbicacionGeografica', {
        id_ubicacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_ubicacion'
        },
        ubigeo: {
            type: DataTypes.STRING(6),
            field: 'ubigeo'
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
        }
    }, {
        tableName: 'ubicacion_geografica',
        timestamps: false,
        underscored: true
    });

    return UbicacionGeografica;
};

