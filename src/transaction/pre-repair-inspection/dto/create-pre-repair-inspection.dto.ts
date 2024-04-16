import { ApiProperty } from "@nestjs/swagger"
import { CreatePreRepairInspectionItemDetailsDto } from "./create-pre-repair-inspection-item-details.dto"

export class CreatePreRepairInspectionDto {
  @ApiProperty()
  transactionNo: string
  @ApiProperty()
  transactionDate: Date
  @ApiProperty()
  vehicleName: string
  @ApiProperty()
  vehicleType: string
  @ApiProperty()
  plateNo: string
  @ApiProperty()
  brandModel: string
  @ApiProperty()
  engineNo: string
  @ApiProperty()
  chassisNo: string
  @ApiProperty()
  acquisationDate: Date
  @ApiProperty()
  acquisationCost: number
  @ApiProperty()
  lastRepairDate: Date
  @ApiProperty()
  lastRepairNature: string
  @ApiProperty()
  defectComplaints: string
  @ApiProperty()
  workScope: string
  @ApiProperty()
  remarks: string
  @ApiProperty()
  requestedById: string
  @ApiProperty()
  requestedByName: string
  @ApiProperty()
  inspectedBy1Id: string
  @ApiProperty()
  inspectedBy1Name: string
  @ApiProperty()
  inspectedBy2Id: string
  @ApiProperty()
  inspectedBy2Name: string
  @ApiProperty()
  notedById: string
  @ApiProperty()
  notedByName: string

  @ApiProperty({ type: CreatePreRepairInspectionItemDetailsDto, isArray: true })
  items: CreatePreRepairInspectionItemDetailsDto[];
}
