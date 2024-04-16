import { ApiProperty } from "@nestjs/swagger"
import { CreatePropertyAccountabilitySlipItemDetailsDto } from "./create-property-accountability-slip-item-details.dto"

export class CreatePropertyAccountabilitySlipDto {
  @ApiProperty()
  transactionNo: string
  @ApiProperty()
  transactionDate: Date
  @ApiProperty()
  propReqId: string
  @ApiProperty()
  requestorId: string
  @ApiProperty()
  requestorName: string
  @ApiProperty()
  approvedById: string
  @ApiProperty()
  approvedByName: string
  @ApiProperty()
  dateFrom: Date
  @ApiProperty()
  dateTo: Date
  @ApiProperty()
  requestType: string
  @ApiProperty()
  purpose: string
  @ApiProperty()
  remarks: string

  @ApiProperty({ type: CreatePropertyAccountabilitySlipItemDetailsDto, isArray: true })
  items: CreatePropertyAccountabilitySlipItemDetailsDto[];
}