import { BaseEntity } from 'src/utils/common.entity';
import { Entity, Column, ManyToMany } from 'typeorm';
import { Task } from '../tasks/entities/task.entity';

@Entity()
export class Tag extends BaseEntity {
  @Column()
  label: string;

  @Column()
  color: string;

  @ManyToMany(() => Task, (task) => task.tags)
  tasks: Task[];
}
