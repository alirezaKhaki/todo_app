import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getAllTasks():Task[] {
        return this.taskService.getAllTasks();
    }

    @Post()
    creatTask(
       @Body('title') creatTaskDto: CreatTaskDto
    ): Task{
     return   this.taskService.creatTask(creatTaskDto);
    }

}
