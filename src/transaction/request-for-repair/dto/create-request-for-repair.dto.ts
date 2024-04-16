import { ApiProperty } from "@nestjs/swagger"
import { CreateRequestForRepairItemDetailsDto } from "./create-request-for-repair-item-details.dto"

export class CreateRequestForRepairDto {
  @ApiProperty()
  transactionNo: string
  @ApiProperty()
  transactionDate: Date
  @ApiProperty()
  departmentId: string
  @ApiProperty()
  departmentName: string
  @ApiProperty()
  reason: string
  @ApiProperty()
  remarks: string

  @ApiProperty({ type: CreateRequestForRepairItemDetailsDto, isArray: true })
  items: CreateRequestForRepairItemDetailsDto[];
}
