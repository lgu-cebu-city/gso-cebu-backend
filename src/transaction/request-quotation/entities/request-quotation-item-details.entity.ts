import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RequestQuotation } from "./request-quotation.entity";

@Entity()
export class RequestQuotationItemDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => RequestQuotation, o => o.items)
    @JoinColumn()
    rfq: RequestQuotation

  @Column()
  itemId: string
  @Column()
  description: string
  @Column({type: "text", nullable: true})
  specification: string
  @Column({type: "double"})
  quantity: number
  @Column()
  uom: string
  @Column({type: "double"})
  cost: number
  @Column({type: "double"})
  total: number
  @Column()
  remarks: string
  @Column({nullable: true})
  typeId: string
}