CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    nombre_proyecto VARCHAR(255) NOT NULL,
    tipo_actividad VARCHAR(100),
    estado VARCHAR(50) DEFAULT 'Pendiente',
    resumen VARCHAR(255),
    descripcion TEXT,
    prioridad VARCHAR(50),
    informador VARCHAR(100),
    persona_asignada VARCHAR(100),
    precondicion TEXT,
    fecha_creacion DATE,
    fecha_cierre DATE,
    sprint VARCHAR(50)
);