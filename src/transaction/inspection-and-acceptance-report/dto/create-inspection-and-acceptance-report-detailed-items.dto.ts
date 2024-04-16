import { ApiProperty } from "@nestjs/swagger"
import { CreateInspectionAndAcceptanceReportSubItemDto } from "./create-inspection-and-acceptance-report-sub-items.dto"

export class CreateInspectionAndAcceptanceReportDetailedItemsDto {
  @ApiProperty()
  propCode: string
  @ApiProperty()
  brand: string
  @ApiProperty()
  model: string
  @ApiProperty()
  serial: string
  @ApiProperty({ type: CreateInspectionAndAcceptanceReportSubItemDto, isArray: true })
  subItems: CreateInspectionAndAcceptanceReportSubItemDto[];
}
