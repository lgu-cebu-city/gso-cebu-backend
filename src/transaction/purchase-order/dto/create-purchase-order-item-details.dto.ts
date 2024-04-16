import { ApiProperty } from "@nestjs/swagger"

export class CreatePurchaseOrderItemDetailsDto {
  @ApiProperty()
  itemId: string
  @ApiProperty()
  description: string
  @ApiProperty()
  specification: string
  @ApiProperty()
  uom: string
  @ApiProperty()
  quantity: number
  @ApiProperty()
  cost: number
  @ApiProperty()
  total: number
  @ApiProperty()
  remarks: string
  @ApiProperty()
  typeId: string
}
