const serviciosEducativosRepository = require('../repositories/ServiciosEducativosRepository');
const { Op } = require('sequelize');

class ServiciosEducativosService {
    /**
     * Construir filtros para servicios educativos
     */
    buildServicioFilters(codigo_modular, nombre_servicio, nivel) {
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

        return whereServicio;
    }

    /**
     * Construir filtros para locales educativos
     */
    buildLocalFilters(departamento, provincia, distrito) {
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

        return whereLocal;
    }

    /**
     * Construir filtros para instituciones educativas
     */
    buildInstitucionFilters(tipo_gestion) {
        const whereInstitucion = {};
        
        if (tipo_gestion) {
            whereInstitucion.gestion = tipo_gestion;
        }
        if (Object.keys(whereInstitucion).length > 0) {
            whereInstitucion.estado_activo = 1;
        }

        return whereInstitucion;
    }

    /**
     * Aplicar filtros de ubicación a los servicios
     */
    async applyUbicacionFilters(whereLocal, whereServicio) {
        const localesFiltrados = await serviciosEducativosRepository.findLocalesByFilters(whereLocal);
        const codigosLocales = localesFiltrados.map(l => l.codigo_local);
        
        if (codigosLocales.length === 0) {
            return null; // No hay resultados
        }
        
        const codigosModulares = await serviciosEducativosRepository.findCodigosModularesByLocales(codigosLocales);
        
        if (codigosModulares.length === 0) {
            return null; // No hay resultados
        }
        
        whereServicio.codigo_modular = { [Op.in]: codigosModulares };
        return codigosModulares;
    }

    /**
     * Aplicar filtros de gestión a los servicios
     */
    async applyGestionFilters(whereInstitucion, whereServicio, codigosModularesExistentes = null) {
        const institucionesFiltradas = await serviciosEducativosRepository.findInstitucionesByFilters(whereInstitucion);
        const codigosInstituciones = institucionesFiltradas.map(i => i.codigo_institucion_educativa);
        
        if (codigosInstituciones.length === 0) {
            return null; // No hay resultados
        }
        
        const codigosModularesGestion = await serviciosEducativosRepository.findCodigosModularesByInstituciones(codigosInstituciones);
        
        if (codigosModularesGestion.length === 0) {
            return null; // No hay resultados
        }
        
        // Si ya hay filtros de ubicación, intersectar los códigos modulares
        if (codigosModularesExistentes) {
            const codigosModularesIntersectados = codigosModularesExistentes.filter(
                cod => codigosModularesGestion.includes(cod)
            );
            
            if (codigosModularesIntersectados.length === 0) {
                return null; // No hay resultados
            }
            
            whereServicio.codigo_modular = { [Op.in]: codigosModularesIntersectados };
            return codigosModularesIntersectados;
        } else {
            whereServicio.codigo_modular = { [Op.in]: codigosModularesGestion };
            return codigosModularesGestion;
        }
    }

    /**
     * Obtener datos relacionados (locales e instituciones) para los servicios
     */
    async getDatosRelacionados(codigosModulares) {
        const relaciones = await serviciosEducativosRepository.findRelacionesByCodigosModulares(codigosModulares);

        // Extraer códigos únicos
        const codigosLocales = [...new Set(relaciones.filter(r => r.codigo_local).map(r => r.codigo_local))];
        const codigosInstituciones = [...new Set(relaciones.filter(r => r.codigo_institucion_educativa).map(r => r.codigo_institucion_educativa))];

        // Obtener datos completos
        const [locales, instituciones] = await Promise.all([
            serviciosEducativosRepository.findLocalesByCodigos(codigosLocales),
            serviciosEducativosRepository.findInstitucionesByCodigos(codigosInstituciones)
        ]);

        // Crear mapas para acceso rápido
        const localesMap = {};
        locales.forEach(local => {
            localesMap[local.codigo_local] = local;
        });

        const institucionesMap = {};
        instituciones.forEach(inst => {
            institucionesMap[inst.codigo_institucion_educativa] = inst;
        });

        return { relaciones, localesMap, institucionesMap };
    }

