import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTagDTO {
  @ApiPropertyOptional()
  label?: string;

  @ApiPropertyOptional()
  color?: string;
}
