import { BaseEntity } from './../../../utils/common.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class Subtask extends BaseEntity {
  @Column()
  label: string;

  @Column('datetime', { nullable: true, default: null })
  completedAt: Date | null;

  @ManyToOne(() => Task, (task) => task.subtasks, { nullable: false })
  task: Task;
}
