import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectProposalItemDetails } from "./project-proposal-item-details.entity";
import { ProjectProposalSOFList } from "./project-proposal-sof-list.entity";

@Entity()
export class ProjectProposal {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  referenceNo: string
  @Column()
  referenceDate: Date
  @Column()
  departmentId: string
  @Column()
  departmentName: string
  @Column()
  projectTitle: string
  @Column()
  projectLocation: string
  @Column()
  projLocBarangay: string
  @Column()
  description: string
  @Column()
  rationale: string
  @Column()
  projectStartDate: Date
  @Column()
  projectDuration: string
  @Column()
  projectType: string
  @Column({type: "double"})
  projectCost: number
  @Column({ default: 'ACTIVE' })
  status: string
  @Column()
  sourceOfFund: string
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateSaved: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdated: Date

  @OneToMany(() => ProjectProposalSOFList, s => s.pp)
  sof: ProjectProposalSOFList[]

  @OneToMany(() => ProjectProposalItemDetails, i => i.pp)
  items: ProjectProposalItemDetails[]
}