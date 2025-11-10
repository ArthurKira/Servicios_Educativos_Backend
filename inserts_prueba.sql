-- ============================================
-- SCRIPT DE INSERTS DE PRUEBA
-- ============================================
-- NOTA: Asegúrate de que ya tengas datos en:
-- - dre_ugel (ej: cod_ooii = '010000', '010001', '150000', '150001')
-- - ubicacion_geografica (ej: ubigeo = '010101', '150133', '150101')
-- ============================================

-- 1. INSERTAR INSTITUCIONES EDUCATIVAS
-- ============================================
INSERT INTO instituciones_educativas (
    codigo_institucion_educativa,
    nombre_institucion,
    razon_social,
    ruc,
    cod_ooii,
    tipo_institucion,
    gestion,
    telefono,
    email,
    director,
    estado_activo
) VALUES
('12345678', 'I.E. San Juan', 'INSTITUCION EDUCATIVA SAN JUAN', '20123456789', '150001', 'Pública', 'Pública', '01-2345678', 'san.juan@edu.pe', 'Juan Pérez García', 1),
('12345679', 'I.E. Los Olivos', 'INSTITUCION EDUCATIVA LOS OLIVOS', '20123456790', '150001', 'Pública', 'Pública', '01-2345679', 'los.olivos@edu.pe', 'María González López', 1),
('12345680', 'I.E. Miraflores', 'INSTITUCION EDUCATIVA MIRAFLORES', '20123456791', '150001', 'Pública', 'Pública', '01-2345680', 'miraflores@edu.pe', 'Carlos Rodríguez Silva', 1),
('87654321', 'I.E. Amazonas', 'INSTITUCION EDUCATIVA AMAZONAS', '20876543210', '010001', 'Pública', 'Pública', '041-123456', 'amazonas@edu.pe', 'Ana Martínez Torres', 1),
('87654322', 'I.E. Chachapoyas', 'INSTITUCION EDUCATIVA CHACHAPOYAS', '20876543211', '010001', 'Pública', 'Pública', '041-123457', 'chachapoyas@edu.pe', 'Luis Fernández Díaz', 1);

-- 2. INSERTAR LOCALES EDUCATIVOS
-- ============================================
INSERT INTO local_educativo (
    codigo_local,
    tipo_local,
    geohash,
    latitud,
    longitud,
    departamento,
    provincia,
    distrito,
    ubigeo,
    direccion,
    estado_activo
) VALUES
('LOC001', 'Aula', '6q8b', -12.1578598, -76.9665069, 'Lima', 'Lima', 'San Juan de Miraflores', '150133', 'Av. Los Héroes 123', 1),
('LOC002', 'Aula', '6q8c', -12.1580000, -76.9670000, 'Lima', 'Lima', 'San Juan de Miraflores', '150133', 'Jr. Las Flores 456', 1),
('LOC003', 'Aula', '6q8d', -12.1590000, -76.9680000, 'Lima', 'Lima', 'Los Olivos', '150101', 'Av. Universitaria 789', 1),
('LOC004', 'Aula', '6q8e', -12.1600000, -76.9690000, 'Lima', 'Lima', 'Miraflores', '150122', 'Av. Larco 321', 1),
('LOC005', 'Aula', '6q8f', -5.0720733, -78.0536004, 'Amazonas', 'Chachapoyas', 'Chachapoyas', '010101', 'Jr. Triunfo 654', 1),
('LOC006', 'Aula', '6q8g', -5.0730000, -78.0540000, 'Amazonas', 'Chachapoyas', 'Chachapoyas', '010101', 'Av. Libertad 987', 1);

-- 3. INSERTAR SERVICIOS EDUCATIVOS
-- ============================================
INSERT INTO servicios_educativos (
    codigo_modular,
    tipo_servicio_educativo,
    tipo_programa,
    nombre_servicio,
    fecha_inicio_funciones,
    ubigeo,
    cod_ooii,
    latitud,
    longitud,
    direccion,
    turno,
    genero,
    forma,
    etapa,
    modalidad,
    nivel,
    estado_activo
) VALUES
('1234567', 'EBR', 'Regular', 'Servicio Educativo Primaria San Juan', '2020-03-01', '150133', '150001', -12.1578598, -76.9665069, 'Av. Los Héroes 123', 'Mañana', 'Mixto', 'Presencial', 'Primaria', 'Regular', 'Primaria', 1),
('1234568', 'EBR', 'Regular', 'Servicio Educativo Secundaria Los Olivos', '2019-03-01', '150101', '150001', -12.1590000, -76.9680000, 'Av. Universitaria 789', 'Tarde', 'Mixto', 'Presencial', 'Secundaria', 'Regular', 'Secundaria', 1),
('1234569', 'EBR', 'Regular', 'Servicio Educativo Inicial Miraflores', '2021-03-01', '150122', '150001', -12.1600000, -76.9690000, 'Av. Larco 321', 'Mañana', 'Mixto', 'Presencial', 'Inicial', 'Regular', 'Inicial', 1),
('7654321', 'EBR', 'Regular', 'Servicio Educativo Primaria Amazonas', '2018-03-01', '010101', '010001', -5.0720733, -78.0536004, 'Jr. Triunfo 654', 'Mañana', 'Mixto', 'Presencial', 'Primaria', 'Regular', 'Primaria', 1),
('7654322', 'EBR', 'Regular', 'Servicio Educativo Secundaria Chachapoyas', '2017-03-01', '010101', '010001', -5.0730000, -78.0540000, 'Av. Libertad 987', 'Tarde', 'Mixto', 'Presencial', 'Secundaria', 'Regular', 'Secundaria', 1),
('1111111', 'EBR', 'Regular', 'Servicio Educativo Primaria Completa', '2020-03-01', '150133', '150001', -12.1580000, -76.9670000, 'Jr. Las Flores 456', 'Mañana', 'Mixto', 'Presencial', 'Primaria', 'Regular', 'Primaria', 1);

