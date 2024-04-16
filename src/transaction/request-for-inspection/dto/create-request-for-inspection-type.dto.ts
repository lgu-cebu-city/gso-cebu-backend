import { ApiProperty } from "@nestjs/swagger"

export class CreateRequestForInspectionTypeDto {
  @ApiProperty()
  type: string
}
