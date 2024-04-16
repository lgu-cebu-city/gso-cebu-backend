import { PurchaseOrderItemDetails } from "src/transaction/purchase-order/entities/purchase-order-item-details.entity";
import {ViewEntity, ViewColumn, ManyToOne, JoinColumn, PrimaryColumn} from "typeorm";

@ViewEntity({
    expression: `
    SELECT
      iari.id,
      iari.poItemId,
      iar.referenceNo,
      iar.referenceDate,
      iar.invoiceNo,
      iar.invoiceDate,
      iari.quantity,
      iari.receivedQuantity,
      iari.quantity - SUM(receivedQuantity) over (PARTITION BY poItemId ORDER BY referenceDate ASC) AS balance,
      iari.itemId,
      iari.description,
      iari.brandId,
      iari.brand,
      iari.uom,
      iari.price
    FROM
      inspection_and_acceptance_report_actual_items iari
      INNER JOIN inspection_and_acceptance_report_actual iar
        ON (iari.iarId = iar.id)
    WHERE
      iar.status = 'ACTIVE'
    ORDER BY
      iar.referenceDate ASC
    `
})

export class InspectionAndAcceptanceReportActualDeliveryItemsView { 
  @PrimaryColumn()
  id: string
  @ViewColumn()
  poItemId: string
  @ViewColumn()
  referenceNo: string
  @ViewColumn()
  referenceDate: Date
  @ViewColumn()
  invoiceNo: string
  @ViewColumn()
  invoiceDate: Date
  @ViewColumn()
  quantity: number
  @ViewColumn()
  receivedQuantity: number
  @ViewColumn()
  balance: number
  @ViewColumn()
  itemId: string
  @ViewColumn()
  description: string
  @ViewColumn()
  brandId: string
  @ViewColumn()
  brand: string
  @ViewColumn()
  uom: string
  @ViewColumn()
  price: number
  
  @ManyToOne(() => PurchaseOrderItemDetails, i => i.drActual)
    @JoinColumn()
    poItem: PurchaseOrderItemDetails
}