import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskPriority } from '../entities/task.entity';
export class CreateTaskDTO {
  @ApiProperty()
  label: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  dueDate?: string;

  @ApiPropertyOptional({ type: [Number] })
  tagsIds?: number[];

  @ApiPropertyOptional()
  listId?: number;

  @ApiPropertyOptional({ enum: [...Object.values(TaskPriority)] })
  priority?: TaskPriority;
}
