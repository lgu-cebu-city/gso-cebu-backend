import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Department {
  @PrimaryColumn()
  id: string
  @Column({ default: '' })
  code: string
  @Column({ default: '' })
  nationalCode: string
  @Column({ default: '' })
  name: string
  @Column({ default: '' })
  type: string
  @Column({ default: '' })
  description: string
  @Column({ default: 0 })
  sequence: number
  @Column({ default: '' })
  status: string
  @Column({ default: '' })
  prefix: string
  @Column({ default: '' })
  group_code: string
  @Column({ default: '' })
  group_name: string
  @Column({ default: '' })
  position_category: string
  @Column({ default: '' })
  emp_head: string
}