import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDTO {
  @ApiProperty()
  label: string;

  @ApiProperty()
  color: string;
}
