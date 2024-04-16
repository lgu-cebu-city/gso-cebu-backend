import { ApiProperty } from "@nestjs/swagger"

export class CreateRequestForRepairItemDetailsDto {
  @ApiProperty()
  itemNo: number
  @ApiProperty()
  itemId: string
  @ApiProperty()
  description: string
  @ApiProperty()
  areId: string
  @ApiProperty()
  areNo: string
  @ApiProperty()
  natureOfRequest: string
  @ApiProperty()
  remarks: string
}
