import { ApiProperty } from "@nestjs/swagger"
import { CreateInspectionAndAcceptanceReportActualItemDto } from "./create-inspection-and-acceptance-report-actual-items.dto"

export class CreateInspectionAndAcceptanceReportActualDto {
  @ApiProperty()
  referenceNo: string
  @ApiProperty()
  referenceDate: Date
  @ApiProperty()
  invoiceNo: string
  @ApiProperty()
  invoiceDate: Date
  @ApiProperty()
  prId: string
  @ApiProperty()
  prNo: string
  @ApiProperty()
  poId: string
  @ApiProperty()
  poNo: string
  @ApiProperty()
  poDate: Date
  @ApiProperty()
  departmentId: string
  @ApiProperty()
  departmentName: string
  @ApiProperty()
  supplierId: string
  @ApiProperty()
  supplierName: string
  @ApiProperty()
  supplierAddress: string
  @ApiProperty()
  purpose: string

  @ApiProperty()
  supplyPropCust: string
  @ApiProperty()
  receivedBy: string
  @ApiProperty()
  receivedByPosition: string
  @ApiProperty()
  cto: string
  @ApiProperty()
  cao: string
  @ApiProperty()
  cmo: string
  @ApiProperty()
  it: string

  @ApiProperty({ type: CreateInspectionAndAcceptanceReportActualItemDto, isArray: true })
  items: CreateInspectionAndAcceptanceReportActualItemDto[];
}
