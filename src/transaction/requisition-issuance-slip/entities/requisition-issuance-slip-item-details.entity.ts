import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RequisitionIssuanceSlipItemBatchDetails } from "./requisition-issuance-slip-item-batch-details.entity";
import { RequisitionIssuanceSlip } from "./requisition-issuance-slip.entity";

@Entity()
export class RequisitionIssuanceSlipItemDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => RequisitionIssuanceSlip, o => o.items)
    @JoinColumn()
    ris: RequisitionIssuanceSlip

  @Column()
  itemId: string
  @Column()
  itemCode: string
  @Column()
  description: string
  @Column()
  unitId: string
  @Column()
  uom: string
  @Column({type: "double"})
  requestedQty: number
  @Column()
  issuedUnit: string
  @Column({type: "double"})
  issuedQty: number
  @Column()
  lotNo: string
  @Column()
  genericId: string
  @Column()
  groupId: string
  @Column()
  price: number
  @Column()
  remarks: string
  @Column()
  prItemId: string

  @OneToMany(() => RequisitionIssuanceSlipItemBatchDetails, i => i.risd)
  itemsDetails: RequisitionIssuanceSlipItemBatchDetails[]
}