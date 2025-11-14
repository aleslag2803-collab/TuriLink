-- ==============================================
-- TuriLink Seed Data
-- ==============================================

-- Insertar usuario admin por defecto
INSERT INTO usuarios (email, password_hash, tipo_usuario, nombre, apellidos, estado, verificado)
VALUES ('admin@turilink.com', '$2a$10$dummyhash', 'admin', 'Administrador', 'TuriLink', 'activo', true)
ON CONFLICT (email) DO NOTHING;

-- Insertar configuraciones iniciales de la plataforma
INSERT INTO configuracion_plataforma (clave, valor, tipo, descripcion, categoria) VALUES
('comision_plataforma', '15', 'number', 'Porcentaje de comisión que cobra la plataforma', 'pagos'),
('tiempo_liberacion_pago', '48', 'number', 'Horas después de completar el tour para liberar el pago al guía', 'pagos'),
('max_cancelacion_horas', '24', 'number', 'Horas mínimas antes del tour para poder cancelar sin penalización', 'reservas'),
('reembolso_cancelacion', '80', 'number', 'Porcentaje de reembolso en caso de cancelación', 'reservas'),
('max_personas_tour', '20', 'number', 'Número máximo de personas permitidas en un tour grupal', 'tours'),
('activar_ia_planner', 'true', 'boolean', 'Activar o desactivar la herramienta de planificación con IA', 'general'),
('precio_ia_planner', '9.99', 'number', 'Precio mensual del plan IA Planner', 'pagos'),
('email_soporte', 'soporte@turilink.com', 'string', 'Email de contacto para soporte', 'general'),
('idiomas_disponibles', '["Español", "Inglés", "Francés", "Alemán", "Italiano", "Portugués"]', 'json', 'Idiomas disponibles en la plataforma', 'general')
ON CONFLICT (clave) DO NOTHING;

-- Insertar categorías comunes para tours y experiencias
-- Nota: Estas se pueden almacenar en una tabla separada si se desea más estructura
-- Por ahora están como arrays en las tablas, pero aquí están documentadas:

-- Categorías de Tours:
-- - Aventura
-- - Cultural
-- - Gastronómico
-- - Histórico
-- - Naturaleza
-- - Urbano
-- - Deportivo
-- - Fotográfico
-- - Nocturno
-- - Familiar

-- Tipos de Recomendaciones:
-- - Restaurante
-- - Museo
-- - Café
-- - Bar
-- - Parque
-- - Galería
-- - Mercado
-- - Monumento
-- - Playa
-- - Mirador
