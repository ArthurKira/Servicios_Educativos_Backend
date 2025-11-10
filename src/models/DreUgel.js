module.exports = (sequelize, DataTypes) => {
    const DreUgel = sequelize.define('DreUgel', {
        id_dreugel: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_dreugel'
        },
        cod_ooii: {
            type: DataTypes.STRING(6),
            field: 'cod_ooii'
        },
        dre_ugel: {
            type: DataTypes.STRING(50),
            field: 'dre_ugel'
        }
    }, {
        tableName: 'dre_ugel',
        timestamps: false,
        underscored: true
    });

    return DreUgel;
};

