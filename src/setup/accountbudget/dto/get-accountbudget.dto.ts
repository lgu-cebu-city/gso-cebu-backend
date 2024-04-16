import { ApiProperty } from "@nestjs/swagger"

export class GetAccountBudgetDto {
  @ApiProperty()
  SOF: string
  @ApiProperty()
  DepartmentName: string
  @ApiProperty()
  BYear: number
  @ApiProperty()
  Category: string
}
