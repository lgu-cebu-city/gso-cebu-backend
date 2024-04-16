import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FundCategory {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  book: number
  @Column()
  fundId: number
  @Column()
  name: string
  @Column()
  code: string
  @Column()
  classOrder: number
  @Column()
  deleted_at: Date
}