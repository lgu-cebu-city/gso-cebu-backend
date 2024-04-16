import { Group } from "src/setup/group/entities/group.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Type {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  description: string
  @Column()
  groupName: string
  @Column()
  groupId: string
  @Column({ default: 'Active' })
  status: string
  @Column()
  categoryName: string
  @Column()
  categoryId: string
  @Column({ default: '0' })
  isMedicine: string
  @Column({ default: '0' })
  isWithExpiry: string
  @Column()
  typeCode: string
  @Column({ default: 0, nullable: true })
  ps_dbm: number
  @Column({ default: 0, nullable: true })
  sequence: number
  @Column({ default: 0, nullable: true })
  visible: number
  
  @ManyToOne(() => Group, a => a.type)
    @JoinColumn()
    group: Group
}
