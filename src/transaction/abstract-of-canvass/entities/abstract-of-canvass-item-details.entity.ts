import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractOfCanvassSupplierDetails } from "./abstract-of-canvass-supplier-details.entity";
import { ApprovedCanvass } from "./approved-canvass.entity";

@Entity()
export class AbstractOfCanvassItemDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => AbstractOfCanvassSupplierDetails, s => s.items)
    @JoinColumn()
    aocs: AbstractOfCanvassSupplierDetails
  
  @ManyToOne(() => ApprovedCanvass, a => a.items)
    @JoinColumn()
    aocsa: ApprovedCanvass

  @Column()
  itemId: string
  @Column()
  description: string
  @Column({type: "text", nullable: true})
  specification: string
  @Column()
  uom: string
  @Column({type: "double"})
  quantity: number
  @Column({nullable: true})
  typeId: string
  @Column({type: "double"})
  price: number
  @Column({type: "double"})
  priceRead: number
  @Column({type: "double"})
  priceCalculated: number
  @Column()
  remarks: string
  @Column({ default: false })
  awarded: boolean
  @Column({ default: false })
  approved: boolean
}