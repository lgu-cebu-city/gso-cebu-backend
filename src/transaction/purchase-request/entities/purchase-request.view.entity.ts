import {ViewEntity, ViewColumn, PrimaryColumn, OneToMany} from "typeorm";
import { PurchaseRequestSOFList } from "./purchase-request-sof-list.entity";
import { PurchaseRequestItemDetails } from "./purchase-request-item-details.entity";

@ViewEntity({
    expression: `
    SELECT
      *
    FROM
      purchase_request pr
      INNER JOIN (
        SELECT 
          DISTINCT pr.id 'prId', SUBSTRING_INDEX(SUBSTRING_INDEX(pr.title, ',',sub0.aNum), ',', -1) AS Ids
        FROM
          purchase_request pr
          CROSS JOIN (
            SELECT 
              1 + units.i + tens.i * 10 AS aNum
              , units.i + tens.i * 10 AS aSubscript
            FROM 
              (SELECT 0 AS i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) units
              CROSS JOIN (
                SELECT 0 AS i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) tens
            ) sub0
        WHERE title != '' AND STATUS = 'ACTIVE') prs
        ON(prs.Ids = pr.id)

    UNION ALL

    SELECT
      *,
      pr.id AS 'prId',
      '' AS 'Ids'
    FROM
      purchase_request pr
    WHERE
      title = '' AND STATUS = 'ACTIVE'
    `
})

export class PurchaseRequestView {
  @PrimaryColumn()
  id: string
  @PrimaryColumn()
  prId: string
  @ViewColumn()
  prType: string
  @ViewColumn()
  prNo: string
  @ViewColumn()
  prDate: Date
  @ViewColumn()
  prQtr: string
  @ViewColumn()
  title: string
  @ViewColumn()
  departmentId: string
  @ViewColumn()
  departmentName: string
  @ViewColumn()
  sectionId: string
  @ViewColumn()
  sectionName: string
  @ViewColumn()
  alobsNo: string
  @ViewColumn()
  alobsDate: Date
  @ViewColumn()
  saiNo: string
  @ViewColumn()
  saiDate: Date
  @ViewColumn()
  transactionNo: string
  @ViewColumn()
  transactionDate: Date
  @ViewColumn()
  ppId: string
  @ViewColumn()
  ppNo: string
  @ViewColumn()
  sourceOfFund: string
  @ViewColumn()
  rationale: string
  @ViewColumn()
  procurementMode: string
  @ViewColumn()
  status: string
  @ViewColumn()
  entryByDepartment: string
  @ViewColumn()
  entryByUser: string
  @ViewColumn()
  requestedByName : string
  @ViewColumn()
  requestedByPosition: string
  @ViewColumn()
  cashAvailabilityName: string
  @ViewColumn()
  cashAvailabilityPosition: string
  @ViewColumn()
  approvedByName: string
  @ViewColumn()
  approvedByPosition: string
  @ViewColumn()
  isLocked: boolean
  @ViewColumn()
  forDBM: boolean
  @ViewColumn()
  dateSaved: Date
  @ViewColumn()
  dateUpdated: Date

  @OneToMany(() => PurchaseRequestSOFList, s => s.pr)
  sof: PurchaseRequestSOFList[]

  @OneToMany(() => PurchaseRequestItemDetails, i => i.pr)
  items: PurchaseRequestItemDetails[]
}