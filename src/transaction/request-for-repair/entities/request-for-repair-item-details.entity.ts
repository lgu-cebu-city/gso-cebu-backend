import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RequestForRepair } from "./request-for-repair.entity";

@Entity()
export class RequestForRepairItemDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => RequestForRepair, o => o.items)
    @JoinColumn()
    rfr: RequestForRepair

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
  natureOfRequest: string
  @Column()
  remarks: string
}