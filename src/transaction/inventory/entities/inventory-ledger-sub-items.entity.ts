import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { InventoryLedger } from "./inventory-ledger.entiry";

@Entity()
export class InventoryLedgerSubItems {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  refId: string
  @Column()
  itemId: string
  @Column()
  description: string
  @Column()
  uom: string
  @Column()
  quantity: number
  @Column()
  serialNo: string
  @Column()
  model: string
  @Column()
  itemNo: string
  @Column()
  remarks: string

  @Column({ default: 'ACTIVE' })
  status: string
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateSaved: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdated: Date
  
  @ManyToOne(() => InventoryLedger, a => a.subItems)
    @JoinColumn()
    il: InventoryLedger
}