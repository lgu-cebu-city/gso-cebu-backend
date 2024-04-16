import { ApiProperty } from "@nestjs/swagger"

export class CreateItemDto {
  @ApiProperty()
  code: string
  @ApiProperty()
  description: string
  @ApiProperty()
  uom: string
  @ApiProperty()
  groupId: string
  @ApiProperty()
  typeId: string
  @ApiProperty()
  category: string
  @ApiProperty()
  price: number
}
