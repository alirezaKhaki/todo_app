import { Injectable, NotFoundException } from '@nestjs/common';
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
        const found=this.tasks.find(task => task.id === id);
        if(!found) throw new NotFoundException
        return found
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
    updateTaskStatus(id: string,status:TaskStatus): Task {
        const task=this.getTaskById(id);
        task.status=status
        return task;
    }
    deleteTaskById(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id)
    }
}
