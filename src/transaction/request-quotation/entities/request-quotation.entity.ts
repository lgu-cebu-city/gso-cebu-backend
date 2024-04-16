import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RequestQuotationItemDetails } from "./request-quotation-item-details.entity";

@Entity()
export class RequestQuotation {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  transactionNo: string
  @Column({ nullable: true })
  transactionDate: Date
  @Column()
  recommendingDate: Date
  @Column()
  prId: string
  @Column({ nullable: true })
  prNo: string
  @Column({ nullable: true })
  prDate: Date
  @Column()
  departmentId: string
  @Column()
  departmentName: string
  @Column({ type: 'datetime' })
  openningDate: Date
  @Column()
  location: string
  @Column()
  canvasserId: string
  @Column()
  canvasserName: string
  @Column()
  procurementMode: string
  @Column()
  biddingType: string
  @Column()
  approvedBudget: number
  @Column({type: "double", default: 0})
  bidSecurity: number
  @Column({type: "double", default: 0})
  bidDocsFee: number
  @Column()
  supplyDescription: string
  @Column({type: "double", default: 0})
  deliveryPeriod: number
  @Column({type: "double", default: 0})
  priceValidity: number
  @Column({ default: 'ACTIVE' })
  status: string
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateSaved: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdated: Date

  @OneToMany(() => RequestQuotationItemDetails, i => i.rfq)
  items: RequestQuotationItemDetails[]
}