import { ApiProperty } from "@nestjs/swagger"
import { CreatePropertyTransferItemDetailsDto } from "./create-property-transfer-item-details.dto"

export class CreatePropertyTransferDto {
  @ApiProperty()
  id: string
  @ApiProperty()
  transactionNo: string
  @ApiProperty()
  transactionDate: Date
  @ApiProperty()
  risId: string
  @ApiProperty()
  risNo: string
  @ApiProperty()
  accountablePersonIdFrom: string
  @ApiProperty()
  accountablePersonNameFrom: string
  @ApiProperty()
  accountablePersonDesignationFrom: string
  @ApiProperty()
  accountablePersonIdTo: string
  @ApiProperty()
  accountablePersonNameTo: string
  @ApiProperty()
  accountablePersonDesignationTo: string
  @ApiProperty()
  approvePersonId: string
  @ApiProperty()
  approvePersonName: string
  @ApiProperty()
  approvePersonDesignation: string
  @ApiProperty()
  releasePersonId: string
  @ApiProperty()
  releasePersonName: string
  @ApiProperty()
  releasePersonDesignation: string
  @ApiProperty()
  remarks: string

  @ApiProperty({ type: CreatePropertyTransferItemDetailsDto, isArray: true })
  items: CreatePropertyTransferItemDetailsDto[];
}