-- 4. INSERTAR RELACIONES INSTITUCIÓN-SERVICIO-LOCAL
-- ============================================
INSERT INTO rel_institucion_servicio_local (
    codigo_institucion_educativa,
    codigo_modular,
    codigo_local,
    fecha_asociacion,
    observacion,
    estado_activo
) VALUES
-- Relación Institución + Servicio + Local
('12345678', '1234567', 'LOC001', '2020-03-01', 'Asociación inicial', 1),
('12345679', '1234568', 'LOC003', '2019-03-01', 'Asociación inicial', 1),
('12345680', '1234569', 'LOC004', '2021-03-01', 'Asociación inicial', 1),
('87654321', '7654321', 'LOC005', '2018-03-01', 'Asociación inicial', 1),
('87654322', '7654322', 'LOC006', '2017-03-01', 'Asociación inicial', 1),
-- Relación solo Servicio + Local (sin institución)
(NULL, '1111111', 'LOC002', '2020-03-01', 'Servicio sin institución asociada', 1),
-- Relación solo Institución + Servicio (sin local)
('12345678', '1234567', NULL, '2020-03-01', 'Servicio sin local asignado', 1);

-- 5. INSERTAR SERVICIOS BÁSICOS
-- ============================================
-- NOTA: Los id_local deben corresponder a los IDs generados automáticamente
-- Ajusta estos valores según los IDs reales de tus locales
INSERT INTO servicios_basicos (
    id_local,
    tipo_servicio,
    estado_servicio,
    proveedor,
    fecha_inicio_convenio,
    fecha_fin_convenio
) VALUES
(1, 'Agua', 'Activo', 'SEDAPAL', '2020-01-01', '2025-12-31'),
(1, 'Luz', 'Activo', 'ENEL', '2020-01-01', '2025-12-31'),
(1, 'Internet', 'Activo', 'Movistar', '2020-01-01', '2024-12-31'),
(2, 'Agua', 'Activo', 'SEDAPAL', '2020-01-01', '2025-12-31'),
(2, 'Luz', 'Activo', 'ENEL', '2020-01-01', '2025-12-31'),
(3, 'Agua', 'Activo', 'SEDAPAL', '2019-01-01', '2025-12-31'),
(3, 'Luz', 'Activo', 'ENEL', '2019-01-01', '2025-12-31'),
(3, 'Internet', 'Activo', 'Claro', '2019-01-01', '2024-12-31'),
(4, 'Agua', 'Activo', 'SEDAPAL', '2021-01-01', '2025-12-31'),
(4, 'Luz', 'Activo', 'ENEL', '2021-01-01', '2025-12-31'),
(5, 'Agua', 'Activo', 'EPSEL', '2018-01-01', '2025-12-31'),
(5, 'Luz', 'Activo', 'Electro Oriente', '2018-01-01', '2025-12-31'),
(6, 'Agua', 'Activo', 'EPSEL', '2017-01-01', '2025-12-31'),
(6, 'Luz', 'Activo', 'Electro Oriente', '2017-01-01', '2025-12-31');

-- 6. INSERTAR DATOS ESTADÍSTICOS
-- ============================================
-- NOTA: Los id_servicio deben corresponder a los IDs generados automáticamente
-- Ajusta estos valores según los IDs reales de tus servicios
INSERT INTO datos_estadisticos (
    id_servicio,
    anio_escolar,
    total_matriculados,
    total_docentes,
    promedio_estudiantes_aula,
    tasa_aprobacion,
    tasa_desercion,
    resultados_evaluaciones
) VALUES
(1, '2024', 150, 8, 18.75, 85.50, 5.20, 'Evaluación satisfactoria'),
(1, '2023', 145, 8, 18.13, 82.30, 6.10, 'Evaluación satisfactoria'),
(2, '2024', 200, 12, 16.67, 88.00, 4.50, 'Evaluación muy satisfactoria'),
(2, '2023', 195, 12, 16.25, 86.50, 5.00, 'Evaluación satisfactoria'),
(3, '2024', 80, 4, 20.00, 90.00, 3.00, 'Evaluación muy satisfactoria'),
(3, '2023', 75, 4, 18.75, 88.50, 3.50, 'Evaluación muy satisfactoria'),
(4, '2024', 120, 6, 20.00, 80.00, 8.00, 'Evaluación satisfactoria'),
(4, '2023', 115, 6, 19.17, 78.50, 9.00, 'Evaluación satisfactoria'),
(5, '2024', 180, 10, 18.00, 87.00, 5.50, 'Evaluación muy satisfactoria'),
(5, '2023', 175, 10, 17.50, 85.00, 6.00, 'Evaluación satisfactoria'),
(6, '2024', 160, 9, 17.78, 83.00, 6.50, 'Evaluación satisfactoria'),
(6, '2023', 155, 9, 17.22, 81.00, 7.00, 'Evaluación satisfactoria');

-- ============================================
-- FIN DEL SCRIPT
-- ============================================
-- IMPORTANTE: 
-- 1. Verifica que los cod_ooii existan en la tabla dre_ugel
-- 2. Verifica que los ubigeo existan en la tabla ubicacion_geografica
-- 3. Ajusta los id_local en servicios_basicos según tus IDs reales
-- 4. Ajusta los id_servicio en datos_estadisticos según tus IDs reales
-- ============================================

