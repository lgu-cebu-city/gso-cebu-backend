import { PartialType } from '@nestjs/swagger';
import { CreateProjectProposalDto } from './create-project-proposal.dto';

export class UpdateProjectProposalDto extends PartialType(CreateProjectProposalDto) {}
