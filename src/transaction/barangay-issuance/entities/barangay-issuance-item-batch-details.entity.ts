import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BarangayIssuanceItemDetails } from "./barangay-issuance-item-details.entity";

@Entity()
export class BarangayIssuanceItemBatchDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => BarangayIssuanceItemDetails, o => o.itemsDetails)
    @JoinColumn()
    brid: BarangayIssuanceItemDetails

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