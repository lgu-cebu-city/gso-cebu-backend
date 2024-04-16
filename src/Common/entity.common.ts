import { Column } from "typeorm"
export class commonEntities {
  //Time Stamp
  @Column({ nullable: true })
  created: Date
  @Column({ default: '' })
  createdBy: string

  @Column({ nullable: true })
  modified: Date
  @Column({ default: '' })
  modifiedby: string

}