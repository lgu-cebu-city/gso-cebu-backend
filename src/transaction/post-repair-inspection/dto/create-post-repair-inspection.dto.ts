import { ApiProperty } from "@nestjs/swagger"
import { CreatePostRepairInspectionItemDetailsDto } from "./create-post-repair-inspection-item-details.dto"

export class CreatePostRepairInspectionDto {
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
  departmentId: string
  @ApiProperty()
  departmentName: string
  @ApiProperty()
  divisionId: string
  @ApiProperty()
  divisionName: string
  @ApiProperty()
  jobDescription: string
  @ApiProperty()
  remarks: string
  @ApiProperty()
  signatory1Id: string
  @ApiProperty()
  signatory1Name: string
  @ApiProperty()
  signatory2Id: string
  @ApiProperty()
  signatory2Name: string
  @ApiProperty()
  acceptedById: string
  @ApiProperty()
  acceptedByName: string

  @ApiProperty({ type: CreatePostRepairInspectionItemDetailsDto, isArray: true })
  items: CreatePostRepairInspectionItemDetailsDto[];
}
