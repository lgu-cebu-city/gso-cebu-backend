import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BarangayIssuanceItemDetails } from "./barangay-issuance-item-details.entity";

@Entity()
export class BarangayIssuance {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  transactionNo: string
  @Column()
  transactionDate: Date
  @Column()
  accountablePersonIdFrom: string
  @Column()
  accountablePersonNameFrom: string
  @Column()
  accountablePersonDesignationFrom: string
  @Column()
  accountablePersonIdTo: string
  @Column()
  accountablePersonNameTo: string
  @Column()
  accountablePersonDesignationTo: string
  @Column()
  approvePersonId: string
  @Column()
  approvePersonName: string
  @Column()
  approvePersonDesignation: string
  @Column()
  releasePersonId: string
  @Column()
  releasePersonName: string
  @Column()
  releasePersonDesignation: string
  @Column()
  remarks: string
  
  @OneToMany(() => BarangayIssuanceItemDetails, i => i.bri)
  items: BarangayIssuanceItemDetails[]

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