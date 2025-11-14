-- ==============================================
-- TuriLink Database Schema (con colaboradores admin)
-- ==============================================

-- Tabla de Usuarios (Turistas, Guías, Admins, Colaboradores Admin)
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    tipo_usuario VARCHAR(30) NOT NULL CHECK (
        tipo_usuario IN ('turista', 'guia', 'admin', 'admin_colaborador')
    ),
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100),
    telefono VARCHAR(20),
    pais VARCHAR(100),
    ciudad VARCHAR(100),
    fecha_nacimiento DATE,
    genero VARCHAR(20),
    foto_perfil TEXT,
    descripcion TEXT,
    idiomas TEXT[], -- Array de idiomas
    estado VARCHAR(20) DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo', 'suspendido', 'pendiente')),
    verificado BOOLEAN DEFAULT FALSE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_conexion TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Datos Específicos de Turistas
CREATE TABLE IF NOT EXISTS turistas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER UNIQUE NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    preferencias TEXT[], -- Array de preferencias de viaje
    presupuesto_promedio VARCHAR(50),
    intereses TEXT[],
    nivel_aventura VARCHAR(20) CHECK (nivel_aventura IN ('bajo', 'medio', 'alto')),
    viajes_realizados INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Datos Específicos de Guías
CREATE TABLE IF NOT EXISTS guias (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER UNIQUE NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    experiencia_anos INTEGER,
    especialidades TEXT[],
    certificaciones TEXT[],
    tiene_vehiculo BOOLEAN DEFAULT FALSE,
    tipo_vehiculo VARCHAR(100),
    capacidad_maxima INTEGER,
    tarifa_base DECIMAL(10, 2),
    calificacion_promedio DECIMAL(3, 2) DEFAULT 0.00,
    total_reviews INTEGER DEFAULT 0,
    tours_completados INTEGER DEFAULT 0,
    ingresos_totales DECIMAL(10, 2) DEFAULT 0.00,
    estado_validacion VARCHAR(20) DEFAULT 'pendiente' CHECK (estado_validacion IN ('pendiente', 'aprobado', 'rechazado')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================
-- NUEVA TABLA: Colaboradores Administrativos
-- ==============================================
CREATE TABLE IF NOT EXISTS colaboradores_admin (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER UNIQUE NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    rol VARCHAR(50) NOT NULL CHECK (
        rol IN ('super_admin', 'soporte', 'validacion_guias', 'pagos', 'contenido')
    ),
    puede_ver_reportes BOOLEAN DEFAULT FALSE,
    puede_gestionar_guias BOOLEAN DEFAULT FALSE,
    puede_gestionar_pagos BOOLEAN DEFAULT FALSE,
    puede_gestionar_config BOOLEAN DEFAULT FALSE,
    puede_moderar_contenido BOOLEAN DEFAULT FALSE,
    notas TEXT,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Documentos de Validación de Guías
CREATE TABLE IF NOT EXISTS documentos_guia (
    id SERIAL PRIMARY KEY,
    guia_id INTEGER NOT NULL REFERENCES guias(id) ON DELETE CASCADE,
    tipo_documento VARCHAR(50) NOT NULL CHECK (tipo_documento IN ('ine', 'antecedentes_penales', 'certificado_guia', 'licencia_conducir', 'otro')),
    url_documento TEXT NOT NULL,
    nombre_archivo VARCHAR(255),
    estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'aprobado', 'rechazado')),
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_revision TIMESTAMP,
    revisado_por INTEGER REFERENCES usuarios(id), -- puede ser admin o admin_colaborador
    comentarios TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Tours
CREATE TABLE IF NOT EXISTS tours (
    id SERIAL PRIMARY KEY,
    guia_id INTEGER NOT NULL REFERENCES guias(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    tipo_tour VARCHAR(50) CHECK (tipo_tour IN ('grupal', 'individual', 'personalizado')),
    duracion VARCHAR(100), -- Ej: "4 horas", "Todo el día"
    ubicacion VARCHAR(255),
    precio_por_persona DECIMAL(10, 2) NOT NULL,
    capacidad_maxima INTEGER,
    idiomas_disponibles TEXT[],
    incluye TEXT[],
    no_incluye TEXT[],
    requisitos TEXT[],
    dificultad VARCHAR(20) CHECK (dificultad IN ('facil', 'moderado', 'dificil')),
    categorias TEXT[],
    imagenes TEXT[], -- Array de URLs de imágenes
    estado VARCHAR(20) DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo', 'pausado', 'eliminado')),
    calificacion_promedio DECIMAL(3, 2) DEFAULT 0.00,
    total_reviews INTEGER DEFAULT 0,
    total_reservas INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Disponibilidad de Tours
CREATE TABLE IF NOT EXISTS disponibilidad_tours (
    id SERIAL PRIMARY KEY,
    tour_id INTEGER NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME,
    cupos_disponibles INTEGER NOT NULL,
    precio_especial DECIMAL(10, 2),
    estado VARCHAR(20) DEFAULT 'disponible' CHECK (estado IN ('disponible', 'completo', 'cancelado')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tour_id, fecha, hora_inicio)
);

-- Tabla de Experiencias
CREATE TABLE IF NOT EXISTS experiencias (
    id SERIAL PRIMARY KEY,
    guia_id INTEGER NOT NULL REFERENCES guias(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    tipo_experiencia VARCHAR(100), -- Ej: "culinaria", "cultural", "aventura"
    duracion VARCHAR(100),
    ubicacion VARCHAR(255),
    precio DECIMAL(10, 2) NOT NULL,
    capacidad_maxima INTEGER,
    capacidad_minima INTEGER,
    idiomas_disponibles TEXT[],
    nivel_dificultad VARCHAR(20) CHECK (nivel_dificultad IN ('facil', 'moderado', 'dificil')),
    incluye TEXT[],
    requisitos TEXT[],
    categorias TEXT[],
    horarios_disponibles TEXT[],
    imagenes TEXT[],
    estado VARCHAR(20) DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo', 'eliminado')),
    calificacion_promedio DECIMAL(3, 2) DEFAULT 0.00,
    total_reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Recomendaciones de Lugares
CREATE TABLE IF NOT EXISTS recomendaciones (
    id SERIAL PRIMARY KEY,
    guia_id INTEGER NOT NULL REFERENCES guias(id) ON DELETE CASCADE,
    nombre VARCHAR(255) NOT NULL,
    tipo_lugar VARCHAR(50) NOT NULL, -- Ej: "restaurante", "museo", "cafe", "parque"
    descripcion TEXT NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    direccion TEXT,
    coordenadas_lat DECIMAL(10, 8),
    coordenadas_lng DECIMAL(11, 8),
    rango_precio VARCHAR(20), -- Ej: "$", "$$", "$$$", "$$$$"
    horarios TEXT,
    telefono VARCHAR(20),
    sitio_web VARCHAR(255),
    especialidad VARCHAR(255),
    caracteristicas TEXT[],
    mejor_momento_visita TEXT,
    consejos TEXT,
    imagenes TEXT[],
    estado VARCHAR(20) DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo', 'eliminado')),
    calificacion_promedio DECIMAL(3, 2) DEFAULT 0.00,
    total_reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Reservas
CREATE TABLE IF NOT EXISTS reservas (
    id SERIAL PRIMARY KEY,
    turista_id INTEGER NOT NULL REFERENCES turistas(id) ON DELETE CASCADE,
    tipo_reserva VARCHAR(20) NOT NULL CHECK (tipo_reserva IN ('tour', 'experiencia')),
    tour_id INTEGER REFERENCES tours(id) ON DELETE SET NULL,
    experiencia_id INTEGER REFERENCES experiencias(id) ON DELETE SET NULL,
    fecha_reserva DATE NOT NULL,
    hora_inicio TIME,
    numero_personas INTEGER NOT NULL,
    precio_total DECIMAL(10, 2) NOT NULL,
    estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'confirmada', 'completada', 'cancelada', 'reembolsada')),
    comentarios_turista TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (
        (tipo_reserva = 'tour' AND tour_id IS NOT NULL) OR
        (tipo_reserva = 'experiencia' AND experiencia_id IS NOT NULL)
    )
);

-- Tabla de Pagos
CREATE TABLE IF NOT EXISTS pagos (
    id SERIAL PRIMARY KEY,
    reserva_id INTEGER NOT NULL REFERENCES reservas(id) ON DELETE CASCADE,
    turista_id INTEGER NOT NULL REFERENCES turistas(id) ON DELETE CASCADE,
    guia_id INTEGER NOT NULL REFERENCES guias(id) ON DELETE CASCADE,
    monto DECIMAL(10, 2) NOT NULL,
    comision_plataforma DECIMAL(10, 2) NOT NULL,
    monto_guia DECIMAL(10, 2) NOT NULL,
    metodo_pago VARCHAR(50),
    estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'procesando', 'completado', 'fallido', 'reembolsado')),
    referencia_pago VARCHAR(255),
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_liberacion TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Métodos de Pago de Usuarios
CREATE TABLE IF NOT EXISTS metodos_pago (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL, -- Ej: "tarjeta", "cuenta_bancaria"
    ultimos_4_digitos VARCHAR(4),
    marca VARCHAR(50), -- Ej: "Visa", "Mastercard"
    nombre_titular VARCHAR(255),
    es_principal BOOLEAN DEFAULT FALSE,
    token_pago TEXT,
    fecha_expiracion DATE,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Reviews/Calificaciones
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    reserva_id INTEGER NOT NULL REFERENCES reservas(id) ON DELETE CASCADE,
    turista_id INTEGER NOT NULL REFERENCES turistas(id) ON DELETE CASCADE,
    guia_id INTEGER NOT NULL REFERENCES guias(id) ON DELETE CASCADE,
    tipo_review VARCHAR(20) NOT NULL CHECK (tipo_review IN ('tour', 'experiencia', 'recomendacion')),
    tour_id INTEGER REFERENCES tours(id) ON DELETE SET NULL,
    experiencia_id INTEGER REFERENCES experiencias(id) ON DELETE SET NULL,
    recomendacion_id INTEGER REFERENCES recomendaciones(id) ON DELETE SET NULL,
    calificacion INTEGER NOT NULL CHECK (calificacion >= 1 AND calificacion <= 5),
    comentario TEXT,
    imagenes TEXT[],
    respuesta_guia TEXT,
    fecha_respuesta TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'activo' CHECK (estado IN ('activo', 'oculto', 'reportado', 'eliminado')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Reportes/Denuncias
CREATE TABLE IF NOT EXISTS reportes (
    id SERIAL PRIMARY KEY,
    reportante_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    reportado_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
    tipo_reporte VARCHAR(50) NOT NULL,
    tipo_contenido VARCHAR(50),
    contenido_id INTEGER,
    motivo VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    evidencias TEXT[],
    estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'en_revision', 'resuelto', 'rechazado')),
    prioridad VARCHAR(20) DEFAULT 'media' CHECK (prioridad IN ('baja', 'media', 'alta', 'critica')),
    asignado_a INTEGER REFERENCES usuarios(id), -- puede ser admin o admin_colaborador
    resolucion TEXT,
    fecha_resolucion TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Mensajes/Chat
CREATE TABLE IF NOT EXISTS mensajes (
    id SERIAL PRIMARY KEY,
    remitente_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    destinatario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    reserva_id INTEGER REFERENCES reservas(id) ON DELETE SET NULL,
    mensaje TEXT NOT NULL,
    archivos TEXT[],
    leido BOOLEAN DEFAULT FALSE,
    fecha_lectura TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de IA Planner (Itinerarios)
CREATE TABLE IF NOT EXISTS itinerarios_ia (
    id SERIAL PRIMARY KEY,
    turista_id INTEGER NOT NULL REFERENCES turistas(id) ON DELETE CASCADE,
    destino VARCHAR(255) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    presupuesto DECIMAL(10, 2),
    intereses TEXT[],
    numero_personas INTEGER DEFAULT 1,
    preferencias_alojamiento TEXT,
    preferencias_comida TEXT,
    itinerario_generado JSONB,
    tours_sugeridos INTEGER[],
    experiencias_sugeridas INTEGER[],
    estado VARCHAR(20) DEFAULT 'borrador' CHECK (estado IN ('borrador', 'confirmado', 'completado')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Configuración de la Plataforma
CREATE TABLE IF NOT EXISTS configuracion_plataforma (
    id SERIAL PRIMARY KEY,
    clave VARCHAR(100) UNIQUE NOT NULL,
    valor TEXT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(50),
    actualizado_por INTEGER REFERENCES usuarios(id), -- admin o admin_colaborador
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Notificaciones
CREATE TABLE IF NOT EXISTS notificaciones (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    mensaje TEXT NOT NULL,
    url_accion VARCHAR(255),
    leida BOOLEAN DEFAULT FALSE,
    fecha_lectura TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_tipo ON usuarios(tipo_usuario);
CREATE INDEX IF NOT EXISTS idx_guias_usuario_id ON guias(usuario_id);
CREATE INDEX IF NOT EXISTS idx_turistas_usuario_id ON turistas(usuario_id);
CREATE INDEX IF NOT EXISTS idx_colab_admin_usuario_id ON colaboradores_admin(usuario_id);
CREATE INDEX IF NOT EXISTS idx_tours_guia_id ON tours(guia_id);
CREATE INDEX IF NOT EXISTS idx_tours_estado ON tours(estado);
CREATE INDEX IF NOT EXISTS idx_experiencias_guia_id ON experiencias(guia_id);
CREATE INDEX IF NOT EXISTS idx_recomendaciones_guia_id ON recomendaciones(guia_id);
CREATE INDEX IF NOT EXISTS idx_reservas_turista_id ON reservas(turista_id);
CREATE INDEX IF NOT EXISTS idx_reservas_estado ON reservas(estado);
CREATE INDEX IF NOT EXISTS idx_pagos_reserva_id ON pagos(reserva_id);
CREATE INDEX IF NOT EXISTS idx_reviews_guia_id ON reviews(guia_id);
CREATE INDEX IF NOT EXISTS idx_mensajes_remitente ON mensajes(remitente_id);
CREATE INDEX IF NOT EXISTS idx_mensajes_destinatario ON mensajes(destinatario_id);
CREATE INDEX IF NOT EXISTS idx_reportes_estado ON reportes(estado);
