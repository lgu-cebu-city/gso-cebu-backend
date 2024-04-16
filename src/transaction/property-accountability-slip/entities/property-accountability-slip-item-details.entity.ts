import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PropertyAccountabilitySlip } from "./property-accountability-slip.entity";

@Entity()
export class PropertyAccountabilitySlipItemDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => PropertyAccountabilitySlip, o => o.items)
    @JoinColumn()
    pas: PropertyAccountabilitySlip

  @Column()
  itemNo: number
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