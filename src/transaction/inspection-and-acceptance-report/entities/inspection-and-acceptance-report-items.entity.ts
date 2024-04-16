import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InspectionAndAcceptanceReportSubItems } from "./inspection-and-acceptance-report-sub-items.entity";
import { InspectionAndAcceptanceReport } from "./inspection-and-acceptance-report.entity";

@Entity()
export class InspectionAndAcceptanceReportItems {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => InspectionAndAcceptanceReport, i => i.items)
    @JoinColumn()
    iar: InspectionAndAcceptanceReport
    
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

  @OneToMany(() => InspectionAndAcceptanceReportSubItems, i => i.iari)
  subItems: InspectionAndAcceptanceReportSubItems[]

  @Column()
  itemNo: string
}