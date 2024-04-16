import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseRequestLogs } from "./purchase-request-logs.entity";

@Entity()
export class PurchaseRequestLogsItemDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => PurchaseRequestLogs, o => o.items)
    @JoinColumn()
    pr: PurchaseRequestLogs

  @Column({nullable: true})
  itemId: string
  @Column({nullable: true})
  description: string
  @Column({type: "text", nullable: true})
  specification: string
  @Column({nullable: true})
  typeId: string
  @Column({type: "double", default: 0})
  quantity: number
  @Column({type: "double", default: 0})
  dbmQty: number
  @Column({type: "double", default: 0})
  callOutQty: number
  @Column({nullable: true})
  uom: string
  @Column({type: "double", default: 0})
  cost: number
  @Column({type: "double", default: 0})
  total: number
  @Column({nullable: true})
  remarks: string
  @Column({type: "text", nullable: true})
  consPrId: string
  @Column({nullable: true})
  appId: number
  @Column({nullable: true})
  accId: number
}