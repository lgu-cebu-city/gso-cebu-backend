import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RequestForInspectionItemDetails } from "./request-for-inspection-item-details.entity";
import { RequestForInspectionType } from "./request-for-inspection-type.entity";

@Entity()
export class RequestForInspection {
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
  transactionType: string
  @Column()
  remarks: string
  @Column()
  actionTaken: string
  @Column({ default: 'ACTIVE' })
  status: string
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateSaved: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdated: Date

  @OneToMany(() => RequestForInspectionType, s => s.rfi)
  type: RequestForInspectionType[]

  @OneToMany(() => RequestForInspectionItemDetails, i => i.rfi)
  items: RequestForInspectionItemDetails[]
}