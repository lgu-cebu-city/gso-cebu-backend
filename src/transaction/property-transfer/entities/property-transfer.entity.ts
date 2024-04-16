import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PropertyTransferItemDetails } from "./property-transfer-item-details.entity";

@Entity()
export class PropertyTransfer {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  transactionNo: string
  @Column()
  transactionDate: Date
  @Column()
  risId: string
  @Column()
  risNo: string
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
  
  @OneToMany(() => PropertyTransferItemDetails, i => i.pt)
  items: PropertyTransferItemDetails[]

  @Column({ default: 'ACTIVE' })
  status: string
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateSaved: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdated: Date
}