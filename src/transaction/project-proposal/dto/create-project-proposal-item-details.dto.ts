import { ApiProperty } from "@nestjs/swagger"

export class CreateProjectProposalItemDetailsDto {
  @ApiProperty()
  itemId: string
  @ApiProperty()
  description: string
  @ApiProperty()
  type: string
  @ApiProperty()
  quantity: number
  @ApiProperty()
  uom: string
  @ApiProperty()
  cost: number
  @ApiProperty()
  total: number
  @ApiProperty()
  remarks: string
}
