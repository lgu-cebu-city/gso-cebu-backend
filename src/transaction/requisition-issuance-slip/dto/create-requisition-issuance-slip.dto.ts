import { ApiProperty } from "@nestjs/swagger"
import { CreateRequisitionIssuanceSlipItemDetailsDto } from "./create-requisition-issuance-slip-item-details.dto"

export class CreateRequisitionIssuanceSlipDto {
  @ApiProperty()
  transactionNo: string
  @ApiProperty()
  transactionDate: Date
  @ApiProperty()
  saiNo: string
  @ApiProperty()
  saiDate: Date
  @ApiProperty()
  division: string
  @ApiProperty()
  departmentId: string
  @ApiProperty()
  departmentName: string
  @ApiProperty()
  purpose: string
  @ApiProperty()
  issuanceType: string
  @ApiProperty()
  transactionType: string
  @ApiProperty()
  transactionStatus: string
  @ApiProperty()
  entryByDepartment: string
  @ApiProperty()
  entryByUser: string

  @ApiProperty({ type: CreateRequisitionIssuanceSlipItemDetailsDto, isArray: true })
  items: CreateRequisitionIssuanceSlipItemDetailsDto[];
}
