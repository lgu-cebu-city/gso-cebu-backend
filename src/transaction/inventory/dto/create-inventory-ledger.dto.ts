import { ApiProperty } from "@nestjs/swagger"
import { CreateInventoryLedgerSubItemsDto } from "./create-inventory-ledger-sub-items.dto"

export class CreateInventoryLedgerDto {
  @ApiProperty()
  refId: string
  @ApiProperty()
  refType: string // Receive / Transfer / Sell / Return / Dispose
  @ApiProperty()
  departmentId: string
  @ApiProperty()
  sectionId: string
  @ApiProperty()
  groupId: string
  @ApiProperty()
  itemId: string
  @ApiProperty()
  brandId: string
  @ApiProperty()
  description: string
  @ApiProperty()
  uom: string
  @ApiProperty()
  quantity: number
  @ApiProperty()
  price: number
  @ApiProperty({ nullable: true })
  expirationDate: Date
  @ApiProperty({ nullable: true })
  lotNo: string
  @ApiProperty()
  remarks: string
  @ApiProperty()
  serialNo: string
  @ApiProperty()
  model: string

  @ApiProperty({ type: CreateInventoryLedgerSubItemsDto, isArray: true })
  subItems: CreateInventoryLedgerSubItemsDto[];
}
