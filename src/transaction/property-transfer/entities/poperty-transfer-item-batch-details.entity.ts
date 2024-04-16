import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PropertyTransferItemDetails } from "./property-transfer-item-details.entity";

@Entity()
export class PropertyTransferItemBatchDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => PropertyTransferItemDetails, o => o.itemsDetails)
    @JoinColumn()
    ptd: PropertyTransferItemDetails

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