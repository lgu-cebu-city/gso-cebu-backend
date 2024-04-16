import { ApiProperty } from "@nestjs/swagger"
import { CreateRequisitionIssuanceSlipItemBatchDetailsDto } from "./create-requisition-issuance-slip-item-batch-details.dto"

export class CreateRequisitionIssuanceSlipItemDetailsDto {
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
  @ApiProperty()
  prItemId: string

  @ApiProperty({ type: CreateRequisitionIssuanceSlipItemBatchDetailsDto, isArray: true })
  itemsDetails: CreateRequisitionIssuanceSlipItemBatchDetailsDto[];
}
