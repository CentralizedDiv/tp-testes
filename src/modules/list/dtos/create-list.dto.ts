import { ApiProperty } from '@nestjs/swagger';

export class CreateListDTO {
  @ApiProperty()
  label: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  dueDate: Date;
}
