import { EntityRepository, Repository } from "typeorm";
import { CreatTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    async createTask(creatTaskDto: CreatTaskDto): Promise<Task> {
        const { title, description } = creatTaskDto

        const task = new Task();

        task.title = title;
        task.descrepition = description;
        task.status = TaskStatus.TODO

        await task.save();
        return task;
    }
}