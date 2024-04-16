import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseRequest } from "./purchase-request.entity";

@Entity()
export class PurchaseRequestItemDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => PurchaseRequest, o => o.items)
    @JoinColumn()
    pr: PurchaseRequest

  @Column()
  itemId: string
  @Column()
  description: string
  @Column({type: "text", nullable: true})
  specification: string
  @Column({nullable: true})
  typeId: string
  @Column({type: "double"})
  quantity: number
  @Column({type: "double", default: 0})
  dbmQty: number
  @Column({type: "double", default: 0})
  callOutQty: number
  @Column()
  uom: string
  @Column({type: "double"})
  cost: number
  @Column({type: "double"})
  total: number
  @Column()
  remarks: string
  @Column({type: "text", nullable: true})
  consPrId: string
  @Column({nullable: true})
  appId: number
  @Column({nullable: true})
  accId: number
}