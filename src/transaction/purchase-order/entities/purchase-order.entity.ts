import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseOrderItemDetails } from "./purchase-order-item-details.entity";

@Entity()
export class PurchaseOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  transactionNo: string
  @Column({ nullable: true })
  transactionDate: Date
  @Column()
  canvassId: string
  @Column()
  canvassNo: string
  @Column()
  prId: string
  @Column()
  prNo: string
  @Column()
  procurementMode: string
  @Column()
  supplierId: string
  @Column()
  supplierName: string
  @Column()
  supplierAddress: string
  @Column()
  supplierContactNo: string
  @Column()
  supplierRemarks: string
  @Column()
  deliveryPlace: string
  @Column({ nullable: true })
  deliveryDate: Date
  @Column()
  deliveryTerm: string
  @Column()
  paymentTerm: string

  @OneToMany(() => PurchaseOrderItemDetails, i => i.po)
  items: PurchaseOrderItemDetails[]

  @Column({ default: 'ACTIVE' })
  status: string
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateSaved: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdated: Date
}