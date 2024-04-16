import { ApiProperty } from "@nestjs/swagger"

export class CreateWasteMaterialReportInspectionCertificateDto {
  @ApiProperty()
  quantity: number
  @ApiProperty()
  description: string
  @ApiProperty()
  transferTo: string
}
