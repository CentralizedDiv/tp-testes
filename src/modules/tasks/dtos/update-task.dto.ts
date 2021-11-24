import { CreateTaskDTO } from './create-task.dto';

export type UpdateTaskDTO = Partial<CreateTaskDTO> & { completedAt?: string };
