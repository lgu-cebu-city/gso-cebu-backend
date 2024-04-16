import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InspectionAndAcceptanceReportActualItems } from "./inspection-and-acceptance-report-actual-items.entity";
import { InspectionAndAcceptanceReportActualItemsView } from "./inspection-and-acceptance-report-actual-items.view.entity";

@Entity()
export class InspectionAndAcceptanceReportActual {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  referenceNo: string
  @Column({ nullable: true })
  referenceDate: Date
  @Column()
  invoiceNo: string
  @Column({ nullable: true })
  invoiceDate: Date
  @Column()
  prId: string
  @Column()
  prNo: string
  @Column()
  poId: string
  @Column()
  poNo: string
  @Column({ nullable: true })
  poDate: Date
  @Column()
  departmentId: string
  @Column()
  departmentName: string
  @Column()
  sourceOfFund: string
  @Column()
  supplierId: string
  @Column()
  supplierName: string
  @Column()
  supplierAddress: string
  @Column()
  purpose: string

  @Column()
  supplyPropCust: string
  @Column()
  receivedBy: string
  @Column()
  receivedByPosition: string
  @Column()
  cto: string
  @Column()
  cao: string
  @Column()
  cmo: string
  @Column()
  it: string

  @OneToMany(() => InspectionAndAcceptanceReportActualItems, i => i.iar)
  items: InspectionAndAcceptanceReportActualItems[]

  @OneToMany(() => InspectionAndAcceptanceReportActualItemsView, i => i.iar)
  itemsView: InspectionAndAcceptanceReportActualItemsView[]

  @Column({ default: 'ACTIVE' })
  status: string
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateSaved: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdated: Date
}