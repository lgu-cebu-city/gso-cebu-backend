import { ApiProperty } from "@nestjs/swagger"
import { CreateAbstractOfCanvassSupplierDetailsDto } from "./create-abstract-of-canvass-supplier-details.dto"

export class CreateAbstractOfCanvassDto {
  @ApiProperty()
  rfqNo: string
  @ApiProperty()
  transactionNo: string
  @ApiProperty()
  transactionDate: Date
  @ApiProperty()
  supplyDescription: string
  @ApiProperty()
  remarks: string
  @ApiProperty()
  bacChairman: string
  @ApiProperty()
  bacVChairman: string
  @ApiProperty()
  bacMember1: string
  @ApiProperty()
  bacMember2: string
  @ApiProperty()
  bacMember3: string
  @ApiProperty()
  bacMember4: string
  @ApiProperty({ type: CreateAbstractOfCanvassSupplierDetailsDto, isArray: true })
  supplier: CreateAbstractOfCanvassSupplierDetailsDto[];
}
