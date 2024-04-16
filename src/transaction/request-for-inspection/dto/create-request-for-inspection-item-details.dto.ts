import { ApiProperty } from "@nestjs/swagger"

export class CreateRequestForInspectionItemDetailsDto {
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
  issue: string
  @ApiProperty()
  remarks: string
}
