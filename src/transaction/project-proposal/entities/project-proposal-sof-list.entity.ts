import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectProposal } from "./project-proposal.entity";

@Entity()
export class ProjectProposalSOFList {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @ManyToOne(() => ProjectProposal, s => s.sof)
    @JoinColumn()
    pp: ProjectProposal
  @Column()
  sofId: string
  @Column()
  sofDescription: string
  @Column()
  year: string
  @Column({type: "double"})
  amount: number
}