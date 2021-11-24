import { List } from 'src/modules/list/list.entity';
import { Tag } from 'src/modules/tags/tag.entity';
import { BaseEntity } from 'src/utils/common.entity';
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Subtask } from './sub-task.entity';

export enum TaskPriority {
  HIGHEST = 'HIGHEST',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  LOWEST = 'LOWEST',
}

@Entity()
export class Task extends BaseEntity {
  @Column()
  label: string;

  @Column({ nullable: true, default: null })
  description: string | null;

  @Column('datetime', { nullable: true, default: null })
  dueDate: Date | null;

  @Column('datetime', { nullable: true, default: null })
  completedAt: Date | null;

  @ManyToOne(() => List, (list) => list.tasks)
  list: List | null;

  @OneToMany(() => Subtask, (subtask) => subtask.task, { cascade: true })
  subtasks: Subtask[];

  @ManyToMany(() => Tag, (tag) => tag.tasks, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @Column({
    type: 'simple-enum',
    enum: TaskPriority,
    default: null,
    nullable: true,
  })
  priority: TaskPriority | null;
}
