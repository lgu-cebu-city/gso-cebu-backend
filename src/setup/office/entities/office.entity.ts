import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Office {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  code: string
  @Column()
  description: string
  @Column({ default: 'Active' })
  status: string
}
