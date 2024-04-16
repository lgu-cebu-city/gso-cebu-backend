import { ApiProperty } from "@nestjs/swagger"
import { ProjectProposal } from "../entities/project-proposal.entity"

export class CreateProjectProposalSOFListDto {
  @ApiProperty()
  sofId: string
  @ApiProperty()
  sofDescription: string
  @ApiProperty()
  year: string
  @ApiProperty()
  amount: number
  @ApiProperty()
  pp: ProjectProposal
}
