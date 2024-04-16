import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SOF {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column({ default: '' })
  SOFName: string
}