import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PreRepairInspection } from "./pre-repair-inspection.entity";

@Entity()
export class PreRepairInspectionItemDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => PreRepairInspection, o => o.items)
    @JoinColumn()
    pri: PreRepairInspection

  @Column({ nullable: true })
  itemId: string
  @Column("text")
  description: string
  @Column({ nullable: true })
  type: string
  @Column({ nullable: true })
  uom: string
  @Column({type: "double"})
  quantity: number
  @Column({type: "double"})
  cost: number
  @Column({type: "double"})
  total: number
  @Column({ nullable: true })
  remarks: string
  @Column({ nullable: true })
  dateAcquired: Date
}