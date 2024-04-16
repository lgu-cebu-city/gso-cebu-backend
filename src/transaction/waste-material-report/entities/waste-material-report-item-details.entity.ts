import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WasteMaterialReport } from "./waste-material-report.entity";

@Entity()
export class WasteMaterialReportItemDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => WasteMaterialReport, o => o.items)
    @JoinColumn()
    wmr: WasteMaterialReport

  @Column({ nullable: true })
  itemCode: string
  @Column({ nullable: true })
  quantity: number
  @Column({ nullable: true })
  itemId: string
  @Column("text")
  description: string
  @Column({ nullable: true })
  uom: string
  @Column({ nullable: true })
  refId: string
  @Column({ nullable: true })
  refNo: string
  @Column({ nullable: true })
  refType: string
  @Column({ nullable: true })
  orNo: string
  @Column({ nullable: true })
  orDate: Date
  @Column({ nullable: true })
  amount: number
  @Column({ nullable: true })
  dateAcquired: Date
}