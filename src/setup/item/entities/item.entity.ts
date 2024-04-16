import { InventoryLedger } from "src/transaction/inventory/entities/inventory-ledger.entiry";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  code: string
  @Column()
  description: string
  @Column()
  uom: string
  @Column()
  groupId: string
  @Column()
  typeId: string
  @Column()
  category: string
  @Column({ type: "double", default: 0 })
  price: number
  @Column({ default: '' })
  unitId: string
  @Column({ default: 'Active' })
  status: string
  @Column({ default: 0, nullable: true })
  prevId: number
  @Column({ default: 0, nullable: true })
  ps_dbm: number
  @Column({ default: 0, nullable: true })
  sequence: number

  @OneToMany(() => InventoryLedger, il => il.item)
  ledger: InventoryLedger[];
}
