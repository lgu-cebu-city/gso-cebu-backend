import { ApiProperty } from "@nestjs/swagger"

export class CreateBarangayDto {
  @ApiProperty()
  name: string
}
