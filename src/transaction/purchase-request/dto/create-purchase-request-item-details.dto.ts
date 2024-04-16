import { ApiProperty } from "@nestjs/swagger"

export class CreatePurchaseRequestItemDetailsDto {
  @ApiProperty()
  itemId: string
  @ApiProperty()
  description: string
  @ApiProperty()
  specification: string
  @ApiProperty()
  typeId: string
  @ApiProperty()
  quantity: number
  @ApiProperty()
  dbmQty: number
  @ApiProperty()
  callOutQty: number
  @ApiProperty()
  uom: string
  @ApiProperty()
  cost: number
  @ApiProperty()
  total: number
  @ApiProperty()
  remarks: string
  @ApiProperty()
  consPrId: string
  @ApiProperty()
  appId: number
  @ApiProperty()
  accId: number
}
