import { ApiProperty } from "@nestjs/swagger"
import { CreateBarangayIssuanceItemDetailsDto } from "./create-barangay-issuance-item-details.dto"

export class CreateBarangayIssuanceDto {
  @ApiProperty()
  id: string
  @ApiProperty()
  transactionNo: string
  @ApiProperty()
  transactionDate: Date
  @ApiProperty()
  accountablePersonIdFrom: string
  @ApiProperty()
  accountablePersonNameFrom: string
  @ApiProperty()
  accountablePersonDesignationFrom: string
  @ApiProperty()
  accountablePersonIdTo: string
  @ApiProperty()
  accountablePersonNameTo: string
  @ApiProperty()
  accountablePersonDesignationTo: string
  @ApiProperty()
  approvePersonId: string
  @ApiProperty()
  approvePersonName: string
  @ApiProperty()
  approvePersonDesignation: string
  @ApiProperty()
  releasePersonId: string
  @ApiProperty()
  releasePersonName: string
  @ApiProperty()
  releasePersonDesignation: string
  @ApiProperty()
  remarks: string
  @ApiProperty()
  entryByDepartment: string
  @ApiProperty()
  entryByUser: string

  @ApiProperty({ type: CreateBarangayIssuanceItemDetailsDto, isArray: true })
  items: CreateBarangayIssuanceItemDetailsDto[];
}
