import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseRequest } from "./purchase-request.entity";

@Entity()
export class PurchaseRequestSOFList {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @ManyToOne(() => PurchaseRequest, s => s.sof)
    @JoinColumn()
    pr: PurchaseRequest
  @Column()
  sofId: string
  @Column()
  sofDescription: string
  @Column()
  year: string
  @Column({type: "double"})
  amount: number
}