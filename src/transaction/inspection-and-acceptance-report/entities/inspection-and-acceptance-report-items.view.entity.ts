import {ViewEntity, ViewColumn, ManyToOne, JoinColumn, OneToMany, PrimaryColumn} from "typeorm";
import { InspectionAndAcceptanceReportSubItems } from "./inspection-and-acceptance-report-sub-items.entity";
import { InspectionAndAcceptanceReport } from "./inspection-and-acceptance-report.entity";

@ViewEntity({
    expression: `
    SELECT
      a.*,
      t.groupId 'typeId'
    FROM
      (SELECT
        iari.id,
        iari.poItemId,
        iari.itemId,
        iari.description,
        iari.uom,
        iari.quantity - SUM(IFNULL(arei.quantity,0)) - SUM(IFNULL(icsi.quantity,0)) 'quantity',
        iari.receivedQuantity - SUM(IFNULL(arei.receivedQuantity,0)) - SUM(IFNULL(icsi.receivedQuantity,0)) 'receivedQuantity',
        iari.brand,
        iari.brandId,
        iari.iarId,
        iari.price,
        iari.expirationDate,
        iari.lotNo,
        iari.remarks,
        iari.groupId,
        iari.groupName,
        iari.serialNo,
        iari.model,
        iari.itemNo
      FROM
        inspection_and_acceptance_report_items iari
        LEFT JOIN acknowledgement_receipt_of_equipment_items arei
          ON(iari.iarId = arei.iarId AND iari.itemId = arei.itemId)
        LEFT JOIN inventory_custodian_slip_items icsi
          ON(iari.iarId = icsi.iarId AND iari.itemId = icsi.itemId)
      GROUP BY
        iari.id, arei.itemId, icsi.itemId) a
      INNER JOIN gso_cebu.type t
        ON(a.groupId = t.id)
    WHERE
      quantity > 0
    `
})

export class InspectionAndAcceptanceReportItemsView { 
  @PrimaryColumn()
  id: string
  
  @ManyToOne(() => InspectionAndAcceptanceReport, i => i.items)
    @JoinColumn()
    iar: InspectionAndAcceptanceReport
    
  @ViewColumn()
  poItemId: string
  @ViewColumn()
  groupId: string
  @ViewColumn()
  groupName: string
  @ViewColumn()
  itemId: string
  @ViewColumn()
  description: string
  @ViewColumn()
  uom: string
  @ViewColumn()
  quantity: number
  @ViewColumn()
  price: number
  @ViewColumn()
  receivedQuantity: number
  @ViewColumn()
  brand: string
  @ViewColumn()
  brandId: string
  @ViewColumn()
  expirationDate: Date
  @ViewColumn()
  lotNo: string
  @ViewColumn()
  remarks: string
  @ViewColumn()
  serialNo: string
  @ViewColumn()
  model: string
  @ViewColumn()
  itemNo: string
  @ViewColumn()
  typeId: string

  @OneToMany(() => InspectionAndAcceptanceReportSubItems, i => i.iari)
  subItems: InspectionAndAcceptanceReportSubItems[]
}