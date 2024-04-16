import { Module } from '@nestjs/common';
import { ProjectProposalService } from './project-proposal.service';
import { ProjectProposalController } from './project-proposal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectProposal } from './entities/project-proposal.entity';
import { ProjectProposalItemDetails } from './entities/project-proposal-item-details.entity';
import { ProjectProposalSOFList } from './entities/project-proposal-sof-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectProposal, ProjectProposalItemDetails, ProjectProposalSOFList])],
  controllers: [ProjectProposalController],
  providers: [ProjectProposalService],
  exports: [ProjectProposalService]
})
export class ProjectProposalModule { }
