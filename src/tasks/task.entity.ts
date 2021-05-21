import {BaseEntity,Column,Entity, PrimaryGeneratedColumn} from 'typeorm';
import { TaskStatus } from './task.model';

@Entity()
export class Task extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    title:string;
    @Column()
    descrepition:string;
    @Column()
    status:TaskStatus;
}