import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BarangayIssuanceItemBatchDetails } from "./barangay-issuance-item-batch-details.entity";
import { BarangayIssuance } from "./barangay-issuance.entity";

@Entity()
export class BarangayIssuanceItemDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => BarangayIssuance, o => o.items)
    @JoinColumn()
    bri: BarangayIssuance

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
  
    @OneToMany(() => BarangayIssuanceItemBatchDetails, i => i.brid)
    itemsDetails: BarangayIssuanceItemBatchDetails[]
}