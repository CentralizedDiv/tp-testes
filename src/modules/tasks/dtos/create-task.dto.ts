import { TaskPriority } from '../entities/task.entity';

export interface CreateTaskDTO {
  label: string;
  description: string;
  dueDate: string;
  tags?: number[];
  list?: number;
  priority?: TaskPriority;
}
