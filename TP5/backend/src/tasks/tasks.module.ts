import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity.js';
import { TasksController } from './tasks.controller.js';
import { TasksService } from './tasks.service.js';

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    providers: [TasksService],
    controllers: [TasksController],
})
export class TasksModule { }
