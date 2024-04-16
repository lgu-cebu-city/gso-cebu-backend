import { Type } from "src/setup/type/entities/type.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  description: string
  @Column({ default: 'Active' })
  status: string

  @OneToMany(() => Type, g => g.group)
  type: Type[];
}
