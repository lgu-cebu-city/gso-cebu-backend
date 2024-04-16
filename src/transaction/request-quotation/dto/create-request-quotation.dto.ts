import { ApiProperty } from "@nestjs/swagger"
import { CreateRequestQuotationItemDetailsDto } from "./create-request-quotation-item-details.dto"

export class CreateRequestQuotationDto {
  @ApiProperty()
  transactionNo: string
  @ApiProperty()
  transactionDate: Date
  @ApiProperty()
  recommendingDate: Date
  @ApiProperty()
  prId: string
  @ApiProperty()
  prNo: string
  @ApiProperty()
  prDate: Date
  @ApiProperty()
  departmentId: string
  @ApiProperty()
  departmentName: string
  @ApiProperty()
  openningDate: Date
  @ApiProperty()
  location: string
  @ApiProperty()
  canvasserId: string
  @ApiProperty()
  canvasserName: string
  @ApiProperty()
  procurementMode: string
  @ApiProperty()
  biddingType: string
  @ApiProperty()
  approvedBudget: number
  @ApiProperty()
  bidSecurity: number
  @ApiProperty()
  bidDocsFee: number
  @ApiProperty()
  supplyDescription: string
  @ApiProperty()
  deliveryPeriod: number
  @ApiProperty()
  priceValidity: number
  @ApiProperty({ type: CreateRequestQuotationItemDetailsDto, isArray: true })
  items: CreateRequestQuotationItemDetailsDto[];
}
