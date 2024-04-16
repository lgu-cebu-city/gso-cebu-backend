import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RequisitionIssuanceSlipItemDetails } from "./requisition-issuance-slip-item-details.entity";

@Entity()
export class RequisitionIssuanceSlipItemBatchDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => RequisitionIssuanceSlipItemDetails, o => o.itemsDetails)
    @JoinColumn()
    risd: RequisitionIssuanceSlipItemDetails

  @Column()
  itemId: string
  @Column()
  batchNo: string
  @Column()
  expirationDate: Date
  @Column()
  quantity: number
  @Column()
  remarks: string
}