import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AcknowledgementReceiptOfEquipmentItems } from "./acknowledgement-reecipt-of-equipment-items.entity";

@Entity()
export class AcknowledgementReceiptOfEquipment {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column({ nullable: true })
  parNo: string
  @Column({ nullable: true })
  parDate: Date
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
  receivedById: string
  @Column({ nullable: true })
  receivedByName: string
  @Column({ nullable: true })
  issuedById: string
  @Column({ nullable: true })
  issuedByName: string

  @OneToMany(() => AcknowledgementReceiptOfEquipmentItems, i => i.are)
  items: AcknowledgementReceiptOfEquipmentItems[]

  @Column({ default: 'ACTIVE' })
  status: string
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateSaved: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdated: Date
}