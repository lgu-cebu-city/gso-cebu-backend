import {ViewEntity, ViewColumn, OneToMany, PrimaryColumn} from "typeorm";
import { AcknowledgementReceiptOfEquipmentSubItems } from "./acknowledgement-reecipt-of-equipment-sub-items.entity";

@ViewEntity({
    expression: `
    SELECT
      are.id 'areId',
      are.parNo,
      are.parDate,
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
    `
})

export class AcknowledgementReceiptOfEquipmentItemsView {  
  @ViewColumn()
  areId: string
  @ViewColumn()
  parNo: string
  @ViewColumn()
  parDate: string
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

  @OneToMany(() => AcknowledgementReceiptOfEquipmentSubItems, i => i.arei)
  subItems: AcknowledgementReceiptOfEquipmentSubItems[]
}