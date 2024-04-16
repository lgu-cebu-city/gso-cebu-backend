import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column({ nullable: false, unique: true })
  username: string
  @Column({ nullable: false })
  password: string
  @Column({ nullable: false })
  empId: string
  @Column({ nullable: false })
  name: string
  @Column({ nullable: false })
  userType: string
  @Column({ nullable: false })
  typeId: string
  @Column({ nullable: false })
  typeName: string
  @Column({ nullable: true })
  positionId: string
  @Column({ nullable: true })
  positionName: string
  @Column({ nullable: true })
  userEmployeeId: string
  @Column({ nullable: true })
  userEmployeeName: string
  @Column({ default: true })
  IsActive: boolean
}
