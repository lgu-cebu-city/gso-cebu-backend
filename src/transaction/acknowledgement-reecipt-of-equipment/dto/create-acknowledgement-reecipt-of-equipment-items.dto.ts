import { ApiProperty } from "@nestjs/swagger"
import { CreateAcknowledgementReceiptOfEquipmentSubItemDto } from "./create-acknowledgement-reecipt-of-equipment-sub-items.dto"

export class CreateAcknowledgementReceiptOfEquipmentItemDto {
  @ApiProperty()
  poItemId: string
  @ApiProperty()
  groupId: string
  @ApiProperty()
  groupName: string
  @ApiProperty()
  itemId: string
  @ApiProperty()
  propertyNo: string
  @ApiProperty()
  description: string
  @ApiProperty()
  uom: string
  @ApiProperty()
  quantity: number
  @ApiProperty()
  price: number
  @ApiProperty()
  dateAcquired: Date
  @ApiProperty()
  receivedQuantity: number
  @ApiProperty()
  brand: string
  @ApiProperty()
  brandId: string
  @ApiProperty()
  expirationDate: Date
  @ApiProperty()
  lotNo: string
  @ApiProperty()
  remarks: string
  @ApiProperty()
  serialNo: string
  @ApiProperty()
  model: string
  @ApiProperty()
  iarId: string
  @ApiProperty()
  iarItemId: string

  @ApiProperty({ type: CreateAcknowledgementReceiptOfEquipmentSubItemDto, isArray: true })
  subItems: CreateAcknowledgementReceiptOfEquipmentSubItemDto[];
}
