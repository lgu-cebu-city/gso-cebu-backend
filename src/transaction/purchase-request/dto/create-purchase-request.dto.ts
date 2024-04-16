import { ApiProperty } from "@nestjs/swagger"
import { CreatePurchaseRequestItemDetailsDto } from "./create-purchase-request-item-details.dto"
import { CreatePurchseRequestSOFListDto } from "./create-purchase-request-sof-list.dto"
import { CreatePurchseRequestImageAttachment } from "./create-purchase-request-image-attachment.dto"

export class CreatePurchaseRequestDto {
  @ApiProperty()
  prType: string
  @ApiProperty()
  prNo: string
  @ApiProperty()
  prDate: Date
  @ApiProperty()
  prQtr: string
  @ApiProperty()
  title: string
  @ApiProperty()
  departmentId: string
  @ApiProperty()
  departmentName: string
  @ApiProperty()
  sectionId: string
  @ApiProperty()
  sectionName: string
  @ApiProperty()
  alobsNo: string
  @ApiProperty()
  alobsDate: Date
  @ApiProperty()
  saiNo: string
  @ApiProperty()
  saiDate: Date
  @ApiProperty()
  transactionNo: string
  @ApiProperty()
  transactionDate: Date
  @ApiProperty()
  ppId: string
  @ApiProperty()
  ppNo: string
  @ApiProperty()
  sourceOfFund: string
  @ApiProperty()
  rationale: string
  @ApiProperty()
  procurementMode: string
  @ApiProperty()
  entryByDepartment: string
  @ApiProperty()
  entryByUser: string
  @ApiProperty()
  requestedByName : string
  @ApiProperty()
  requestedByPosition: string
  @ApiProperty()
  cashAvailabilityName: string
  @ApiProperty()
  cashAvailabilityPosition: string
  @ApiProperty()
  approvedByName: string
  @ApiProperty()
  approvedByPosition: string
  @ApiProperty({ type: CreatePurchseRequestSOFListDto, isArray: true })
  sof: CreatePurchseRequestSOFListDto[];
  @ApiProperty({ type: CreatePurchseRequestImageAttachment, isArray: true })
  img: CreatePurchseRequestImageAttachment[];
  @ApiProperty({ type: CreatePurchaseRequestItemDetailsDto, isArray: true })
  items: CreatePurchaseRequestItemDetailsDto[];


}
