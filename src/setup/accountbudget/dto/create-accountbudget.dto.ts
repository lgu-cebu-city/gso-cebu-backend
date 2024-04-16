import { ApiProperty } from "@nestjs/swagger"

export class CreateAccountBudgetDto {
  @ApiProperty()
  ParentId: number
  @ApiProperty()
  DepartmentId: string
  @ApiProperty()
  DepartmentName: string
  @ApiProperty()
  SOFID: number
  @ApiProperty()
  BYear: number
  @ApiProperty()
  DescriptionID1: number
  @ApiProperty()
  AccountCode: string
  @ApiProperty()
  AccountDescription: string
  @ApiProperty()
  Amount: number
  @ApiProperty()
  Amount2: number
  @ApiProperty()
  AllotmentReleased: number
  @ApiProperty()
  Status: string
  @ApiProperty()
  SOF: string
  @ApiProperty()
  CategoryId: number
  @ApiProperty()
  Category: string
  @ApiProperty()
  CategoryOrder: number
  @ApiProperty()
  SubCategory: string
  @ApiProperty()
  SubCategoryOrder: number
  @ApiProperty()
  isContinuing: number
  @ApiProperty()
  UID: number
  @ApiProperty()
  TS: string
  @ApiProperty()
  SG: string
  @ApiProperty()
  Step: string
  @ApiProperty()
  ApprovalStatus: string
  @ApiProperty()
  StartDate: string
  @ApiProperty()
  EndDate: string
  @ApiProperty()
  WFPID: number
  @ApiProperty()
  BudgetType: string
  @ApiProperty()
  ORNo: string
  @ApiProperty()
  ProjectName: string
  @ApiProperty()
  ProjectId: number
  @ApiProperty()
  Purposed: string
  @ApiProperty()
  sheetName: string
}
