import { ApiProperty } from "@nestjs/swagger"

export class CreatePropertyRequisitionSlipItemDetailsDto {
  @ApiProperty()
  itemCode: string
  @ApiProperty()
  itemId: string
  @ApiProperty()
  description: string
  @ApiProperty()
  uom: string
  @ApiProperty()
  areId: string
  @ApiProperty()
  areNo: string
}
