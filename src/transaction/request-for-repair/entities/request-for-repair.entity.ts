import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RequestForRepairItemDetails } from "./request-for-repair-item-details.entity";

@Entity()
export class RequestForRepair {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  transactionNo: string
  @Column()
  transactionDate: Date
  @Column()
  departmentId: string
  @Column()
  departmentName: string
  @Column()
  reason: string
  @Column()
  remarks: string
  @Column({ default: 'ACTIVE' })
  status: string
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateSaved: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdated: Date

  @OneToMany(() => RequestForRepairItemDetails, i => i.rfr)
  items: RequestForRepairItemDetails[]
}