const { ServiciosEducativos, LocalEducativo, InstitucionesEducativas, RelInstitucionServicioLocal } = require('../models');
const { Op } = require('sequelize');

class ServiciosEducativosRepository {
    /**
     * Buscar servicios educativos con filtros y paginación
     */
    async findWithFilters(whereServicio, page, limit) {
        const offset = (page - 1) * limit;
        
        return await ServiciosEducativos.findAndCountAll({
            where: whereServicio,
            limit: limit,
            offset: offset,
            order: [['nombre_servicio', 'ASC']]
        });
    }

    /**
     * Buscar locales educativos por filtros
     */
    async findLocalesByFilters(whereLocal) {
        return await LocalEducativo.findAll({
            where: whereLocal,
            attributes: ['codigo_local'],
            raw: true
        });
    }

    /**
     * Buscar instituciones educativas por filtros
     */
    async findInstitucionesByFilters(whereInstitucion) {
        return await InstitucionesEducativas.findAll({
            where: whereInstitucion,
            attributes: ['codigo_institucion_educativa'],
            raw: true
        });
    }

    /**
     * Buscar códigos modulares por códigos de locales
     */
    async findCodigosModularesByLocales(codigosLocales) {
        const relaciones = await RelInstitucionServicioLocal.findAll({
            where: {
                codigo_local: { [Op.in]: codigosLocales },
                estado_activo: 1
            },
            attributes: ['codigo_modular'],
            raw: true
        });
        return [...new Set(relaciones.map(r => r.codigo_modular))];
    }

    /**
     * Buscar códigos modulares por códigos de instituciones
     */
    async findCodigosModularesByInstituciones(codigosInstituciones) {
        const relaciones = await RelInstitucionServicioLocal.findAll({
            where: {
                codigo_institucion_educativa: { [Op.in]: codigosInstituciones },
                estado_activo: 1
            },
            attributes: ['codigo_modular'],
            raw: true
        });
        return [...new Set(relaciones.map(r => r.codigo_modular))];
    }

    /**
     * Buscar relaciones por códigos modulares
     */
    async findRelacionesByCodigosModulares(codigosModulares) {
        return await RelInstitucionServicioLocal.findAll({
            where: {
                codigo_modular: { [Op.in]: codigosModulares },
                estado_activo: 1
            },
            attributes: ['codigo_modular', 'codigo_local', 'codigo_institucion_educativa', 'fecha_asociacion'],
            raw: true
        });
    }

    /**
     * Buscar locales por códigos
     */
    async findLocalesByCodigos(codigosLocales) {
        if (codigosLocales.length === 0) return [];
        
        return await LocalEducativo.findAll({
            where: { codigo_local: { [Op.in]: codigosLocales } },
            attributes: [
                'id_local',
                'codigo_local',
                'tipo_local',
                'departamento',
                'provincia',
                'distrito',
                'ubigeo',
                'direccion',
                'latitud',
                'longitud'
            ],
            raw: true
        });
    }

    /**
     * Buscar instituciones por códigos
     */
    async findInstitucionesByCodigos(codigosInstituciones) {
        if (codigosInstituciones.length === 0) return [];
        
        return await InstitucionesEducativas.findAll({
            where: { codigo_institucion_educativa: { [Op.in]: codigosInstituciones } },
            attributes: [
                'id_institucion',
                'codigo_institucion_educativa',
                'nombre_institucion',
                'razon_social',
                'ruc',
                'gestion',
                'tipo_institucion',
                'director'
            ],
            raw: true
        });
    }
}

module.exports = new ServiciosEducativosRepository();

