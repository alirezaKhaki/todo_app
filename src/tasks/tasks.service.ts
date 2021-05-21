import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreatTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }
    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }
    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) throw new NotFoundException

        return found

    }

    async creatTask(creatTaskDto: CreatTaskDto): Promise<Task> {
        return this.taskRepository.createTask(creatTaskDto)
    }
    // creatTask(creatTaskDto: CreatTaskDto): Task {

    //     const { title, description } = creatTaskDto

    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.TODO
    //     }
    //     this.tasks.push(task);
    //     return task;
    // }
    // updateTaskStatus(id: string,status:TaskStatus): Task {
    //     const task=this.getTaskById(id);
    //     task.status=status
    //     return task;
    // }

    async deleteTaskById(id: number): Promise<any> {
        const result = await this.taskRepository.delete(id);
        if(result.affected === 0) throw new NotFoundException;
        return {"msg":`task with id: ${id} deleted`}
    }
}
