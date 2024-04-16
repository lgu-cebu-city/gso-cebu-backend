import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectProposal } from "./project-proposal.entity";

@Entity()
export class ProjectProposalItemDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => ProjectProposal, o => o.items)
    @JoinColumn()
    pp: ProjectProposal

  @Column()
  itemId: string
  @Column()
  description: string
  @Column()
  type: string
  @Column({type: "double"})
  quantity: number
  @Column()
  uom: string
  @Column({type: "double"})
  cost: number
  @Column({type: "double"})
  total: number
  @Column()
  remarks: string
}