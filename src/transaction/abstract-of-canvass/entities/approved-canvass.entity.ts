import {ViewEntity, ViewColumn, OneToMany} from "typeorm";
import { AbstractOfCanvassItemDetails } from "./abstract-of-canvass-item-details.entity";

@ViewEntity({
    expression: `
      SELECT
        aoc.id AS 'aoc_id',
        aoc.rfqId,
        aoc.rfqNo,
        rfq.prId,
        rfq.prNo,
        aoc.transactionNo,
        aoc.transactionDate,
        aoc.supplyDescription,
        'Approved' AS 'status',
        aocsd.id AS 'id',
        aocsd.supplierId,
        aocsd.supplierName,
        aocsd.address,
        aocsd.contactNumber,
        rfq.procurementMode,
        hasPo,
        aoc.dateSaved
      FROM
        abstract_of_canvass aoc
        INNER JOIN abstract_of_canvass_supplier_details aocsd
          ON (aoc.id = aocsd.aocId)
        INNER JOIN request_quotation rfq
	        ON (rfq.id = aoc.rfqId)
      WHERE
        approved = TRUE AND
        aoc.status = 'ACTIVE'
      ORDER BY
        aoc.transactionDate DESC
    `
})

export class ApprovedCanvass {
  @ViewColumn()
  aoc_id: string;
	@ViewColumn()
  rfqId: string;
	@ViewColumn()
  rfqNo: string;
	@ViewColumn()
  prId: string;
	@ViewColumn()
  prNo: string;
	@ViewColumn()
  transactionNo: string;
	@ViewColumn()
  transactionDate: string;
	@ViewColumn()
  supplyDescription: string;
	@ViewColumn()
  status: string;
	@ViewColumn()
  id: string;
	@ViewColumn()
  supplierId: string;
	@ViewColumn()
  supplierName: string;
	@ViewColumn()
  address: string;
	@ViewColumn()
  contactNumber: string;
	@ViewColumn()
  procurementMode: string;
	@ViewColumn()
  hasPo: boolean;
  @ViewColumn()
  dateSaved: Date
  @OneToMany(() => AbstractOfCanvassItemDetails, aoci => aoci.aocs)
  items: AbstractOfCanvassItemDetails[];
}