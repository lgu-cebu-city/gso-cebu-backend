import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WasteMaterialReport } from "./waste-material-report.entity";

@Entity()
export class WasteMaterialReportInspectionCertificate {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @ManyToOne(() => WasteMaterialReport, s => s.inspectionCertificate)
    @JoinColumn()
    wmr: WasteMaterialReport
  @Column()
  quantity: number
  @Column()
  description: string
  @Column()
  transferTo: string
}