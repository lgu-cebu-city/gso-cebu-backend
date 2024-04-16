import { Item } from "src/setup/item/entities/item.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InventoryLedgerSubItems } from "./inventory-ledger-sub-items.entity";
import { InspectionAndAcceptanceReport } from "src/transaction/inspection-and-acceptance-report/entities/inspection-and-acceptance-report.entity";

@Entity()
export class InventoryLedger {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  refId: string
  @Column()
  refType: string // Receive / Issue / Transfer / Sell / Return / Dispose
  @Column()
  departmentId: string
  @Column()
  sectionId: string
  @Column()
  groupId: string
  @Column()
  itemId: string
  @Column()
  brandId: string
  @Column()
  description: string
  @Column()
  uom: string
  @Column()
  quantity: number
  @Column()
  price: number
  @Column({ nullable: true })
  expirationDate: Date
  @Column({ nullable: true })
  lotNo: string
  @Column()
  remarks: string
  @Column()
  serialNo: string
  @Column()
  model: string

  @Column({ default: 'ACTIVE' })
  status: string
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateSaved: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdated: Date
  
  @ManyToOne(() => Item, a => a.ledger)
    @JoinColumn()
    item: Item
  
  @ManyToOne(() => InspectionAndAcceptanceReport, a => a.detailedItem)
    @JoinColumn()
    ref: InspectionAndAcceptanceReport

  @OneToMany(() => InventoryLedgerSubItems, i => i.il)
  subItems: InventoryLedgerSubItems[]
}