import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateListDTO {
  @ApiPropertyOptional()
  label?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  dueDate?: Date;
}
