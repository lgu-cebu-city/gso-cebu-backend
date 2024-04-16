import { ApiProperty } from "@nestjs/swagger"

export class CreateSectionDto {
  @ApiProperty()
  sectionName: string
  @ApiProperty()
  departmentId: string
}
