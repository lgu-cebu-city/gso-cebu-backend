/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreatePropertyRequisitionSlipDto } from './dto/create-property-requisition-slip.dto';
import { UpdatePropertyRequisitionSlipDto } from './dto/update-property-requisition-slip.dto';
import { PropertyRequisitionSlipItemDetails } from './entities/property-requisition-slip-item-details.entity';
import { PropertyRequisitionSlip } from './entities/property-requisition-slip.entity';

@Injectable()
export class PropertyRequisitionSlipService {

  constructor(
    @InjectRepository(PropertyRequisitionSlip)
    private requestForInspectionRepo: Repository<PropertyRequisitionSlip>,
    @InjectRepository(PropertyRequisitionSlipItemDetails)
    private requestForInspectionItemDetailsRepo: Repository<PropertyRequisitionSlipItemDetails>,
    private connection: Connection
  ) { }

  async create(createPropertyRequisitionSlipDto: CreatePropertyRequisitionSlipDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      delete createPropertyRequisitionSlipDto["id"];
      const created = this.requestForInspectionRepo.create(createPropertyRequisitionSlipDto);
      const data = await queryRunner.manager.save(created);

      createPropertyRequisitionSlipDto.items.forEach(itemDtl => {
        delete itemDtl["id"];
        const items = this.requestForInspectionItemDetailsRepo.create(itemDtl);
        items.prs = data;
        queryRunner.manager.save(items);
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
    const prs = await this.connection
    .getRepository(PropertyRequisitionSlip)
    .createQueryBuilder("prs")
    .leftJoinAndSelect("prs.items", "itemDetails")
    .where("prs.status = :status", { status: "ACTIVE" })
    .orderBy("prs.dateSaved", "DESC")
    .getMany();

    return prs;
  }

  async findOne(_id: string): Promise<PropertyRequisitionSlip> {
    const prs = await this.connection
    .getRepository(PropertyRequisitionSlip)
    .createQueryBuilder("prs")
    .leftJoinAndSelect("prs.items", "itemDetails")
    .where("prs.id = :id", { id: _id })
    .getOne();

    return prs;
  }

  async getTransactionNo(): Promise<string> {
    const transNo = this.requestForInspectionRepo.query("SELECT CONCAT('PQS-', YEAR(CURRENT_DATE()), '-', LPAD(MONTH(CURRENT_DATE()), 2, '0'), '-', LPAD(COUNT(*)+1, 3, '0')) 'transactionNo' FROM property_requisition_slip");
    return transNo;
  }

  async update(id: string, updatePropertyRequisitionSlipDto: UpdatePropertyRequisitionSlipDto) {
    let _prs = await this.requestForInspectionRepo.findOneOrFail({ id: id });
    let _items = await this.requestForInspectionItemDetailsRepo.find({ where: { prs: _prs } });

    await this.requestForInspectionItemDetailsRepo.remove(_items);

    _prs.transactionNo = updatePropertyRequisitionSlipDto.transactionNo;
    _prs.transactionDate = updatePropertyRequisitionSlipDto.transactionDate;
    _prs.requestorId = updatePropertyRequisitionSlipDto.requestorId;
    _prs.requestorName = updatePropertyRequisitionSlipDto.requestorName;
    _prs.preparedById = updatePropertyRequisitionSlipDto.preparedById;
    _prs.preparedByName = updatePropertyRequisitionSlipDto.preparedByName;
    _prs.dateFrom = updatePropertyRequisitionSlipDto.dateFrom;
    _prs.dateTo = updatePropertyRequisitionSlipDto.dateTo;
    _prs.purpose = updatePropertyRequisitionSlipDto.purpose;
    _prs.remarks = updatePropertyRequisitionSlipDto.remarks;

    await this.requestForInspectionRepo.update(id, _prs);
    
    updatePropertyRequisitionSlipDto.items.forEach(async item => {
      if (!item["id"]) delete item["id"];
      const items = this.requestForInspectionItemDetailsRepo.create(item);
      items.prs = _prs;
      await this.requestForInspectionItemDetailsRepo.save(items);
    });

    return this.findOne(id);
  }

  async remove(id: string) {
    const model = await this.findOne(id);
    return this.requestForInspectionRepo.remove(model);
  }
}
