import { ApiProperty } from "@nestjs/swagger"
import { CreateInspectionAndAcceptanceReportActualSubItemDto } from "./create-inspection-and-acceptance-report-actual-sub-items.dto"

export class CreateInspectionAndAcceptanceReportActualItemDto {
  @ApiProperty()
  poItemId: string
  @ApiProperty()
  groupId: string
  @ApiProperty()
  groupName: string
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
  price: number
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

  @ApiProperty({ type: CreateInspectionAndAcceptanceReportActualSubItemDto, isArray: true })
  subItems: CreateInspectionAndAcceptanceReportActualSubItemDto[];
}
