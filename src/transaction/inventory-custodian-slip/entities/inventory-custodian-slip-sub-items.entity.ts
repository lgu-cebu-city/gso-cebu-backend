import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { InventoryCustodianSlipItems } from "./inventory-custodian-slip-items.entity";

@Entity()
export class InventoryCustodianSlipSubItems {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => InventoryCustodianSlipItems, i => i.subItems)
    @JoinColumn()
    icsi: InventoryCustodianSlipItems
    
  @Column({ nullable: true })
  itemId: string
  @Column({ nullable: true })
  description: string
  @Column({ nullable: true })
  uom: string
  @Column({ nullable: true })
  quantity: number
  @Column({ nullable: true })
  serialNo: string
  @Column({ nullable: true })
  model: string
}