import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RequisitionIssuanceSlipItemDetails } from "./requisition-issuance-slip-item-details.entity";

@Entity()
export class RequisitionIssuanceSlip {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  transactionNo: string
  @Column()
  transactionDate: Date
  @Column()
  saiNo: string
  @Column()
  saiDate: Date
  @Column()
  division: string
  @Column()
  departmentId: string
  @Column()
  departmentName: string
  @Column()
  purpose: string
  @Column()
  issuanceType: string
  @Column()
  transactionType: string
  @Column()
  transactionStatus: string

  @OneToMany(() => RequisitionIssuanceSlipItemDetails, i => i.ris)
  items: RequisitionIssuanceSlipItemDetails[]

  @Column({ default: 'ACTIVE' })
  status: string
  @Column()
  entryByDepartment: string
  @Column()
  entryByUser: string
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateSaved: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdated: Date
}