import { ApiProperty } from "@nestjs/swagger"
import { CreateWasteMaterialReportItemDetailsDto } from "./create-waste-material-report-item-details.dto"
import { CreateWasteMaterialReportInspectionCertificateDto } from "./create-waste-material-report-inspection-certificate.dto"

export class CreateWasteMaterialReportDto {
  @ApiProperty()
  transactionNo: string
  @ApiProperty()
  transactionDate: Date
  @ApiProperty()
  departmentId: string
  @ApiProperty()
  departmentName: string
  @ApiProperty()
  placeOfStorage: string
  @ApiProperty()
  inspOfficerId: string
  @ApiProperty()
  inspOfficerName: string
  @ApiProperty()
  witnessId: string
  @ApiProperty()
  witnessName: string
  @ApiProperty()
  fund: string
  @ApiProperty()
  remarks: string

  @ApiProperty({ type: CreateWasteMaterialReportItemDetailsDto, isArray: true })
  items: CreateWasteMaterialReportItemDetailsDto[];

  @ApiProperty({ type: CreateWasteMaterialReportInspectionCertificateDto, isArray: true })
  inspectionCertificate: CreateWasteMaterialReportInspectionCertificateDto[];
}
