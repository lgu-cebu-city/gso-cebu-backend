import { ApiProperty } from "@nestjs/swagger"

export class CreatePreRepairInspectionItemDetailsDto {
  @ApiProperty()
  itemId: string
  @ApiProperty()
  description: string
  @ApiProperty()
  type: string
  @ApiProperty()
  uom: string
  @ApiProperty()
  quantity: number
  @ApiProperty()
  cost: number
  @ApiProperty()
  total: number
  @ApiProperty()
  remarks: string
}
