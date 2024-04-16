import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseRequestLogsItemDetails } from "./purchase-request-logs-item-details.entity";
import { PurchaseRequestLogsSOFList } from "./purchase-request-logs-sof-list.entity";
import { PurchaseRequestLogsImageAttachment } from "./purchase-request-logs-image-attachment.entity";

@Entity()
export class PurchaseRequestLogs {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  prId: string
  @Column()
  prType: string
  @Column()
  prNo: string
  @Column()
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
  alobsNo: string
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
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateSaved: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdated: Date

  @OneToMany(() => PurchaseRequestLogsSOFList, s => s.pr)
  sof: PurchaseRequestLogsSOFList[]

  @OneToMany(() => PurchaseRequestLogsImageAttachment, s => s.pr)
  img: PurchaseRequestLogsImageAttachment[]

  @OneToMany(() => PurchaseRequestLogsItemDetails, i => i.pr)
  items: PurchaseRequestLogsItemDetails[]
}