import {ViewEntity, ViewColumn, OneToMany, PrimaryColumn} from "typeorm";
import { InventoryCustodianSlipItemsView } from "./inventory-custodian-slip-items.view.entity";

@ViewEntity({
    expression: `
    SELECT
      iar.id AS 'id',
      pr.transactionNo 'prNo',
      iar.poNo 'poNo',
      iar.referenceNo 'iarNo',
      iar.referenceDate 'iarDate',
      iar.supplierName,
      iar.purpose,
      iar.sourceOfFund
    FROM
      inspection_and_acceptance_report iar
      LEFT JOIN purchase_order po
        ON (po.id = iar.poId)
      LEFT JOIN purchase_request pr
        ON (pr.id = po.prId)
    WHERE
      iar.status = 'ACTIVE'
    `
})

export class InventoryCustodianSlipView {
  @PrimaryColumn()
  id: string;
  @ViewColumn()
  prNo: string;
	@ViewColumn()
  poNo: string;
	@ViewColumn()
  iarNo: string;
	@ViewColumn()
  iarDate: Date;
	@ViewColumn()
  supplierName: string;
	@ViewColumn()
  purpose: string;
	@ViewColumn()
  sourceOfFund: string;

  @OneToMany(() => InventoryCustodianSlipItemsView, icsv => icsv.ics)
  items: InventoryCustodianSlipItemsView[];
}