import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseRequestLogs } from "./purchase-request-logs.entity";

@Entity()
export class PurchaseRequestLogsImageAttachment {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @ManyToOne(() => PurchaseRequestLogs, s => s.img)
    @JoinColumn()
    pr: PurchaseRequestLogs
  @Column()
  seqNo: string
  @Column()
  imgUrl: string
  @Column()
  imgDescription: string
  @Column()
  imgRemarks: string
}