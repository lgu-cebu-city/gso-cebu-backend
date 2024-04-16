import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PropertyAccountabilitySlipItemDetails } from "./property-accountability-slip-item-details.entity";

@Entity()
export class PropertyAccountabilitySlip {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  transactionNo: string
  @Column()
  transactionDate: Date
  @Column()
  propReqId: string
  @Column()
  requestorId: string
  @Column()
  requestorName: string
  @Column()
  approvedById: string
  @Column()
  approvedByName: string
  @Column()
  dateFrom: Date
  @Column()
  dateTo: Date
  @Column()
  requestType: string
  @Column()
  purpose: string
  @Column()
  remarks: string
  @Column({ default: 'ACTIVE' })
  status: string
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateSaved: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdated: Date

  @OneToMany(() => PropertyAccountabilitySlipItemDetails, i => i.pas)
  items: PropertyAccountabilitySlipItemDetails[]
}