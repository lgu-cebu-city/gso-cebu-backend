import {ViewEntity, ViewColumn, PrimaryColumn} from "typeorm";

@ViewEntity({
    expression: `
    SELECT
      are.id 'transactionId',
      'PAR' AS 'type',
      are.parNo 'transactionNo',
      are.parDate 'transactionDate',
      are.departmentId,
      are.departmentName,
      are.status,
      arei.id,
      arei.propertyNo,
      arei.brandId,
      arei.brand,
      arei.uom,
      arei.price,
      arei.receivedQuantity,
      arei.serialNo,
      arei.model
    FROM
      acknowledgement_receipt_of_equipment_items arei
      INNER JOIN acknowledgement_receipt_of_equipment are
        ON(are.id = arei.areId)
    WHERE
      (SELECT COUNT(*) FROM waste_material_report_item_details w WHERE w.refId=are.id AND w.itemId=arei.brandId AND w.refType='PAR') = 0
        
    UNION ALL
        
    SELECT
      ics.id 'transactionId',
      'ICS' AS 'type',
      ics.icsNo 'transactionNo',
      ics.icsDate 'transactionDate',
      ics.departmentId,
      ics.departmentName,
      ics.status,
      icsi.id,
      icsi.propertyNo,
      icsi.brandId,
      icsi.brand,
      icsi.uom,
      icsi.price,
      icsi.receivedQuantity,
      icsi.serialNo,
      icsi.model
    FROM
      inventory_custodian_slip_items icsi
      INNER JOIN inventory_custodian_slip ics
        ON(ics.id = icsi.icsId)
    WHERE
      (SELECT COUNT(*) FROM waste_material_report_item_details w WHERE w.refId=ics.id AND w.itemId=icsi.brandId AND w.refType='ICS') = 0
    `
})

export class WmrAreIcsItemsView {  
  @ViewColumn()
  transactionId: string
  @ViewColumn()
  type: string
  @ViewColumn()
  transactionNo: string
  @ViewColumn()
  transactionDate: string
  @ViewColumn()
  departmentId: string
  @ViewColumn()
  departmentName: string
  @ViewColumn()
  status: string
  @PrimaryColumn()
  id: string
  @ViewColumn()
  propertyNo: number
  @ViewColumn()
  brandId: number
  @ViewColumn()
  brand: number
  @ViewColumn()
  uom: string
  @ViewColumn()
  price: string
  @ViewColumn()
  receivedQuantity: Date
  @ViewColumn()
  serialNo: string
  @ViewColumn()
  model: string
}