import {ViewEntity, ViewColumn, ManyToOne, JoinColumn, PrimaryColumn} from "typeorm";
import { InventoryCustodianSlipView } from "./inventory-custodian-slip.view.entity";

@ViewEntity({
    expression: `
    SELECT
      iari.id,
      iari.poItemId,
      iari.itemId,
      i.code 'itemCode',
      iari.description,
      iari.uom,
      iari.quantity,
      iari.receivedQuantity,
      iari.brand,
      iari.brandId,
      iari.expirationDate,
      iari.lotNo,
      iari.remarks,
      iari.price,
      g.description AS 'group',
      iari.iarId AS 'icsId'
    FROM
      inspection_and_acceptance_report_items iari
      INNER JOIN item i
        ON (i.id = iari.brandId)
      INNER JOIN \`group\` g
        ON (g.id = i.groupId)
    `
})

export class InventoryCustodianSlipItemsView {  
  @PrimaryColumn()
  id: string
  @ViewColumn()
  poItemId: string
  @ViewColumn()
  itemId: string
  @ViewColumn()
  itemCode: string
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
  group: string
  @ViewColumn()
  icsId: string
  
  @ManyToOne(() => InventoryCustodianSlipView, a => a.items)
    @JoinColumn()
    ics: InventoryCustodianSlipView
}