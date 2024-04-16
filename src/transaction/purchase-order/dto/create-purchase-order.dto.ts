import { ApiProperty } from "@nestjs/swagger"
import { CreatePurchaseOrderItemDetailsDto } from "./create-purchase-order-item-details.dto"

export class CreatePurchaseOrderDto {
  @ApiProperty()
  transactionNo: string
  @ApiProperty()
  transactionDate: Date
  @ApiProperty()
  canvassId: string
  @ApiProperty()
  canvassNo: string
  @ApiProperty()
  prId: string
  @ApiProperty()
  prNo: string
  @ApiProperty()
  procurementMode: string
  @ApiProperty()
  supplierId: string
  @ApiProperty()
  supplierName: string
  @ApiProperty()
  supplierAddress: string
  @ApiProperty()
  supplierContactNo: string
  @ApiProperty()
  supplierRemarks: string
  @ApiProperty()
  deliveryPlace: string
  @ApiProperty()
  deliveryDate: Date
  @ApiProperty()
  deliveryTerm: string
  @ApiProperty()
  paymentTerm: string

  @ApiProperty({ type: CreatePurchaseOrderItemDetailsDto, isArray: true })
  items: CreatePurchaseOrderItemDetailsDto[];
}
