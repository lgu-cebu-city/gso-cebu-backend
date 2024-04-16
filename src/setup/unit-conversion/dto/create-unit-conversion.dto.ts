import { ApiProperty } from "@nestjs/swagger"

export class CreateUnitConversionDto {
  @ApiProperty()
  unit1: string
  @ApiProperty()
  quantity1: number
  @ApiProperty()
  unit2: string
  @ApiProperty()
  quantity2: number
  @ApiProperty()
  unit3: string
  @ApiProperty()
  quantity3: number
  @ApiProperty()
  unit4: string
  @ApiProperty()
  quantity4: number
  @ApiProperty()
  itemType: string
}
