import { ApiProperty } from "@nestjs/swagger"

export class CreateSupplierDto {
  @ApiProperty()
  name: string
  @ApiProperty()
  address: string
  @ApiProperty()
  contactNumber: string
  @ApiProperty()
  contactPerson: string
}
