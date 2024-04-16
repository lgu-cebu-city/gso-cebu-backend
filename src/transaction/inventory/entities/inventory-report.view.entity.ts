import {ViewEntity, ViewColumn, OneToMany, PrimaryColumn} from "typeorm";
import { InventoryReportDetailsView } from "./inventory-report-details.view.entity";

@ViewEntity({
    expression: `
    SELECT
      inv.id,
      inv.genericId,
      i.description AS 'generic',
      inv.code AS 'itemCode',
      inv.description,
      inv.uom,
      inv.category,
      inv.typeId,
      inv.typedesc AS 'type',
      inv.groupdesc AS 'group',
      inv.price,
      receivedQty,
      withdrawnQty,
      returnQty,
      receivedQty + returnQty - withdrawnQty AS 'onhandQty'
    FROM
      item i
      INNER JOIN (SELECT
        i.id,
        il.itemId 'genericId',
        CODE,
        i.description,
        uom,
        category,
        typeId,
        t.description 'typedesc',
        g.description 'groupdesc',
        il.quantity 'receivedQty',
        il.price,
        IFNULL(
          (SELECT 
            SUM(CASE
              WHEN unitId = '' THEN
              issuedQty
              ELSE 
              issuedQty / uc.quantity4 / uc.quantity3 / uc.quantity2 / uc.quantity1
            END)
          FROM
            requisition_issuance_slip_item_details
            LEFT JOIN unit_conversion uc
              ON (unitId = uc.id)
          WHERE
            itemId = i.id AND
            risId IN (
              SELECT
                id
              FROM
                requisition_issuance_slip
              WHERE
                (transactionStatus = 'Issued' ||
                transactionStatus = 'Transfered') AND
                STATUS = 'ACTIVE'
              )
          )
        , 0) AS 'withdrawnQty',
        0 AS 'returnQty'
      FROM
        item i
        INNER JOIN gso_bayugan.type t
          ON (t.id = i.typeId)
        INNER JOIN gso_bayugan.group g
          ON (g.id = i.groupId)
        INNER JOIN (
          SELECT
            itemId,
            brandId,
            description,
            MIN(price) 'price',
            SUM(quantity) 'quantity'
          FROM
            inventory_ledger
          WHERE
            STATUS = 'ACTIVE' AND
            refType = 'Receive' AND
            (SELECT status FROM inspection_and_acceptance_report WHERE id = refId) = 'ACTIVE'
          GROUP BY
            itemId
          ) il
          ON (il.itemId = i.id)
      WHERE
        category = 'Generic') inv
        ON (i.id = inv.genericId)
    WHERE
      receivedQty != 0 OR
      withdrawnQty != 0 OR
      returnQty != 0
    `
})

export class InventoryReportView {
  @PrimaryColumn()
  id: string;
	@ViewColumn()
  genericId: string;
	@ViewColumn()
  generic: string;
	@ViewColumn()
  itemCode: string;
	@ViewColumn()
  description: string;
	@ViewColumn()
  uom: string;
	@ViewColumn()
  category: string;
	@ViewColumn()
  typeId: string;
	@ViewColumn()
  type: string;
	@ViewColumn()
  group: string;
	@ViewColumn()
  price: number;
	@ViewColumn()
  receivedQty: number;
	@ViewColumn()
  withdrawnQty: number;
	@ViewColumn()
  returnQty: number;
	@ViewColumn()
  onhandQty: number;

  @OneToMany(() => InventoryReportDetailsView, ird => ird.irv)
  details: InventoryReportDetailsView[];
}