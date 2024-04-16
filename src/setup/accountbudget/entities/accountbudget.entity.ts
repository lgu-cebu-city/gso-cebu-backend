import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AccountBudget {
  @PrimaryGeneratedColumn('uuid')
  ID: string
  @Column({ default: 0})
  ParentId: number
  @Column({ default: '' })
  DepartmentId: string
  @Column({ default: '' })
  DepartmentName: string
  @Column({ default: 1 })
  SOFID: number
  @Column({ default: 0 })
  BYear: number
  @Column({ default: 0 })
  DescriptionID1: number
  @Column({ default: '' })
  AccountCode: string
  @Column({ default: '' })
  AccountDescription: string
  @Column({ default: 0.000000 })
  Amount: number
  @Column({ default: 0.000000 })
  Amount2: number
  @Column({ default: 0.000000 })
  AllotmentReleased: number
  @Column({ default: 'Active' })
  Status: string
  @Column({ default: '' })
  SOF: string
  @Column({ default: 0 })
  CategoryId: number
  @Column({ default: '' })
  Category: string
  @Column({ default: 0 })
  CategoryOrder: number
  @Column({ default: '' })
  SubCategory: string
  @Column({ default: 0 })
  SubCategoryOrder: number
  @Column({ default: '0' })
  isContinuing: number
  @Column()
  UID: number
  @Column({ type: 'datetime', default: () => 'NOW()' })
  TS: string
  @Column({ default: '' })
  SG: string
  @Column({ default: '' })
  Step: string
  @Column({ default: 'For Approval' })
  ApprovalStatus: string
  @Column({ type: 'datetime' })
  StartDate: string
  @Column({ type: 'datetime' })
  EndDate: string
  @Column({ default: 0 })
  WFPID: number
  @Column({ default: 'Expense' })
  BudgetType: string
  @Column({ default: '' })
  ORNo: string
  @Column({ default: '' })
  ProjectName: string
  @Column({ default: 0 })
  ProjectId: number
  @Column()
  Purposed: string
  @Column({ default: '' })
  sheetName: string
}