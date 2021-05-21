import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getAllTasks(): Promise<Task[]> {
        return this.taskService.getAllTasks();
    }
    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getTaskById(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    creatTask(
        @Body() creatTaskDto: CreatTaskDto
    ): Promise<Task> {
        return this.taskService.creatTask(creatTaskDto);
    }

    @Put('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    ): Promise<Task> {
        return this.taskService.updateTaskStatus(id, status)
    }


    @Delete('/:id')
    deleteTaskById(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.deleteTaskById(id)
    }
}
