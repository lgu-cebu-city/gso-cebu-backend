import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UnitConversion {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column()
  unit1: string
  @Column()
  quantity1: number
  @Column()
  unit2: string
  @Column()
  quantity2: number
  @Column()
  unit3: string
  @Column()
  quantity3: number
  @Column()
  unit4: string
  @Column()
  quantity4: number
  @Column()
  itemType: string;
  @Column({ default: 'Active' })
  status: string
}
