import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
  @ApiProperty()
  username: string
  @ApiProperty()
  password: string
  @ApiProperty()
  empId: string
  @ApiProperty()
  name: string
  @ApiProperty()
  userType: string
  @ApiProperty()
  typeId: string
  @ApiProperty()
  typeName: string
  @ApiProperty()
  positionId: string
  @ApiProperty()
  positionName: string
  @ApiProperty()
  userEmployeeId: string
  @ApiProperty()
  userEmployeeName: string
}

export class LoginRequestPayload {
  @ApiProperty()
  username: string
  @ApiProperty()
  password: string
}
