import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InventoryCustodianSlipSubItems } from "./inventory-custodian-slip-sub-items.entity";
import { InventoryCustodianSlip } from "./inventory-custodian-slip.entity";

@Entity()
export class InventoryCustodianSlipItems {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => InventoryCustodianSlip, i => i.items)
    @JoinColumn()
    ics: InventoryCustodianSlip
    
  @Column({ nullable: true })
  groupId: string
  @Column({ nullable: true })
  groupName: string
  @Column({ nullable: true })
  itemId: string
  @Column({ nullable: true })
  propertyNo: string
  @Column({ nullable: true })
  description: string
  @Column({ nullable: true })
  uom: string
  @Column({ nullable: true })
  quantity: number
  @Column({ nullable: true })
  price: number
  @Column({ nullable: true })
  dateAcquired: Date
  @Column({ nullable: true })
  receivedQuantity: number
  @Column({ nullable: true })
  brand: string
  @Column({ nullable: true })
  brandId: string
  @Column({ nullable: true })
  expirationDate: Date
  @Column({ nullable: true })
  lotNo: string
  @Column({ nullable: true })
  remarks: string
  @Column({ nullable: true })
  serialNo: string
  @Column({ nullable: true })
  model: string
  @Column({ nullable: true })
  iarId: string
  @Column({ nullable: true })
  iarItemId: string

  @OneToMany(() => InventoryCustodianSlipSubItems, i => i.icsi)
  subItems: InventoryCustodianSlipSubItems[]
}