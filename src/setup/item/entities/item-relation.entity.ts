import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ItemRelation {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  genericId: string
  @Column()
  genericDescription: string
  @Column()
  genericUom: string
  @Column()
  nonGenericId: string
  @Column()
  nonGenericDescription: string
}
