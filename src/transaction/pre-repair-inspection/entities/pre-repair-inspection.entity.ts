import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PreRepairInspectionItemDetails } from "./pre-repair-inspection-item-details.entity";

@Entity()
export class PreRepairInspection {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column({ nullable: true })
  transactionNo: string
  @Column({ nullable: true })
  transactionDate: Date
  @Column({ nullable: true })
  vehicleName: string
  @Column({ nullable: true })
  vehicleType: string
  @Column({ nullable: true })
  plateNo: string
  @Column({ nullable: true })
  brandModel: string
  @Column({ nullable: true })
  engineNo: string
  @Column({ nullable: true })
  chassisNo: string
  @Column({ nullable: true })
  acquisationDate: Date
  @Column({ nullable: true })
  acquisationCost: number
  @Column({ nullable: true })
  lastRepairDate: Date
  @Column({ nullable: true })
  lastRepairNature: string
  @Column({ nullable: true })
  defectComplaints: string
  @Column({ nullable: true })
  workScope: string
  @Column({ nullable: true })
  remarks: string
  @Column({ nullable: true })
  requestedById: string
  @Column({ nullable: true })
  requestedByName: string
  @Column({ nullable: true })
  inspectedBy1Id: string
  @Column({ nullable: true })
  inspectedBy1Name: string
  @Column({ nullable: true })
  inspectedBy2Id: string
  @Column({ nullable: true })
  inspectedBy2Name: string
  @Column({ nullable: true })
  notedById: string
  @Column({ nullable: true })
  notedByName: string

  @OneToMany(() => PreRepairInspectionItemDetails, i => i.pri)
  items: PreRepairInspectionItemDetails[]

  @Column({ default: 'ACTIVE' })
  status: string
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateSaved: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdated: Date
}