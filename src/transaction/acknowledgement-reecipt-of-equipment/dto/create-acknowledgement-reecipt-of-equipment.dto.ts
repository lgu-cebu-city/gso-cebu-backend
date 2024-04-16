import { ApiProperty } from "@nestjs/swagger"
import { CreateAcknowledgementReceiptOfEquipmentItemDto } from "./create-acknowledgement-reecipt-of-equipment-items.dto"

export class CreateAcknowledgementReceiptOfEquipmentDto {
  @ApiProperty()
  parNo: string
  @ApiProperty()
  parDate: Date
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
  receivedById: string
  @ApiProperty()
  receivedByName: string
  @ApiProperty()
  issuedById: string
  @ApiProperty()
  issuedByName: string

  @ApiProperty({ type: CreateAcknowledgementReceiptOfEquipmentItemDto, isArray: true })
  items: CreateAcknowledgementReceiptOfEquipmentItemDto[];
}
