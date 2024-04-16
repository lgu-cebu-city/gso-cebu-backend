import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InspectionAndAcceptanceReportActualSubItems } from "./inspection-and-acceptance-report-actual-sub-items.entity";
import { InspectionAndAcceptanceReportActual } from "./inspection-and-acceptance-report-actual.entity";

@Entity()
export class InspectionAndAcceptanceReportActualItems {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => InspectionAndAcceptanceReportActual, i => i.items)
    @JoinColumn()
    iar: InspectionAndAcceptanceReportActual
    
  @Column()
  poItemId: string
  @Column()
  groupId: string
  @Column()
  groupName: string
  @Column()
  itemId: string
  @Column()
  description: string
  @Column({type: "text", nullable: true})
  specification: string
  @Column()
  uom: string
  @Column()
  quantity: number
  @Column()
  price: number
  @Column()
  receivedQuantity: number
  @Column()
  brand: string
  @Column()
  brandId: string
  @Column({ nullable: true })
  expirationDate: Date
  @Column({ nullable: true })
  lotNo: string
  @Column()
  remarks: string
  @Column()
  serialNo: string
  @Column()
  model: string

  @OneToMany(() => InspectionAndAcceptanceReportActualSubItems, i => i.iari)
  subItems: InspectionAndAcceptanceReportActualSubItems[]

  @Column()
  itemNo: string
}