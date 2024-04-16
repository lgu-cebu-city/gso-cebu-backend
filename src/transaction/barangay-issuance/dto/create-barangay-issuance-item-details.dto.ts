import { ApiProperty } from "@nestjs/swagger"
import { CreateBarangayIssuanceItemBatchDetailsDto } from "./create-barangay-issuance-item-batch-details.dto"

export class CreateBarangayIssuanceItemDetailsDto {
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

  @ApiProperty({ type: CreateBarangayIssuanceItemBatchDetailsDto, isArray: true })
  itemsDetails: CreateBarangayIssuanceItemBatchDetailsDto[];
}
