import { ApiProperty } from "@nestjs/swagger"

export class CreateWasteMaterialReportItemDetailsDto {
  @ApiProperty()
  itemCode: string
  @ApiProperty()
  quantity: number
  @ApiProperty()
  itemId: string
  @ApiProperty()
  description: string
  @ApiProperty()
  uom: string
  @ApiProperty()
  refId: string
  @ApiProperty()
  refNo: string
  @ApiProperty()
  refType: string
  @ApiProperty()
  orNo: string
  @ApiProperty()
  orDate: Date
  @ApiProperty()
  amount: number
}
