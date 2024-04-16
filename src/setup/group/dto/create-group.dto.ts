import { ApiProperty } from "@nestjs/swagger"

export class CreateGroupDto {
  @ApiProperty()
  description: string
}
