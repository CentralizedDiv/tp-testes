import { ApiProperty } from '@nestjs/swagger';

export class CreateSubtaskDTO {
  @ApiProperty()
  label: string;
}
