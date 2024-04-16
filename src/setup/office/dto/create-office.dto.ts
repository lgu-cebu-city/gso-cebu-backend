import { ApiProperty } from "@nestjs/swagger"

export class CreateOfficeDto {
  @ApiProperty()
  code: string
  @ApiProperty()
  description: string
}
