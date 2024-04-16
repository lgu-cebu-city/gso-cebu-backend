import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Appropriation {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  budgetYear: number
  @Column()
  officeName: string
  @Column()
  fundId: number
  @Column()
  classificationId: number
  @Column()
  classificationCode: string
  @Column()
  subclassificationId: number
  @Column()
  subclassificationCode: string
  @Column()
  code: string
  @Column()
  description: string
  @Column({type: "decimal", precision: 26, scale: 2, default: 0})
  amount: number
  @Column()
  classification: string
  @Column()
  subclassification: string
  @Column()
  classorder: number
  @Column()
  subclassorder: number
  @Column()
  type: number
  @Column()
  officeCode: string
  @Column()
  batch: string
  @Column()
  officeId: string
  @Column()
  project: string
  @Column()
  isContinuing: number
  @Column()
  ordering: number
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deleted_at: Date
}
