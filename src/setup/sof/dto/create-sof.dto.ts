import { ApiProperty } from "@nestjs/swagger"

export class CreateSOFDto {
  @ApiProperty()
  SOFName: string
}
