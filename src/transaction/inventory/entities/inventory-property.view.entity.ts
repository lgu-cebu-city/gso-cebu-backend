import {ViewEntity, ViewColumn} from "typeorm";

@ViewEntity({
    expression: `
    SELECT
      il.remarks 'itemCode',
      il.description,
      il.brandId 'brand',
      il.serialNo,
      il.model,
      il.uom,
      t.description 'type',
      t.groupName 'group'
    FROM
      inventory_ledger il
      INNER JOIN inspection_and_acceptance_report iar
        ON(il.refId = iar.id AND il.refType = 'Receive')
      INNER JOIN type t
        ON(t.id = il.groupId)
    WHERE
      iar.status = 'ACTIVE'
      AND t.groupName = 'Equipment'
      AND il.remarks != ''
    `
})

export class PropertyInventoryView {
	@ViewColumn()
  itemCode: string;
	@ViewColumn()
  description: string;
	@ViewColumn()
  brand: string;
	@ViewColumn()
  serialNo: string;
	@ViewColumn()
  model: string;
	@ViewColumn()
  uom: string;
	@ViewColumn()
  type: string;
	@ViewColumn()
  group: string;
}