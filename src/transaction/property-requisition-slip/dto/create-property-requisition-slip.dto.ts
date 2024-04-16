import { ApiProperty } from "@nestjs/swagger"
import { CreatePropertyRequisitionSlipItemDetailsDto } from "./create-property-requisition-slip-item-details.dto"

export class CreatePropertyRequisitionSlipDto {
  @ApiProperty()
  transactionNo: string
  @ApiProperty()
  transactionDate: Date
  @ApiProperty()
  requestorId: string
  @ApiProperty()
  requestorName: string
  @ApiProperty()
  preparedById: string
  @ApiProperty()
  preparedByName: string
  @ApiProperty()
  dateFrom: Date
  @ApiProperty()
  dateTo: Date
  @ApiProperty()
  purpose: string
  @ApiProperty()
  remarks: string

  @ApiProperty({ type: CreatePropertyRequisitionSlipItemDetailsDto, isArray: true })
  items: CreatePropertyRequisitionSlipItemDetailsDto[];
}