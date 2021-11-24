import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSubtaskDTO {
  @ApiPropertyOptional()
  label?: string;

  @ApiPropertyOptional()
  completedAt?: string;
}
