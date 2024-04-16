import {ViewEntity, ViewColumn, ManyToOne, JoinColumn, PrimaryGeneratedColumn} from "typeorm";
import { PostRepairInspection } from "./post-repair-inspection.entity";

@ViewEntity({
    expression: `
    SELECT
      porii.*
    FROM
      post_repair_inspection_item_details porii
      INNER JOIN post_repair_inspection pori
        ON(pori.id = porii.poriId)
    WHERE
      pori.status = 'ACTIVE' AND
      (SELECT COUNT(*) FROM waste_material_report_item_details w WHERE w.refId=pori.id AND w.itemId=porii.itemId AND w.refType='PRI') = 0
    `
})

export class PostRepairInspectionItemDetailsView {  
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ManyToOne(() => PostRepairInspection, o => o.itemsForWaste)
    @JoinColumn()
    pori: PostRepairInspection

  @ViewColumn()
  itemId: string
  @ViewColumn()
  description: string
  @ViewColumn()
  type: string
  @ViewColumn()
  uom: string
  @ViewColumn()
  quantity: number
  @ViewColumn()
  cost: number
  @ViewColumn()
  total: number
  @ViewColumn()
  remarks: string
  @ViewColumn()
  dateAcquired: Date
}