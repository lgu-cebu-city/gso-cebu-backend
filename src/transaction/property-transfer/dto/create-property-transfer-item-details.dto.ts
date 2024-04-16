import { ApiProperty } from "@nestjs/swagger"
import { CreatePropertyTransferItemBatchDetailsDto } from "./create-property-transfer-item-batch-details.dto"

export class CreatePropertyTransferItemDetailsDto {
  @ApiProperty()
  itemId: string
  @ApiProperty()
  itemCode: string
  @ApiProperty()
  description: string
  @ApiProperty()
  unitId: string
  @ApiProperty()
  uom: string
  @ApiProperty()
  requestedQty: number
  @ApiProperty()
  issuedUnit: string
  @ApiProperty()
  issuedQty: number
  @ApiProperty()
  lotNo: string
  @ApiProperty()
  genericId: string
  @ApiProperty()
  groupId: string
  @ApiProperty()
  price: number
  @ApiProperty()
  remarks: string

  @ApiProperty({ type: CreatePropertyTransferItemBatchDetailsDto, isArray: true })
  itemsDetails: CreatePropertyTransferItemBatchDetailsDto[];
}
