import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectProposalService } from './project-proposal.service';
import { CreateProjectProposalDto } from './dto/create-project-proposal.dto';
import { UpdateProjectProposalDto } from './dto/update-project-proposal.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ProjectProposal')
@Controller({ path: 'project-proposal', version: '1' })
export class ProjectProposalController {
  constructor(private readonly projectProposalService: ProjectProposalService) { }

  @Post()
  create(@Body() createProjectProposalDto: CreateProjectProposalDto) {
    return this.projectProposalService.create(createProjectProposalDto);
  }

  @Get()
  findAll() {
    return this.projectProposalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectProposalService.findOne(id);
  }

  @Get('transactionNo/transNo')
  getTransactionNo() {
    return this.projectProposalService.getTransactionNo();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectProposalDto: UpdateProjectProposalDto) {
    return this.projectProposalService.update(id, updateProjectProposalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectProposalService.remove(id);
  }
}