    /**
     * Agrupar relaciones por servicio
     */
    groupRelacionesByServicio(relaciones, localesMap, institucionesMap) {
        const localesPorServicio = {};
        const institucionesPorServicio = {};

        relaciones.forEach(rel => {
            const codigoModular = rel.codigo_modular;

            // Agregar local si existe
            if (rel.codigo_local && localesMap[rel.codigo_local]) {
                if (!localesPorServicio[codigoModular]) {
                    localesPorServicio[codigoModular] = [];
                }
                localesPorServicio[codigoModular].push({
                    ...localesMap[rel.codigo_local],
                    fecha_asociacion: rel.fecha_asociacion
                });
            }

            // Agregar institución si existe (solo una por servicio)
            if (rel.codigo_institucion_educativa && institucionesMap[rel.codigo_institucion_educativa]) {
                institucionesPorServicio[codigoModular] = institucionesMap[rel.codigo_institucion_educativa];
            }
        });

        return { localesPorServicio, institucionesPorServicio };
    }

    /**
     * Formatear servicios para la respuesta
     */
    formatServicios(servicios, localesPorServicio, institucionesPorServicio) {
        return servicios.map(servicio => {
            const servicioJson = servicio.toJSON();
            const codigoModular = servicioJson.codigo_modular;

            return {
                id_servicio: servicioJson.id_servicio,
                codigo_modular: servicioJson.codigo_modular,
                tipo_servicio_educativo: servicioJson.tipo_servicio_educativo,
                tipo_programa: servicioJson.tipo_programa,
                nombre_servicio: servicioJson.nombre_servicio,
                fecha_inicio_funciones: servicioJson.fecha_inicio_funciones,
                ubigeo: servicioJson.ubigeo,
                cod_ooii: servicioJson.cod_ooii,
                latitud: servicioJson.latitud,
                longitud: servicioJson.longitud,
                direccion: servicioJson.direccion,
                turno: servicioJson.turno,
                genero: servicioJson.genero,
                forma: servicioJson.forma,
                etapa: servicioJson.etapa,
                modalidad: servicioJson.modalidad,
                nivel: servicioJson.nivel,
                estado_activo: servicioJson.estado_activo,
                es_institucion: institucionesPorServicio[codigoModular] !== undefined,
                institucion: institucionesPorServicio[codigoModular] || null,
                locales: localesPorServicio[codigoModular] || [],
                created_at: servicioJson.created_at,
                updated_at: servicioJson.updated_at
            };
        });
    }

    /**
     * Listar servicios educativos con filtros
     */
    async listarServiciosEducativos(filtros) {
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
        } = filtros;

        // Construir filtros base
        const whereServicio = this.buildServicioFilters(codigo_modular, nombre_servicio, nivel);
        const whereLocal = this.buildLocalFilters(departamento, provincia, distrito);
        const whereInstitucion = this.buildInstitucionFilters(tipo_gestion);

        const tieneFiltrosUbicacion = Object.keys(whereLocal).length > 0;
        const tieneFiltroGestion = Object.keys(whereInstitucion).length > 0;

        let codigosModulares = null;

        // Aplicar filtros de ubicación
        if (tieneFiltrosUbicacion) {
            codigosModulares = await this.applyUbicacionFilters(whereLocal, whereServicio);
            if (codigosModulares === null) {
                return this.buildEmptyResponse(parseInt(page), parseInt(limit));
            }
        }

        // Aplicar filtros de gestión
        if (tieneFiltroGestion) {
            codigosModulares = await this.applyGestionFilters(whereInstitucion, whereServicio, codigosModulares);
            if (codigosModulares === null) {
                return this.buildEmptyResponse(parseInt(page), parseInt(limit));
            }
        }

        // Obtener servicios con paginación
        const { count, rows } = await serviciosEducativosRepository.findWithFilters(
            whereServicio,
            parseInt(page),
            parseInt(limit)
        );

        // Si no hay servicios, retornar respuesta vacía
        if (rows.length === 0) {
            return this.buildEmptyResponse(parseInt(page), parseInt(limit));
        }

        // Obtener datos relacionados
        const codigosModularesFinales = rows.map(s => s.codigo_modular);
        const { relaciones, localesMap, institucionesMap } = await this.getDatosRelacionados(codigosModularesFinales);

        // Agrupar relaciones
        const { localesPorServicio, institucionesPorServicio } = this.groupRelacionesByServicio(
            relaciones,
            localesMap,
            institucionesMap
        );

        // Formatear respuesta
        const serviciosFormateados = this.formatServicios(rows, localesPorServicio, institucionesPorServicio);

        return {
            success: true,
            data: serviciosFormateados,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(count / parseInt(limit))
            }
        };
    }

    /**
     * Construir respuesta vacía
     */
    buildEmptyResponse(page, limit) {
        return {
            success: true,
            data: [],
            pagination: {
                total: 0,
                page: page,
                limit: limit,
                totalPages: 0
            }
        };
    }
}

module.exports = new ServiciosEducativosService();

