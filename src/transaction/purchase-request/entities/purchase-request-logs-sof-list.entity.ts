import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseRequestLogs } from "./purchase-request-logs.entity";

@Entity()
export class PurchaseRequestLogsSOFList {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @ManyToOne(() => PurchaseRequestLogs, s => s.sof)
    @JoinColumn()
    pr: PurchaseRequestLogs
  @Column()
  sofId: string
  @Column()
  sofDescription: string
  @Column()
  year: string
  @Column({type: "double"})
  amount: number
}