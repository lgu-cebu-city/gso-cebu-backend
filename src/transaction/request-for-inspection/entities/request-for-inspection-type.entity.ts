import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RequestForInspection } from "./request-for-inspection.entity";

@Entity()
export class RequestForInspectionType {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @ManyToOne(() => RequestForInspection, s => s.type)
    @JoinColumn()
    rfi: RequestForInspection
  @Column()
  type: string
}