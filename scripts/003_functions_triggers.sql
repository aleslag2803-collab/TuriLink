-- ==============================================
-- TuriLink Functions & Triggers
-- ==============================================

-- Función para actualizar timestamp de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger a todas las tablas con updated_at
CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_turistas_updated_at BEFORE UPDATE ON turistas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_guias_updated_at BEFORE UPDATE ON guias FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tours_updated_at BEFORE UPDATE ON tours FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_experiencias_updated_at BEFORE UPDATE ON experiencias FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_recomendaciones_updated_at BEFORE UPDATE ON recomendaciones FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reservas_updated_at BEFORE UPDATE ON reservas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reportes_updated_at BEFORE UPDATE ON reportes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_itinerarios_updated_at BEFORE UPDATE ON itinerarios_ia FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_config_updated_at BEFORE UPDATE ON configuracion_plataforma FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para actualizar calificación promedio de guías
CREATE OR REPLACE FUNCTION actualizar_calificacion_guia()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE guias
    SET calificacion_promedio = (
        SELECT COALESCE(AVG(calificacion), 0)
        FROM reviews
        WHERE guia_id = NEW.guia_id AND estado = 'activo'
    ),
    total_reviews = (
        SELECT COUNT(*)
        FROM reviews
        WHERE guia_id = NEW.guia_id AND estado = 'activo'
    )
    WHERE id = NEW.guia_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_actualizar_calificacion_guia
AFTER INSERT OR UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION actualizar_calificacion_guia();

-- Función para actualizar calificación promedio de tours
CREATE OR REPLACE FUNCTION actualizar_calificacion_tour()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.tour_id IS NOT NULL THEN
        UPDATE tours
        SET calificacion_promedio = (
            SELECT COALESCE(AVG(calificacion), 0)
            FROM reviews
            WHERE tour_id = NEW.tour_id AND estado = 'activo'
        ),
        total_reviews = (
            SELECT COUNT(*)
            FROM reviews
            WHERE tour_id = NEW.tour_id AND estado = 'activo'
        )
        WHERE id = NEW.tour_id;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_actualizar_calificacion_tour
AFTER INSERT OR UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION actualizar_calificacion_tour();

-- Función para actualizar ingresos del guía cuando se completa un pago
CREATE OR REPLACE FUNCTION actualizar_ingresos_guia()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.estado = 'completado' AND OLD.estado != 'completado' THEN
        UPDATE guias
        SET ingresos_totales = ingresos_totales + NEW.monto_guia
        WHERE id = NEW.guia_id;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_actualizar_ingresos_guia
AFTER UPDATE ON pagos
FOR EACH ROW
EXECUTE FUNCTION actualizar_ingresos_guia();

-- Función para incrementar tours completados del guía
CREATE OR REPLACE FUNCTION incrementar_tours_completados()
RETURNS TRIGGER AS $$
DECLARE
    v_guia_id INTEGER;
BEGIN
    IF NEW.estado = 'completada' AND OLD.estado != 'completada' THEN
        -- Obtener el guia_id dependiendo del tipo de reserva
        IF NEW.tipo_reserva = 'tour' THEN
            SELECT g.id INTO v_guia_id
            FROM tours t
            JOIN guias g ON t.guia_id = g.id
            WHERE t.id = NEW.tour_id;
        ELSIF NEW.tipo_reserva = 'experiencia' THEN
            SELECT g.id INTO v_guia_id
            FROM experiencias e
            JOIN guias g ON e.guia_id = g.id
            WHERE e.id = NEW.experiencia_id;
        END IF;
        
        IF v_guia_id IS NOT NULL THEN
            UPDATE guias
            SET tours_completados = tours_completados + 1
            WHERE id = v_guia_id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_incrementar_tours_completados
AFTER UPDATE ON reservas
FOR EACH ROW
EXECUTE FUNCTION incrementar_tours_completados();

-- Función para incrementar viajes realizados del turista
CREATE OR REPLACE FUNCTION incrementar_viajes_turista()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.estado = 'completada' AND OLD.estado != 'completada' THEN
        UPDATE turistas
        SET viajes_realizados = viajes_realizados + 1
        WHERE id = NEW.turista_id;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_incrementar_viajes_turista
AFTER UPDATE ON reservas
FOR EACH ROW
EXECUTE FUNCTION incrementar_viajes_turista();
