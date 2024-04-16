import { ApiProperty } from "@nestjs/swagger"

export class CreateDepartmentDto {
  @ApiProperty()
  code: string
  @ApiProperty()
  nationalCode: string
  @ApiProperty()
  name: string
  @ApiProperty()
  type: string
  @ApiProperty()
  description: string
  @ApiProperty()
  sequence: number
  @ApiProperty()
  status: string
  @ApiProperty()
  prefix: string
  @ApiProperty()
  group_code: string
  @ApiProperty()
  group_name: string
  @ApiProperty()
  position_category: string
  @ApiProperty()
  emp_head: string
}
