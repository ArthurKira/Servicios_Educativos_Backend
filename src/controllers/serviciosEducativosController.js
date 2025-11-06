const { ServiciosEducativos, LocalEducativo, InstitucionesEducativas, MaestraRelaciones, sequelize } = require('../models');
const { Op } = require('sequelize');

/**
 * Listar servicios educativos con filtros opcionales
 * Filtros disponibles:
 * - departamento
 * - provincia
 * - distrito
 * - codigo_modular
 * - nombre_servicio
 * - tipo_gestion (gestion de la institución)
 * - nivel (nivel educativo)
 */
const listarServiciosEducativos = async (req, res) => {
    try {
        const {
            departamento,
            provincia,
            distrito,
            codigo_modular,
            nombre_servicio,
            tipo_gestion,
            nivel,
            page = 1,
            limit = 10
        } = req.query;

        // Construir condiciones WHERE para servicios_educativos
        const whereServicio = {
            estado_activo: 1
        };

        if (codigo_modular) {
            whereServicio.codigo_modular = {
                [Op.like]: `%${codigo_modular}%`
            };
        }

        if (nombre_servicio) {
            whereServicio.nombre_servicio = {
                [Op.like]: `%${nombre_servicio}%`
            };
        }

        if (nivel) {
            whereServicio.nivel = nivel;
        }

        // Construir condiciones WHERE para local_educativo (si se filtra por ubicación)
        const whereLocal = {};
        if (departamento) {
            whereLocal.departamento = {
                [Op.like]: `%${departamento}%`
            };
        }
        if (provincia) {
            whereLocal.provincia = {
                [Op.like]: `%${provincia}%`
            };
        }
        if (distrito) {
            whereLocal.distrito = {
                [Op.like]: `%${distrito}%`
            };
        }
        if (Object.keys(whereLocal).length > 0) {
            whereLocal.estado_activo = 1;
        }

        // Construir condiciones WHERE para instituciones_educativas (si se filtra por gestión)
        const whereInstitucion = {};
        if (tipo_gestion) {
            whereInstitucion.gestion = tipo_gestion;
        }
        if (Object.keys(whereInstitucion).length > 0) {
            whereInstitucion.estado_activo = 1;
        }

        // Construir condiciones para maestra_relaciones (LOCAL_SERVICIO)
        const whereRelacionLocal = {
            tipo_entidad_origen: 'LOCAL',
            tipo_entidad_destino: 'SERVICIO',
            tipo_relacion: 'LOCAL_SERVICIO',
            estado: 1
        };

        // Construir condiciones para maestra_relaciones (INSTITUCION_SERVICIO)
        const whereRelacionInstitucion = {
            tipo_entidad_origen: 'INSTITUCION',
            tipo_entidad_destino: 'SERVICIO',
            tipo_relacion: 'INSTITUCION_SERVICIO',
            estado: 1
        };

        // Calcular offset para paginación
        const offset = (parseInt(page) - 1) * parseInt(limit);

        // Si hay filtros de ubicación o gestión, necesitamos hacer JOINs con la tabla maestra
        const tieneFiltrosUbicacion = Object.keys(whereLocal).length > 0;
        const tieneFiltroGestion = Object.keys(whereInstitucion).length > 0;

        let serviciosIds = [];

        // Si hay filtros de ubicación, primero obtener los IDs de servicios que cumplen
        if (tieneFiltrosUbicacion) {
            // Primero obtener los IDs de locales que cumplen el filtro
            const localesFiltrados = await LocalEducativo.findAll({
                where: whereLocal,
                attributes: ['id_local'],
                raw: true
            });
            const localesIds = localesFiltrados.map(l => l.id_local);
            
            if (localesIds.length === 0) {
                return res.json({
                    success: true,
                    data: [],
                    pagination: {
                        total: 0,
                        page: parseInt(page),
                        limit: parseInt(limit),
                        totalPages: 0
                    }
                });
            }
            
            // Luego obtener los servicios relacionados con esos locales
            const serviciosConLocal = await MaestraRelaciones.findAll({
                where: {
                    ...whereRelacionLocal,
                    id_entidad_origen: { [Op.in]: localesIds }
                },
                attributes: ['id_entidad_destino'],
                raw: true
            });
            serviciosIds = serviciosConLocal.map(r => r.id_entidad_destino);
            if (serviciosIds.length === 0) {
                // No hay servicios que cumplan el filtro de ubicación
                return res.json({
                    success: true,
                    data: [],
                    pagination: {
                        total: 0,
                        page: parseInt(page),
                        limit: parseInt(limit),
                        totalPages: 0
                    }
                });
            }
            whereServicio.id_servicio = { [Op.in]: serviciosIds };
        }

        // Si hay filtro por gestión, obtener los IDs de servicios que cumplen
        if (tieneFiltroGestion) {
            // Primero obtener los IDs de instituciones que cumplen el filtro
            const institucionesFiltradas = await InstitucionesEducativas.findAll({
                where: whereInstitucion,
                attributes: ['id_institucion'],
                raw: true
            });
            const institucionesIds = institucionesFiltradas.map(i => i.id_institucion);
            
            if (institucionesIds.length === 0) {
                return res.json({
                    success: true,
                    data: [],
                    pagination: {
                        total: 0,
                        page: parseInt(page),
                        limit: parseInt(limit),
                        totalPages: 0
                    }
                });
            }
            
            // Luego obtener los servicios relacionados con esas instituciones
            const serviciosConInstitucion = await MaestraRelaciones.findAll({
                where: {
                    ...whereRelacionInstitucion,
                    id_entidad_origen: { [Op.in]: institucionesIds }
                },
                attributes: ['id_entidad_destino'],
                raw: true
            });
            const serviciosIdsGestion = serviciosConInstitucion.map(r => r.id_entidad_destino);
            if (serviciosIdsGestion.length === 0) {
                // No hay servicios que cumplan el filtro de gestión
                return res.json({
                    success: true,
                    data: [],
                    pagination: {
                        total: 0,
                        page: parseInt(page),
                        limit: parseInt(limit),
                        totalPages: 0
                    }
                });
            }
            // Si ya hay filtro de ubicación, intersectar los IDs
            if (tieneFiltrosUbicacion) {
                serviciosIds = serviciosIds.filter(id => serviciosIdsGestion.includes(id));
                if (serviciosIds.length === 0) {
                    return res.json({
                        success: true,
                        data: [],
                        pagination: {
                            total: 0,
                            page: parseInt(page),
                            limit: parseInt(limit),
                            totalPages: 0
                        }
                    });
                }
                whereServicio.id_servicio = { [Op.in]: serviciosIds };
            } else {
                whereServicio.id_servicio = { [Op.in]: serviciosIdsGestion };
            }
        }

        // Ejecutar consulta con paginación (sin includes para evitar problemas con scopes)
        const { count, rows } = await ServiciosEducativos.findAndCountAll({
            where: whereServicio,
            limit: parseInt(limit),
            offset: offset,
            order: [['nombre_servicio', 'ASC']]
        });

        // Obtener locales e instituciones para cada servicio (por separado para evitar duplicados)
        const serviciosIdsFinales = rows.map(s => s.id_servicio);
        
        // Obtener todos los locales de los servicios (sin includes para evitar problemas con scopes)
        const relacionesLocalesRaw = await MaestraRelaciones.findAll({
            where: {
                tipo_entidad_destino: 'SERVICIO',
                id_entidad_destino: { [Op.in]: serviciosIdsFinales },
                ...whereRelacionLocal
            },
            attributes: ['id_entidad_destino', 'id_entidad_origen', 'fecha_asignacion'],
            raw: true
        });
        
        const localesIds = [...new Set(relacionesLocalesRaw.map(r => r.id_entidad_origen))];
        const locales = await LocalEducativo.findAll({
            where: { id_local: { [Op.in]: localesIds } },
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
        
        const localesMap = {};
        locales.forEach(local => {
            localesMap[local.id_local] = local;
        });

        // Obtener todas las instituciones de los servicios (sin includes)
        const relacionesInstitucionesRaw = await MaestraRelaciones.findAll({
            where: {
                tipo_entidad_destino: 'SERVICIO',
                id_entidad_destino: { [Op.in]: serviciosIdsFinales },
                ...whereRelacionInstitucion
            },
            attributes: ['id_entidad_destino', 'id_entidad_origen'],
            raw: true
        });
        
        const institucionesIds = [...new Set(relacionesInstitucionesRaw.map(r => r.id_entidad_origen))];
        const instituciones = await InstitucionesEducativas.findAll({
            where: { id_institucion: { [Op.in]: institucionesIds } },
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
        
        const institucionesMap = {};
        instituciones.forEach(inst => {
            institucionesMap[inst.id_institucion] = inst;
        });
        
        const relacionesInstituciones = relacionesInstitucionesRaw;
        const relacionesLocales = relacionesLocalesRaw;

        // Agrupar relaciones por servicio
        const localesPorServicio = {};
        relacionesLocales.forEach(rel => {
            const localId = rel.id_entidad_destino;
            const localData = localesMap[rel.id_entidad_origen];
            if (localData) {
                if (!localesPorServicio[localId]) {
                    localesPorServicio[localId] = [];
                }
                localesPorServicio[localId].push({
                    ...localData,
                    fecha_asignacion: rel.fecha_asignacion
                });
            }
        });

        const institucionesPorServicio = {};
        relacionesInstituciones.forEach(rel => {
            const servicioId = rel.id_entidad_destino;
            const institucionData = institucionesMap[rel.id_entidad_origen];
            if (institucionData) {
                institucionesPorServicio[servicioId] = institucionData;
            }
        });

        // Formatear respuesta
        const serviciosFormateados = rows.map(servicio => {
            const servicioJson = servicio.toJSON();
            const servicioId = servicioJson.id_servicio;

            return {
                id_servicio: servicioJson.id_servicio,
                codigo_modular: servicioJson.codigo_modular,
                nombre_servicio: servicioJson.nombre_servicio,
                fecha_inicio_funciones: servicioJson.fecha_inicio_funciones,
                turno: servicioJson.turno,
                genero: servicioJson.genero,
                forma: servicioJson.forma,
                etapa: servicioJson.etapa,
                modalidad: servicioJson.modalidad,
                nivel: servicioJson.nivel,
                estado_activo: servicioJson.estado_activo,
                es_institucion: institucionesPorServicio[servicioId] !== undefined,
                institucion: institucionesPorServicio[servicioId] || null,
                locales: localesPorServicio[servicioId] || [],
                created_at: servicioJson.created_at,
                updated_at: servicioJson.updated_at
            };
        });

        res.json({
            success: true,
            data: serviciosFormateados,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(count / parseInt(limit))
            }
        });

    } catch (error) {
        console.error('Error al listar servicios educativos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al listar servicios educativos',
            error: error.message
        });
    }
};

module.exports = {
    listarServiciosEducativos
};

