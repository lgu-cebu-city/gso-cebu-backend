import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Barangay {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  name: string
  @Column({ default: 'Active' })
  status: string
}
