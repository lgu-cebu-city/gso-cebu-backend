import { ApiProperty } from "@nestjs/swagger"
import { CreateProjectProposalItemDetailsDto } from "./create-project-proposal-item-details.dto"
import { CreateProjectProposalSOFListDto } from "./create-project-proposal-sof-list.dto"

export class CreateProjectProposalDto {
  @ApiProperty()
  referenceNo: string
  @ApiProperty()
  referenceDate: Date
  @ApiProperty()
  departmentId: string
  @ApiProperty()
  departmentName: string
  @ApiProperty()
  projectTitle: string
  @ApiProperty()
  projectLocation: string
  @ApiProperty()
  projLocBarangay: string
  @ApiProperty()
  description: string
  @ApiProperty()
  rationale: string
  @ApiProperty()
  projectStartDate: Date
  @ApiProperty()
  projectDuration: string
  @ApiProperty()
  projectType: string
  @ApiProperty()
  projectCost: number
  @ApiProperty()
  sourceOfFund: string

  @ApiProperty({ type: CreateProjectProposalSOFListDto, isArray: true })
  sof: CreateProjectProposalSOFListDto[];

  @ApiProperty({ type: CreateProjectProposalItemDetailsDto, isArray: true })
  items: CreateProjectProposalItemDetailsDto[];
}
