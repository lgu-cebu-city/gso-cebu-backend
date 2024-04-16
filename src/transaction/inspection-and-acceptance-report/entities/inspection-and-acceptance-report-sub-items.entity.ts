import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { InspectionAndAcceptanceReportItems } from "./inspection-and-acceptance-report-items.entity";

@Entity()
export class InspectionAndAcceptanceReportSubItems {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => InspectionAndAcceptanceReportItems, i => i.subItems)
    @JoinColumn()
    iari: InspectionAndAcceptanceReportItems
    
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