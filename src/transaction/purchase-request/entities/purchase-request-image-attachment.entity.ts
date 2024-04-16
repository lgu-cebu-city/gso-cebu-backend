import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseRequest } from "./purchase-request.entity";

@Entity()
export class PurchaseRequestImageAttachment {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @ManyToOne(() => PurchaseRequest, s => s.img)
    @JoinColumn()
    pr: PurchaseRequest
  @Column()
  seqNo: string
  @Column()
  imgUrl: string
  @Column()
  imgDescription: string
  @Column()
  imgRemarks: string
}