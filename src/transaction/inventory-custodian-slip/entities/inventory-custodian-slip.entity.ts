import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InventoryCustodianSlipItems } from "./inventory-custodian-slip-items.entity";

@Entity()
export class InventoryCustodianSlip {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column({ nullable: true })
  icsNo: string
  @Column({ nullable: true })
  icsDate: Date
  @Column({ nullable: true })
  departmentId: string
  @Column({ nullable: true })
  departmentName: string
  @Column({ nullable: true })
  fundCluster: string
  @Column({ nullable: true })
  accountType: string
  @Column({ nullable: true })
  prNo: string
  @Column({ nullable: true })
  poNo: string
  @Column({ nullable: true })
  location: string
  @Column({ nullable: true })
  supplierName: string
  @Column({ nullable: true })
  deliveryDate: Date
  @Column({ nullable: true })
  remarks: string
  @Column({ nullable: true })
  receivedFromId: string
  @Column({ nullable: true })
  receivedFromName: string
  @Column({ nullable: true })
  receivedById: string
  @Column({ nullable: true })
  receivedByName: string

  @OneToMany(() => InventoryCustodianSlipItems, i => i.ics)
  items: InventoryCustodianSlipItems[]

  @Column({ default: 'ACTIVE' })
  status: string
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateSaved: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdated: Date
}