import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { use } from 'passport';
import { User } from 'src/auth/entity/user.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { Task } from '../entity/task.entity';
import { TaskStatus } from '../enum/task-status.enum';
import { TaskRepository } from '../repository/task.repository';
import { TasksService } from './tasks.service';


describe('TasksService', () => {
    let tasksService: TasksService;
    const mockUser = { userId: 1, username: "alireza", password: "password" } as unknown as User;

    const mockNewTask = {
        title: "test",
        description: "test",
    } as CreateTaskDto;

    const responseTask = {
        "title": "test",
        "description": "test",
        "status": "TODO",
        "userId": 1,
        "id": 1
    } as unknown as Task;

    const mockTaskRepository = {
        getTasks: jest.fn(),
        crateTask: jest.fn(),
        findOne: jest.fn()
    };

    const filterDto = { status: TaskStatus.TODO, search: '' } as GetTasksFilterDto

    beforeEach(async () => {
        let module: TestingModule = await Test.createTestingModule({
            providers: [TasksService, TaskRepository],
        })
            .overrideProvider(TaskRepository).useValue(mockTaskRepository)
            .compile();

        tasksService = module.get<TasksService>(TasksService);
    });

    beforeEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    it('should be defined', () => {
        expect(tasksService).toBeDefined();
    });

    it("add new task", async () => {
        try {
            mockTaskRepository.crateTask.mockResolvedValueOnce(responseTask)
            const data = await tasksService.createTask(mockNewTask, mockUser);

            expect(data).toEqual(responseTask);

            expect(mockTaskRepository.crateTask).toBeCalled();
            expect(mockTaskRepository.crateTask).toBeCalledWith(responseTask);
        } catch (error) {

        }
    });

    it('should return task by id', async () => {
        mockTaskRepository.findOne.mockResolvedValue(responseTask);

        const data = await tasksService.getTaskById(1, mockUser);

        expect(data).toEqual(responseTask);

        expect(mockTaskRepository.findOne).toBeCalled();
        expect(mockTaskRepository.findOne).toBeCalledWith({ where: { id: 1, userId: undefined } });
    });

    it('should return 404 task by id', async () => {
        mockTaskRepository.findOne.mockResolvedValueOnce(new NotFoundException(`Task with ID "1" not found`));

        const data = await tasksService.getTaskById(1, mockUser);

        expect(data).toBeInstanceOf(NotFoundException);

        expect(mockTaskRepository.findOne).toBeCalled();
        expect(mockTaskRepository.findOne).toBeCalledWith({ where: { id: 1, userId: undefined } });
    });

    it('should return users tasks', async () => {
        mockTaskRepository.getTasks.mockResolvedValue([responseTask]);

        const data = await tasksService.getTasks(filterDto, mockUser);
        const responseToExpect = [responseTask]
        expect(data).toEqual(expect.arrayContaining(responseToExpect));

        expect(mockTaskRepository.getTasks).toBeCalled();
        expect(mockTaskRepository.getTasks).toBeCalledWith(filterDto, mockUser);
    });

    it('should return empty array for users tasks', async () => {
        mockTaskRepository.getTasks.mockResolvedValue([]);

        const data = await tasksService.getTasks(filterDto, mockUser);
        const responseToExpect = [responseTask]
        expect(data).toEqual([]);

        expect(mockTaskRepository.getTasks).toBeCalled();
        expect(mockTaskRepository.getTasks).toBeCalledWith(filterDto, mockUser);
    });

    it('should upadte task status to DOING', async () => {
        const taskWithStatusOfDoin = responseTask;
        taskWithStatusOfDoin.status = TaskStatus.DOING;

        mockTaskRepository.getTasks.mockResolvedValue([]);

        const data = await tasksService.updateTaskStatus(filterDto, mockUser);
        const responseToExpect = [responseTask]
        expect(data).toEqual([]);

        expect(mockTaskRepository.getTasks).toBeCalled();
        expect(mockTaskRepository.getTasks).toBeCalledWith(filterDto, mockUser);
    });


});
