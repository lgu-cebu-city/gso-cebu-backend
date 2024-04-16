import { ApiProperty } from "@nestjs/swagger"

export class CreatePurchseRequestSOFListDto {
  @ApiProperty()
  sofId: string
  @ApiProperty()
  sofDescription: string
  @ApiProperty()
  year: string
  @ApiProperty()
  amount: number
}
