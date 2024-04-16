import { ApiProperty } from "@nestjs/swagger"

export class UpdateItemStatusDto {
  @ApiProperty()
  status: string
}
