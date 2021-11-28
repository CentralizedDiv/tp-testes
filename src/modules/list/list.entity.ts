import { BaseEntity } from './../../utils/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Task } from '../tasks/entities/task.entity';

@Entity()
export class List extends BaseEntity {
  @Column()
  label: string;

  @Column({ nullable: true, default: null })
  description: string | null;

  @Column('datetime', { nullable: true, default: null })
  dueDate: Date | null;

  @OneToMany(() => Task, (task) => task.list)
  tasks: Task[];
}
