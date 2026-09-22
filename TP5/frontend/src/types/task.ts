export interface Task {
    id?: number;
    nombre_proyecto: string;
    tipo_actividad: string;
    estado: string;
    resumen: string;
    descripcion?: string;
    prioridad: string;
    informador: string;
    persona_asignada: string;
    precondicion?: string;
    fecha_creacion: string;
    fecha_cierre?: string;
    sprint: string;
}