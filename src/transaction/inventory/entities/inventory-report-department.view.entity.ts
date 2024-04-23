import {ViewEntity, ViewColumn, OneToMany, PrimaryColumn} from "typeorm";
import { InventoryReportDepartmentDetailsView } from "./inventory-report-department-details.view.entity";

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
      inv.departmentId,
      receivedQty,
      withdrawnQtyBrgy + withdrawnQtyEmp 'withdrawnQty',
      returnQty,
      receivedQty + returnQty - (withdrawnQtyBrgy + withdrawnQtyEmp) AS 'onhandQty'
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
            il.departmentId,
            IFNULL(
          (SELECT 
            SUM(CASE
              WHEN unitId = '' THEN
                issuedQty
              ELSE 
                issuedQty / uc.quantity4 / uc.quantity3 / uc.quantity2 / uc.quantity1
              END)
          FROM
            barangay_issuance_item_details
            LEFT JOIN unit_conversion uc
              ON (unitId = uc.id)
          WHERE
            itemId = i.id AND
            briId IN (
              SELECT
                id
              FROM
                barangay_issuance
              WHERE
                STATUS = 'ACTIVE' AND
                accountablePersonIdFrom = il.departmentId
              )
          )
        , 0) AS 'withdrawnQtyBrgy',
            IFNULL(
          (SELECT 
            SUM(CASE
              WHEN unitId = '' THEN
                issuedQty
              ELSE 
                issuedQty / uc.quantity4 / uc.quantity3 / uc.quantity2 / uc.quantity1
              END)
          FROM
            property_transfer_item_details
            LEFT JOIN unit_conversion uc
              ON (unitId = uc.id)
          WHERE
            itemId = i.id AND
            ptId IN (
              SELECT
                id
              FROM
                property_transfer
              WHERE
                STATUS = 'ACTIVE' AND
                risId = il.departmentId
              )
          )
        , 0) AS 'withdrawnQtyEmp',
            0 AS 'returnQty'
      FROM
        item i
            INNER JOIN gso_cebu.type t
          ON (t.id = i.typeId)
            INNER JOIN gso_cebu.group g
          ON (g.id = i.groupId)
            INNER JOIN (
          SELECT
            itemId,
            brandId,
            description,
            MIN(price) 'price',
            SUM(quantity) 'quantity',
            departmentId
          FROM
            inventory_ledger
          WHERE
            STATUS = 'ACTIVE' AND
            refType = 'Issue'
          GROUP BY
            itemId,
            departmentId
          ) il
          ON (il.itemId = i.id)
        WHERE
          category = 'Generic') inv
        ON (i.id = inv.genericId)
      WHERE
        receivedQty != 0 OR
        withdrawnQtyBrgy != 0 OR
        withdrawnQtyEmp != 0 OR
        returnQty != 0
    `
})

export class InventoryReportDepartmentView {
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
  departmentId: string;
	@ViewColumn()
  receivedQty: number;
	@ViewColumn()
  withdrawnQty: number;
	@ViewColumn()
  returnQty: number;
	@ViewColumn()
  onhandQty: number;

  @OneToMany(() => InventoryReportDepartmentDetailsView, ird => ird.irv)
  details: InventoryReportDepartmentDetailsView[];
}