import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RequestForInspection } from "./request-for-inspection.entity";

@Entity()
export class RequestForInspectionItemDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => RequestForInspection, o => o.items)
    @JoinColumn()
    rfi: RequestForInspection

  @Column()
  itemNo: number
  @Column()
  itemId: string
  @Column()
  description: string
  @Column()
  areId: string
  @Column()
  areNo: string
  @Column()
  issue: string
  @Column()
  remarks: string
}