import { ApiProperty } from "@nestjs/swagger"
import { Group } from "src/setup/group/entities/group.entity";

export class CreateTypeDto {
  @ApiProperty()
  description: string
  @ApiProperty()
  groupName: string
  @ApiProperty()
  groupId: string
  @ApiProperty()
  categoryName: string
  @ApiProperty()
  categoryId: string
  @ApiProperty()
  isMedicine: string
  @ApiProperty()
  isWithExpiry: string
  @ApiProperty()
  typeCode: string

  @ApiProperty({ type: Group, isArray: true })
  group: Group[];
}
