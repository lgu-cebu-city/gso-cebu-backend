import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostRepairInspection } from "./post-repair-inspection.entity";

@Entity()
export class PostRepairInspectionItemDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => PostRepairInspection, o => o.items)
    @JoinColumn()
    pori: PostRepairInspection

  @Column({ nullable: true })
  itemId: string
  @Column("text", { nullable: true })
  description: string
  @Column({ nullable: true })
  type: string
  @Column({ nullable: true })
  uom: string
  @Column({type: "double", nullable: true})
  quantity: number
  @Column({type: "double", nullable: true})
  cost: number
  @Column({type: "double", nullable: true})
  total: number
  @Column({ nullable: true })
  remarks: string
  @Column({ nullable: true })
  dateAcquired: Date
}