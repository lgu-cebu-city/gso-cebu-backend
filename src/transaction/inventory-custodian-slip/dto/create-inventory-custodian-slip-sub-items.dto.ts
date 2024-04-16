import { ApiProperty } from "@nestjs/swagger"

export class CreateInventoryCustodianSlipSubItemDto {
  @ApiProperty()
  itemId: string
  @ApiProperty()
  description: string
  @ApiProperty()
  uom: string
  @ApiProperty()
  quantity: number
  @ApiProperty()
  serialNo: string
  @ApiProperty()
  model: string
}
