import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseRequestItemDetails } from "./purchase-request-item-details.entity";
import { PurchaseRequestSOFList } from "./purchase-request-sof-list.entity";
import { PurchaseRequestImageAttachment } from "./purchase-request-image-attachment.entity";
import { PurchaseRequestIssuanceItemsView } from "./purchase-request-issuance-items.view.entity";

@Entity()
export class PurchaseRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  prType: string
  @Column()
  prNo: string
  @Column({ nullable: true })
  prDate: Date
  @Column({ nullable: true })
  prQtr: string
  @Column("text")
  title: string
  @Column()
  departmentId: string
  @Column()
  departmentName: string
  @Column()
  sectionId: string
  @Column()
  sectionName: string
  @Column()
  alobsNo: string //PR Id from Consolidated PR
  @Column({ nullable: true })
  alobsDate: Date
  @Column()
  saiNo: string
  @Column({ nullable: true })
  saiDate: Date
  @Column()
  transactionNo: string
  @Column()
  transactionDate: Date
  @Column()
  ppId: string
  @Column()
  ppNo: string
  @Column()
  sourceOfFund: string
  @Column()
  rationale: string
  @Column()
  procurementMode: string
  @Column({ default: 'ACTIVE' })
  status: string
  @Column()
  entryByDepartment: string
  @Column()
  entryByUser: string
  @Column()
  requestedByName : string
  @Column()
  requestedByPosition: string
  @Column()
  cashAvailabilityName: string
  @Column()
  cashAvailabilityPosition: string
  @Column()
  approvedByName: string
  @Column()
  approvedByPosition: string
  @Column({ default: false })
  isLocked: boolean
  @Column({ default: false })
  forDBM: boolean
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateSaved: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdated: Date

  @OneToMany(() => PurchaseRequestSOFList, s => s.pr)
  sof: PurchaseRequestSOFList[]

  @OneToMany(() => PurchaseRequestImageAttachment, s => s.pr)
  img: PurchaseRequestImageAttachment[]

  @OneToMany(() => PurchaseRequestItemDetails, i => i.pr)
  items: PurchaseRequestItemDetails[]

  @OneToMany(() => PurchaseRequestIssuanceItemsView, i => i.pr)
  issuanceItems: PurchaseRequestIssuanceItemsView[]
}