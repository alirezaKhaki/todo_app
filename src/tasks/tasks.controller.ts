import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getAllTasks(): Task[] {
        return this.taskService.getAllTasks();
    }
    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    creatTask(
        @Body() creatTaskDto: CreatTaskDto
    ): Task {
        return this.taskService.creatTask(creatTaskDto);
    }

    @Put('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    ): Task {
        return this.taskService.updateTaskStatus(id, status)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string) {
        this.taskService.deleteTaskById(id)
        return { "msg": "deleted" }
    }
}
