import { ApiProperty } from "@nestjs/swagger"

export class CreateFundCategoryDto {
  @ApiProperty()
  book: number
  @ApiProperty()
  fundId: number
  @ApiProperty()
  name: string
  @ApiProperty()
  code: string
  @ApiProperty()
  classOrder: number
  @ApiProperty()
  deleted_at: Date
}
