import { ApiProperty } from "@nestjs/swagger"
import { CreateInventoryCustodianSlipItemDto } from "./create-inventory-custodian-slip-items.dto"

export class CreateInventoryCustodianSlipDto {
  @ApiProperty()
  icsNo: string
  @ApiProperty()
  icsDate: Date
  @ApiProperty()
  departmentId: string
  @ApiProperty()
  departmentName: string
  @ApiProperty()
  fundCluster: string
  @ApiProperty()
  accountType: string
  @ApiProperty()
  prNo: string
  @ApiProperty()
  poNo: string
  @ApiProperty()
  location: string
  @ApiProperty()
  supplierName: string
  @ApiProperty()
  deliveryDate: Date
  @ApiProperty()
  remarks: string
  @ApiProperty()
  receivedFromId: string
  @ApiProperty()
  receivedFromName: string
  @ApiProperty()
  receivedById: string
  @ApiProperty()
  receivedByName: string

  @ApiProperty({ type: CreateInventoryCustodianSlipItemDto, isArray: true })
  items: CreateInventoryCustodianSlipItemDto[];
}
