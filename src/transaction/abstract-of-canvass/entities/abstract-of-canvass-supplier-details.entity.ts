import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AbstractOfCanvassItemDetails } from "./abstract-of-canvass-item-details.entity";
import { AbstractOfCanvass } from "./abstract-of-canvass.entity";

@Entity()
export class AbstractOfCanvassSupplierDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => AbstractOfCanvass, s => s.supplier)
    @JoinColumn()
    aoc: AbstractOfCanvass

  @Column()
  supplierSeq: string
  @Column()
  supplierId: string
  @Column()
  supplierName: string
  @Column()
  address: string
  @Column()
  contactNumber: string
  @Column({ default: false })
  approved: boolean
  @Column({ default: false })
  hasPo: boolean

  @OneToMany(() => AbstractOfCanvassItemDetails, aoci => aoci.aocs)
  items: AbstractOfCanvassItemDetails[]
}