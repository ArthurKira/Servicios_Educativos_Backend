module.exports = (sequelize, DataTypes) => {
    const DatosEstadisticos = sequelize.define('DatosEstadisticos', {
        id_estadistica: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_estadistica'
        },
        id_servicio: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_servicio'
        },
        anio_escolar: {
            type: DataTypes.STRING(10),
            allowNull: false,
            field: 'anio_escolar'
        },
        total_matriculados: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'total_matriculados'
        },
        total_docentes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'total_docentes'
        },
        promedio_estudiantes_aula: {
            type: DataTypes.DECIMAL(5, 2),
            field: 'promedio_estudiantes_aula'
        },
        tasa_aprobacion: {
            type: DataTypes.DECIMAL(5, 2),
            field: 'tasa_aprobacion'
        },
        tasa_desercion: {
            type: DataTypes.DECIMAL(5, 2),
            field: 'tasa_desercion'
        },
        resultados_evaluaciones: {
            type: DataTypes.TEXT,
            field: 'resultados_evaluaciones'
        },
        fecha_actualizacion: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: 'fecha_actualizacion'
        }
    }, {
        tableName: 'datos_estadisticos',
        timestamps: false,
        underscored: true
    });

    return DatosEstadisticos;
};

