import {ViewEntity, ViewColumn, PrimaryColumn, ManyToOne, JoinColumn} from "typeorm";
import { PurchaseRequest } from "./purchase-request.entity";

@ViewEntity({
    expression: `
    SELECT   
      prmain_br_detail.id 'id',
      view_main.id 'prId',
      po.id 'poId',
      po.prNo  'prNo',
      po.transactionNo 'poNo',
      prmain_br_detail.itemId,
      prmain_br_detail.description,
      IFNULL(prmain_br_detail.specification,'') 'specification',
      prmain_br_detail.uom,
      po_item.cost 'cost',
      prmain_br_detail.quantity - IFNULL(ris.issuedQty,0) 'quantity',
      prmain_br_detail.typeId
    FROM
      gso_cebu.purchase_order  po 
      INNER JOIN gso_cebu. purchase_order_item_details po_item
        ON po_item.poId = po.id 
      INNER JOIN gso_cebu.inspection_and_acceptance_report iar
        ON iar.poId = po.id AND iar.status = 'ACTIVE'
      INNER JOIN gso_cebu.inspection_and_acceptance_report_items iari
        ON iari.iarId = iar.id AND iari.poItemId = po_item.id
      LEFT JOIN  gso_cebu.purchase_request prconso
        ON po.prId = prconso.id
      LEFT JOIN  gso_cebu.purchase_request_view view_main
        ON view_main.prId = prconso.id
      LEFT JOIN  gso_cebu.purchase_request_item_details prmain_br_detail
        ON prmain_br_detail.prId = view_main.id
      LEFT JOIN (
        SELECT
          risid.prItemId,
          SUM(CASE
          WHEN unitId = '' THEN
          risid.issuedQty
          ELSE 
          risid.issuedQty / uc.quantity4 / uc.quantity3 / uc.quantity2 / uc.quantity1
          END) 'issuedQty'
        FROM 
          requisition_issuance_slip_item_details risid
          INNER JOIN requisition_issuance_slip ris
            ON ris.id = risid.risId
          LEFT JOIN unit_conversion uc
          ON (unitId = uc.id)
        WHERE
          ris.status = 'ACTIVE'
        GROUP BY
          risid.prItemId
      ) ris
        ON ris.prItemId = prmain_br_detail.id
    WHERE 
      po_item.itemId = prmain_br_detail.itemId 
      AND po.status = 'Active'
      AND prmain_br_detail.quantity > 0
      and prmain_br_detail.quantity - IFNULL(ris.issuedQty,0) > 0
    `
})

export class PurchaseRequestIssuanceItemsView {
  @PrimaryColumn()
  id: string
  @PrimaryColumn()
  prId: string
  @ViewColumn()
  poId: string
  @ViewColumn()
  prNo: string
  @ViewColumn()
  poNo: string
  @ViewColumn()
  itemId: string
  @ViewColumn()
  description: string
  @ViewColumn()
  specification: string
  @ViewColumn()
  uom: string
  @ViewColumn()
  cost: number
  @ViewColumn()
  quantity: number
  @ViewColumn()
  typeId: string
  
  @ManyToOne(() => PurchaseRequest, o => o.issuanceItems)
    @JoinColumn()
    pr: PurchaseRequest
}