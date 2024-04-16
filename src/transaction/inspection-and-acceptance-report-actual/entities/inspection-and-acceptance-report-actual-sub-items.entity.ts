import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { InspectionAndAcceptanceReportActualItems } from "./inspection-and-acceptance-report-actual-items.entity";

@Entity()
export class InspectionAndAcceptanceReportActualSubItems {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => InspectionAndAcceptanceReportActualItems, i => i.subItems)
    @JoinColumn()
    iari: InspectionAndAcceptanceReportActualItems
    
  @Column()
  itemId: string
  @Column()
  description: string
  @Column()
  uom: string
  @Column()
  quantity: number
  @Column()
  serialNo: string
  @Column()
  model: string

  @Column()
  itemNo: string
}