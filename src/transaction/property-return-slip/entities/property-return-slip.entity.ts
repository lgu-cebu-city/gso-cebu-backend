import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PropertyReturnSlipItemDetails } from "./property-return-slip-item-details.entity";

@Entity()
export class PropertyReturnSlip {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  transactionNo: string
  @Column()
  transactionDate: Date
  @Column()
  propAccId: string
  @Column()
  requestorId: string
  @Column()
  requestorName: string
  @Column()
  receivedById: string
  @Column()
  receivedByName: string
  @Column()
  processedById: string
  @Column()
  processedByName: string
  @Column()
  returnStatus: string
  @Column()
  remarks: string
  @Column({ default: 'ACTIVE' })
  status: string
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateSaved: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdated: Date

  @OneToMany(() => PropertyReturnSlipItemDetails, i => i.prs)
  items: PropertyReturnSlipItemDetails[]
}