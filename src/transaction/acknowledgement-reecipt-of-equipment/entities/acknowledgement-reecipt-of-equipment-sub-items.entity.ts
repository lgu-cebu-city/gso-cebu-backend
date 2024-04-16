import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AcknowledgementReceiptOfEquipmentItems } from "./acknowledgement-reecipt-of-equipment-items.entity";

@Entity()
export class AcknowledgementReceiptOfEquipmentSubItems {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => AcknowledgementReceiptOfEquipmentItems, i => i.subItems)
    @JoinColumn()
    arei: AcknowledgementReceiptOfEquipmentItems
    
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