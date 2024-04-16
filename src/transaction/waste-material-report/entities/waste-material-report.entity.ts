import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WasteMaterialReportItemDetails } from "./waste-material-report-item-details.entity";
import { WasteMaterialReportInspectionCertificate } from "./waste-material-report-inspection-certificate.entity";

@Entity()
export class WasteMaterialReport {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column({ nullable: true })
  transactionNo: string
  @Column({ nullable: true })
  transactionDate: Date
  @Column({ nullable: true })
  departmentId: string
  @Column({ nullable: true })
  departmentName: string
  @Column({ nullable: true })
  placeOfStorage: string
  @Column({ nullable: true })
  inspOfficerId: string
  @Column({ nullable: true })
  inspOfficerName: string
  @Column({ nullable: true })
  witnessId: string
  @Column({ nullable: true })
  witnessName: string
  @Column({ nullable: true })
  fund: string
  @Column({ nullable: true })
  remarks: string
  @Column({ default: 'ACTIVE' })
  status: string
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateSaved: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdated: Date

  @OneToMany(() => WasteMaterialReportInspectionCertificate, s => s.wmr)
  inspectionCertificate: WasteMaterialReportInspectionCertificate[]

  @OneToMany(() => WasteMaterialReportItemDetails, i => i.wmr)
  items: WasteMaterialReportItemDetails[]
}