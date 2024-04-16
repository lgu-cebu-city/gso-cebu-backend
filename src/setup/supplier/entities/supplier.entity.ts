import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  name: string
  @Column()
  address: string
  @Column()
  contactNumber: string
  @Column()
  contactPerson: string
  @Column({ default: 'Active' })
  status: string
}