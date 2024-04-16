import {ViewEntity, ViewColumn, ManyToOne, JoinColumn, PrimaryColumn} from "typeorm";
import { InventoryReportView } from "./inventory-report.view.entity";

@ViewEntity({
    expression: `
    SELECT
      iar.referenceNo,
      iar.referenceDate,
      iar.departmentId,
      iar.departmentName,
      '+' AS 'method',
      iari.receivedQuantity AS 'quantity',
      iari.receivedQuantity AS 'reportQty',
      iari.itemId as 'irvId',
      iari.uom AS 'unit'
    FROM
      inspection_and_acceptance_report iar
      INNER JOIN inspection_and_acceptance_report_items iari
        ON (iar.id = iari.iarId)
    WHERE
      iar.status = 'ACTIVE'
	
    UNION ALL
      
    SELECT
      ris.transactionNo AS 'referenceNo',
      ris.transactionDate AS 'referenceDate',
      ris.departmentId,
      ris.departmentName,
      '-' AS 'method',
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
    `
})

export class InventoryReportDetailsView {
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
  
  @ManyToOne(() => InventoryReportView, a => a.details)
    @JoinColumn()
    irv: InventoryReportView
}