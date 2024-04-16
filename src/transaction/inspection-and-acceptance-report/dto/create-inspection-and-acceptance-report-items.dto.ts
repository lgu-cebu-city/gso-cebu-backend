import { ApiProperty } from "@nestjs/swagger"
import { CreateInspectionAndAcceptanceReportSubItemDto } from "./create-inspection-and-acceptance-report-sub-items.dto"
import { CreateInspectionAndAcceptanceReportDetailedItemsDto } from "./create-inspection-and-acceptance-report-detailed-items.dto"

export class CreateInspectionAndAcceptanceReportItemDto {
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

  @ApiProperty({ type: CreateInspectionAndAcceptanceReportSubItemDto, isArray: true })
  subItems: CreateInspectionAndAcceptanceReportSubItemDto[];

  @ApiProperty({ type: CreateInspectionAndAcceptanceReportDetailedItemsDto, isArray: true })
  detailedItem: CreateInspectionAndAcceptanceReportDetailedItemsDto[];
}
