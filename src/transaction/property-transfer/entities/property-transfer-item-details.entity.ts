import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PropertyTransferItemBatchDetails } from "./poperty-transfer-item-batch-details.entity";
import { PropertyTransfer } from "./property-transfer.entity";

@Entity()
export class PropertyTransferItemDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => PropertyTransfer, o => o.items)
    @JoinColumn()
    pt: PropertyTransfer

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
  
    @OneToMany(() => PropertyTransferItemBatchDetails, i => i.ptd)
    itemsDetails: PropertyTransferItemBatchDetails[]
}