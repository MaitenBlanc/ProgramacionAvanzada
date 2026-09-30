import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity.js';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto.js';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    ) { }

    findAll(): Promise<Task[]> {
        return this.taskRepository.find({ order: { id: 'DESC' } });
    }

    async findOne(id: number): Promise<Task> {
        const task = await this.taskRepository.findOneBy({ id });
        if (!task) throw new NotFoundException(`Tarea con id ${id} no encontrada`);
        return task;
    }

    create(dto: CreateTaskDto): Promise<Task> {
        const newTask = this.taskRepository.create(dto);
        return this.taskRepository.save(newTask);
    }

    // Uso Partial para que no sea obligatorio enviar todos los campos del DTO
    async update(id: number, dto: Partial<CreateTaskDto>): Promise<Task> {
        await this.findOne(id);
        await this.taskRepository.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const task = await this.findOne(id);
        await this.taskRepository.remove(task);
    }
}
