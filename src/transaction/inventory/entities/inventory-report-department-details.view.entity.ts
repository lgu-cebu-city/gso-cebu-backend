import {ViewEntity, ViewColumn, ManyToOne, JoinColumn, PrimaryColumn} from "typeorm";
import { InventoryReportDepartmentView } from "./inventory-report-department.view.entity";

@ViewEntity({
    expression: `
    SELECT
      ris.transactionNo AS 'referenceNo',
      ris.transactionDate AS 'referenceDate',
      ris.departmentId,
      ris.departmentName,
      '+' AS 'method',
      risid.issuedQty AS 'quantity',
      risid.requestedQty AS 'reportQty',
      risid.itemId AS 'irvId',
      CASE WHEN risid.unitId = '' THEN risid.uom ELSE risid.issuedUnit END AS 'unit'
    FROM
      requisition_issuance_slip ris
      INNER JOIN requisition_issuance_slip_item_details risid
        ON (ris.id = risid.risId)
    WHERE
      (ris.transactionStatus = 'Issued' ||
      ris.transactionStatus = 'Transfered') AND
      ris.status = 'ACTIVE'
    
    UNION ALL
    
    SELECT
      bri.transactionNo AS 'referenceNo',
      bri.transactionDate AS 'referenceDate',
      bri.accountablePersonIdTo AS 'departmentId',
      bri.accountablePersonNameTo AS 'departmentName',
      '-' AS 'method',
      brii.issuedQty AS 'quantity',
      brii.issuedQty AS 'reportQty',
      brii.itemId AS 'irvId',
      brii.uom AS 'unit'
    FROM 
      barangay_issuance bri
      INNER JOIN barangay_issuance_item_details brii
	      ON (bri.id = brii.briId)
    WHERE
      bri.status = 'ACTIVE'
    
    UNION ALL
    
    SELECT
      pt.transactionNo AS 'referenceNo',
      pt.transactionDate AS 'referenceDate',
      pt.risId AS 'departmentId',
      pt.risNo AS 'departmentName',
      '-' AS 'method',
      pti.issuedQty AS 'quantity',
      pti.issuedQty AS 'reportQty',
      pti.itemId AS 'irvId',
      pti.uom AS 'unit'
    FROM 
      property_transfer pt
      INNER JOIN property_transfer_item_details pti
	      ON (pt.id = pti.ptId)
    WHERE
      pt.status = 'ACTIVE'
    `
})

export class InventoryReportDepartmentDetailsView {
  @PrimaryColumn()
  referenceNo: string;
	@ViewColumn()
  referenceDate: Date;
	@ViewColumn()
  departmentId: string;
	@ViewColumn()
  departmentName: string;
	@ViewColumn()
  method: string;
	@ViewColumn()
  quantity: number;
	@ViewColumn()
  reportQty: number;
  @ViewColumn()
  unit: string;
  
  @ManyToOne(() => InventoryReportDepartmentView, a => a.details)
    @JoinColumn()
    irv: InventoryReportDepartmentView
}