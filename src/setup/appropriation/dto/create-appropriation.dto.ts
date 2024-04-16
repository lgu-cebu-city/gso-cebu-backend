import { ApiProperty } from "@nestjs/swagger"

export class CreateAppropriationDto {
  @ApiProperty()
  budgetYear: number
  @ApiProperty()
  officeName: string
  @ApiProperty()
  fundId: number
  @ApiProperty()
  classificationId: number
  @ApiProperty()
  classificationCode: string
  @ApiProperty()
  subclassificationId: number
  @ApiProperty()
  subclassificationCode: string
  @ApiProperty()
  code: string
  @ApiProperty()
  description: string
  @ApiProperty({type: "double"})
  amount: number
  @ApiProperty()
  classification: string
  @ApiProperty()
  subclassification: string
  @ApiProperty()
  classorder: number
  @ApiProperty()
  subclassorder: number
  @ApiProperty()
  type: number
  @ApiProperty()
  officeCode: string
  @ApiProperty()
  batch: string
  @ApiProperty()
  officeId: string
  @ApiProperty()
  project: string
  @ApiProperty()
  isContinuing: number
  @ApiProperty()
  ordering: number
}
