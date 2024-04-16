import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PropertyRequisitionSlip } from "./property-requisition-slip.entity";

@Entity()
export class PropertyRequisitionSlipItemDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => PropertyRequisitionSlip, o => o.items)
    @JoinColumn()
    prs: PropertyRequisitionSlip

  @Column()
  itemCode: string
  @Column()
  itemId: string
  @Column()
  description: string
  @Column()
  uom: string
  @Column()
  areId: string
  @Column()
  areNo: string
}