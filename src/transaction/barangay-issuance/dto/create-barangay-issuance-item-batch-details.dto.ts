import { ApiProperty } from "@nestjs/swagger"

export class CreateBarangayIssuanceItemBatchDetailsDto {
  @ApiProperty()
  itemId: string
  @ApiProperty()
  batchNo: string
  @ApiProperty()
  expirationDate: Date
  @ApiProperty()
  quantity: number
  @ApiProperty()
  remarks: string
}
