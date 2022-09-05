import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../enum/task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.TODO,
        TaskStatus.DOING,
        TaskStatus.DONE
    ];

    transform(value: any) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new BadRequestException('invalid status value')
        }
        return value
    }

    private isStatusValid(status: any) {
        const index = this.allowedStatuses.indexOf(status);
        return index !== -1;
    }
}