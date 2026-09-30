import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre_proyecto: string;

    @Column()
    tipo_actividad: string;

    @Column()
    estado: string;

    @Column()
    resumen: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column()
    prioridad: string;

    @Column()
    informador: string;

    @Column()
    persona_asignada: string;

    @Column({ type: 'text', nullable: true })
    precondicion: string;

    @Column({ type: 'date' })
    fecha_creacion: string;

    @Column({ type: 'date', nullable: true })
    fecha_cierre: string;

    @Column()
    sprint: string;
}