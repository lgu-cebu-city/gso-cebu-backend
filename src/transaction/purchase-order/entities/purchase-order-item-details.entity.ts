import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseOrder } from "./purchase-order.entity";
import { InspectionAndAcceptanceReportActualDeliveryItemsView } from "src/transaction/inspection-and-acceptance-report-actual/entities/inspection-and-acceptance-report-actual-delivery-items.view.entity";
import { InspectionAndAcceptanceReportDeliveryItemsView } from "src/transaction/inspection-and-acceptance-report/entities/inspection-and-acceptance-report-delivery-items.view.entity";

@Entity()
export class PurchaseOrderItemDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => PurchaseOrder, o => o.items)
    @JoinColumn()
    po: PurchaseOrder

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
  @Column({type: "double"})
  cost: number
  @Column({type: "double"})
  total: number
  @Column()
  remarks: string
  @Column({nullable: true})
  typeId: string

  @OneToMany(() => InspectionAndAcceptanceReportDeliveryItemsView, i => i.poItem)
  dr: InspectionAndAcceptanceReportDeliveryItemsView[]

  @OneToMany(() => InspectionAndAcceptanceReportActualDeliveryItemsView, i => i.poItem)
  drActual: InspectionAndAcceptanceReportActualDeliveryItemsView[]
}