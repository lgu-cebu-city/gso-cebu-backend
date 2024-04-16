/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateProjectProposalDto } from './dto/create-project-proposal.dto';
import { UpdateProjectProposalDto } from './dto/update-project-proposal.dto';
import { ProjectProposalItemDetails } from './entities/project-proposal-item-details.entity';
import { ProjectProposalSOFList } from './entities/project-proposal-sof-list.entity';
import { ProjectProposal } from './entities/project-proposal.entity';

@Injectable()
export class ProjectProposalService {

  constructor(
    @InjectRepository(ProjectProposal)
    private projectProposalRepo: Repository<ProjectProposal>,
    @InjectRepository(ProjectProposalItemDetails)
    private projectProposalItemDetailsRepo: Repository<ProjectProposalItemDetails>,
    @InjectRepository(ProjectProposalSOFList)
    private projectProposalSOFListRepo: Repository<ProjectProposalSOFList>,
    private connection: Connection
  ) { }

  async create(createProjectProposalDto: CreateProjectProposalDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      delete createProjectProposalDto["id"];
      const created = this.projectProposalRepo.create(createProjectProposalDto);
      const data = await queryRunner.manager.save(created);

      createProjectProposalDto.items.forEach(itemDtl => {
        const items = this.projectProposalItemDetailsRepo.create(itemDtl);
        items.pp = data;
        queryRunner.manager.save(items);
      });
      
      createProjectProposalDto.sof.forEach(sofDtl => {
        const detail = this.projectProposalSOFListRepo.create(sofDtl);
        detail.pp = data;
        queryRunner.manager.save(detail);
      });

      queryRunner.commitTransaction();
      return data;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err
    } finally {
    }
  }

  async findAll() {
    const pp = await this.connection
    .getRepository(ProjectProposal)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.sof", "sofList")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .where("pp.status = :status", { status: "ACTIVE" })
    .orderBy("pp.dateSaved", "DESC")
    .getMany();

    return pp;
  }

  async findOne(_id: string): Promise<ProjectProposal> {
    const pp = await this.connection
    .getRepository(ProjectProposal)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.sof", "sofList")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .where("pp.id = :id", { id: _id })
    .getOne();

    return pp;
  }

  async getTransactionNo(): Promise<string> {
    const transNo = this.projectProposalRepo.query("SELECT CONCAT('PP-', YEAR(CURRENT_DATE()), '-', LPAD(MONTH(CURRENT_DATE()), 2, '0'), '-', LPAD(COUNT(*)+1, 3, '0')) 'transactionNo' FROM project_proposal");
    return transNo;
  }

  async update(id: string, updateProjectProposalDto: UpdateProjectProposalDto) {
    let _pp = await this.projectProposalRepo.findOneOrFail({ id: id });
    let _items = await this.projectProposalItemDetailsRepo.find({ where: { pp: _pp } });
    let _sofs = await this.projectProposalSOFListRepo.find({ where: { pp: _pp } });

    await this.projectProposalItemDetailsRepo.remove(_items);
    await this.projectProposalSOFListRepo.remove(_sofs);

    _pp.referenceNo = updateProjectProposalDto.referenceNo;
    _pp.referenceDate = updateProjectProposalDto.referenceDate;
    _pp.departmentId = updateProjectProposalDto.departmentId;
    _pp.departmentName = updateProjectProposalDto.departmentName;
    _pp.projectTitle = updateProjectProposalDto.projectTitle;
    _pp.projectLocation = updateProjectProposalDto.projectLocation;
    _pp.projLocBarangay = updateProjectProposalDto.projLocBarangay;
    _pp.description = updateProjectProposalDto.description;
    _pp.rationale = updateProjectProposalDto.rationale;
    _pp.projectStartDate = updateProjectProposalDto.projectStartDate;
    _pp.projectDuration = updateProjectProposalDto.projectDuration;
    _pp.projectType = updateProjectProposalDto.projectType;
    _pp.projectCost = updateProjectProposalDto.projectCost;
    _pp.sourceOfFund = updateProjectProposalDto.sourceOfFund;

    await this.projectProposalRepo.update(id, _pp);
    
    updateProjectProposalDto.items.forEach(async item => {
      if (!item["id"]) delete item["id"];
      const items = this.projectProposalItemDetailsRepo.create(item);
      items.pp = _pp;
      await this.projectProposalItemDetailsRepo.save(items);
    });

    updateProjectProposalDto.sof.forEach(async _sof => {
      if (!_sof["id"]) delete _sof["id"];
      const sof = this.projectProposalSOFListRepo.create(_sof);
      sof.pp = _pp;
      await this.projectProposalSOFListRepo.save(sof);
    });

    return this.findOne(id);
  }

  async remove(id: string) {
    let _pp = await this.projectProposalRepo.findOneOrFail({ id: id });
    _pp.status = "INACTIVE";
    await this.projectProposalRepo.update(id, _pp);
    
    return this.findOne(id);
  }
}
