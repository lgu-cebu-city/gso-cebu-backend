import { ApiProperty } from "@nestjs/swagger"

export class CreateRequestQuotationItemDetailsDto {
  @ApiProperty()
  itemId: string
  @ApiProperty()
  description: string
  @ApiProperty()
  specification: string
  @ApiProperty()
  quantity: number
  @ApiProperty()
  uom: string
  @ApiProperty()
  cost: number
  @ApiProperty()
  total: number
  @ApiProperty()
  remarks: string
  @ApiProperty()
  typeId: string
}
