export interface Task{
    id: string;
    title:string;
    description: string;
    status:TaskStatus;
}

export enum TaskStatus{
    TODO='TODO',
    DOING='DOING',
    DONE='DONE',
}