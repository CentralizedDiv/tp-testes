import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskPriority } from '../entities/task.entity';

export class UpdateTaskDTO {
  @ApiPropertyOptional()
  label?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  dueDate?: string;

  @ApiPropertyOptional({ type: [Number] })
  tagsIds?: number[];

  @ApiPropertyOptional()
  listId?: number;

  @ApiPropertyOptional()
  priority?: TaskPriority;

  @ApiPropertyOptional()
  completedAt?: string;
}
