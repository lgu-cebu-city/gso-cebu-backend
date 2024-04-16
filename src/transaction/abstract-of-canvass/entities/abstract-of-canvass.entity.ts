import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AbstractOfCanvassSupplierDetails } from "./abstract-of-canvass-supplier-details.entity";

@Entity()
export class AbstractOfCanvass {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  rfqId: string
  @Column()
  rfqNo: string
  @Column()
  transactionNo: string
  @Column({ nullable: true })
  transactionDate: Date
  @Column()
  supplyDescription: string
  @Column()
  remarks: string
  @Column({ nullable: true })
  bacChairman: string
  @Column({ nullable: true })
  bacVChairman: string
  @Column({ nullable: true })
  bacMember1: string
  @Column({ nullable: true })
  bacMember2: string
  @Column({ nullable: true })
  bacMember3: string
  @Column({ nullable: true })
  bacMember4: string
  @Column({ default: 'ACTIVE' })
  status: string
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateSaved: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdated: Date

  @OneToMany(() => AbstractOfCanvassSupplierDetails, i => i.aoc)
  supplier: AbstractOfCanvassSupplierDetails[]
}