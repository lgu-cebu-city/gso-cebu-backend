import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PropertyReturnSlip } from "./property-return-slip.entity";

@Entity()
export class PropertyReturnSlipItemDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => PropertyReturnSlip, o => o.items)
    @JoinColumn()
    prs: PropertyReturnSlip

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