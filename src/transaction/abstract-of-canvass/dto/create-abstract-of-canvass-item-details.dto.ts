import { ApiProperty } from "@nestjs/swagger"

export class CreateAbstractOfCanvassItemDetailsDto {
  @ApiProperty()
  itemId: string
  @ApiProperty()
  description: string
  @ApiProperty()
  specification: string
  @ApiProperty()
  uom: string
  @ApiProperty()
  quantity: number
  @ApiProperty()
  typeId: string
  @ApiProperty()
  price: number
  @ApiProperty()
  priceRead: number
  @ApiProperty()
  priceCalculated: number
  @ApiProperty()
  remarks: string
}
