import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InspectionAndAcceptanceReportItems } from "./inspection-and-acceptance-report-items.entity";
import { InspectionAndAcceptanceReportItemsView } from "./inspection-and-acceptance-report-items.view.entity";
import { InventoryLedger } from "src/transaction/inventory/entities/inventory-ledger.entiry";

@Entity()
export class InspectionAndAcceptanceReport {
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

  @OneToMany(() => InspectionAndAcceptanceReportItems, i => i.iar)
  items: InspectionAndAcceptanceReportItems[]

  @OneToMany(() => InspectionAndAcceptanceReportItemsView, i => i.iar)
  itemsView: InspectionAndAcceptanceReportItemsView[]

  @OneToMany(() => InventoryLedger, i => i.ref)
  detailedItem: InventoryLedger[]

  @Column({ default: 'ACTIVE' })
  status: string
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateSaved: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdated: Date
}