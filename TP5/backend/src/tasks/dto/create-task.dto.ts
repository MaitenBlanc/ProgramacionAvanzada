import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskDto {
    @IsString() @IsNotEmpty() nombre_proyecto: string;
    @IsString() @IsNotEmpty() tipo_actividad: string;
    @IsString() @IsNotEmpty() estado: string;
    @IsString() @IsNotEmpty() resumen: string;
    @IsString() @IsOptional() descripcion?: string;
    @IsString() @IsNotEmpty() prioridad: string;
    @IsString() @IsNotEmpty() informador: string;
    @IsString() @IsNotEmpty() persona_asignada: string;
    @IsString() @IsOptional() precondicion?: string;
    @IsString() @IsNotEmpty() fecha_creacion: string;
    @IsString() @IsOptional() fecha_cierre?: string;
    @IsString() @IsNotEmpty() sprint: string;
}