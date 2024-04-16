import { ApiProperty } from "@nestjs/swagger"
import { CreatePropertyReturnSlipItemDetailsDto } from "./create-property-return-slip-item-details.dto"

export class CreatePropertyReturnSlipDto {
  @ApiProperty()
  transactionNo: string
  @ApiProperty()
  transactionDate: Date
  @ApiProperty()
  propAccId: string
  @ApiProperty()
  requestorId: string
  @ApiProperty()
  requestorName: string
  @ApiProperty()
  receivedById: string
  @ApiProperty()
  receivedByName: string
  @ApiProperty()
  processedById: string
  @ApiProperty()
  processedByName: string
  @ApiProperty()
  returnStatus: string
  @ApiProperty()
  remarks: string

  @ApiProperty({ type: CreatePropertyReturnSlipItemDetailsDto, isArray: true })
  items: CreatePropertyReturnSlipItemDetailsDto[];
}