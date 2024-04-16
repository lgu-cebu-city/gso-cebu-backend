import {ViewEntity, ViewColumn, PrimaryColumn} from "typeorm";

@ViewEntity({
    expression: `
    SELECT
      pori.id 'transactionId',
      'PRI' AS 'type',
      pori.transactionNo,
      pori.transactionDate,
      pori.departmentId,
      pori.departmentName,
      pori.status,
      porii.id,
      '' AS 'propertyNo',
      porii.itemId 'brandId',
      porii.description 'brand',
      porii.uom,
      porii.cost 'price',
      porii.quantity 'receivedQuantity',
      '' AS 'serialNo',
      '' AS 'model'
    FROM
      post_repair_inspection_item_details porii
      INNER JOIN post_repair_inspection pori
        ON (pori.id = porii.poriId)
    WHERE
      (SELECT COUNT(*) FROM waste_material_report_item_details w WHERE w.refId=pori.id AND w.itemId=porii.itemId AND w.refType='PRI') = 0
    `
})

export class WmrPostRepairItemsView {  
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