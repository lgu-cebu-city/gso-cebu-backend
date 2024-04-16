import { ApiProperty } from "@nestjs/swagger"
import { CreateAbstractOfCanvassItemDetailsDto } from "./create-abstract-of-canvass-item-details.dto"

export class CreateAbstractOfCanvassSupplierDetailsDto {
  @ApiProperty()
  supplierSeq: string
  @ApiProperty()
  supplierId: string
  @ApiProperty()
  address: string
  @ApiProperty()
  contactNumber: string
  @ApiProperty()
  remarks: string
  @ApiProperty({ type: CreateAbstractOfCanvassItemDetailsDto, isArray: true })
  items: CreateAbstractOfCanvassItemDetailsDto[];
  @ApiProperty()
  approved: boolean
}
