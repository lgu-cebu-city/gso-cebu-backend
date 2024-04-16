import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PropertyRequisitionSlipItemDetails } from "./property-requisition-slip-item-details.entity";

@Entity()
export class PropertyRequisitionSlip {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  transactionNo: string
  @Column()
  transactionDate: Date
  @Column()
  requestorId: string
  @Column()
  requestorName: string
  @Column()
  preparedById: string
  @Column()
  preparedByName: string
  @Column()
  dateFrom: Date
  @Column()
  dateTo: Date
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

  @OneToMany(() => PropertyRequisitionSlipItemDetails, i => i.prs)
  items: PropertyRequisitionSlipItemDetails[]
}