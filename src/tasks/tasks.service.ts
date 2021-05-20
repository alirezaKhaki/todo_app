import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreatTaskDto } from './dto/create-task.dto';
@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }
    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    creatTask(creatTaskDto: CreatTaskDto): Task {

        const { title, description } = creatTaskDto

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.TODO
        }
        this.tasks.push(task);
        return task;
    }
}
