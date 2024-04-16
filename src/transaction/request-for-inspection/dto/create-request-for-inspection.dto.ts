import { ApiProperty } from "@nestjs/swagger"
import { CreateRequestForInspectionItemDetailsDto } from "./create-request-for-inspection-item-details.dto"
import { CreateRequestForInspectionTypeDto } from "./create-request-for-inspection-type.dto"

export class CreateRequestForInspectionDto {
  @ApiProperty()
  transactionNo: string
  @ApiProperty()
  transactionDate: Date
  @ApiProperty()
  departmentId: string
  @ApiProperty()
  departmentName: string
  @ApiProperty()
  transactionType: string
  @ApiProperty()
  remarks: string
  @ApiProperty()
  actionTaken: string

  @ApiProperty({ type: CreateRequestForInspectionTypeDto, isArray: true })
  type: CreateRequestForInspectionTypeDto[];

  @ApiProperty({ type: CreateRequestForInspectionItemDetailsDto, isArray: true })
  items: CreateRequestForInspectionItemDetailsDto[];
}
