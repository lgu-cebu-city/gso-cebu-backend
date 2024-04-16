import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostRepairInspectionItemDetails } from "./post-repair-inspection-item-details.entity";
import { PostRepairInspectionItemDetailsView } from "./post-repair-inspection-item-details.view.entity";

@Entity()
export class PostRepairInspection {
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
  departmentId: string
  @Column({ nullable: true })
  departmentName: string
  @Column({ nullable: true })
  divisionId: string
  @Column({ nullable: true })
  divisionName: string
  @Column({ nullable: true })
  jobDescription: string
  @Column({ nullable: true })
  remarks: string
  @Column({ nullable: true })
  signatory1Id: string
  @Column({ nullable: true })
  signatory1Name: string
  @Column({ nullable: true })
  signatory2Id: string
  @Column({ nullable: true })
  signatory2Name: string
  @Column({ nullable: true })
  acceptedById: string
  @Column({ nullable: true })
  acceptedByName: string

  @OneToMany(() => PostRepairInspectionItemDetails, i => i.pori)
  items: PostRepairInspectionItemDetails[]

  @OneToMany(() => PostRepairInspectionItemDetailsView, i => i.pori)
  itemsForWaste: PostRepairInspectionItemDetailsView[]

  @Column({ default: 'ACTIVE' })
  status: string
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateSaved: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdated: Date
}