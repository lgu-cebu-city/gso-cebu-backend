/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateRequestForRepairDto } from './dto/create-request-for-repair.dto';
import { UpdateRequestForRepairDto } from './dto/update-request-for-repair.dto';
import { RequestForRepairItemDetails } from './entities/request-for-repair-item-details.entity';
import { RequestForRepair } from './entities/request-for-repair.entity';

@Injectable()
export class RequestForRepairService {

  constructor(
    @InjectRepository(RequestForRepair)
    private requestForRepairRepo: Repository<RequestForRepair>,
    @InjectRepository(RequestForRepairItemDetails)
    private requestForRepairItemDetailsRepo: Repository<RequestForRepairItemDetails>,
    private connection: Connection
  ) { }

  async create(createRequestForRepairDto: CreateRequestForRepairDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      delete createRequestForRepairDto["id"];
      const created = this.requestForRepairRepo.create(createRequestForRepairDto);
      const data = await queryRunner.manager.save(created);

      createRequestForRepairDto.items.forEach(itemDtl => {
        delete itemDtl["id"];
        const items = this.requestForRepairItemDetailsRepo.create(itemDtl);
        items.rfr = data;
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
    const rfr = await this.connection
    .getRepository(RequestForRepair)
    .createQueryBuilder("rfr")
    .leftJoinAndSelect("rfr.items", "itemDetails")
    .where("rfr.status = :status", { status: "ACTIVE" })
    .orderBy("rfr.dateSaved", "DESC")
    .getMany();

    return rfr;
  }

  async findOne(_id: string): Promise<RequestForRepair> {
    const rfr = await this.connection
    .getRepository(RequestForRepair)
    .createQueryBuilder("rfr")
    .leftJoinAndSelect("rfr.items", "itemDetails")
    .where("rfr.id = :id", { id: _id })
    .getOne();

    return rfr;
  }

  async getTransactionNo(): Promise<string> {
    const transNo = this.requestForRepairRepo.query("SELECT CONCAT('RFR-', YEAR(CURRENT_DATE()), '-', LPAD(MONTH(CURRENT_DATE()), 2, '0'), '-', LPAD(COUNT(*)+1, 3, '0')) 'transactionNo' FROM request_for_repair");
    return transNo;
  }

  async update(id: string, updateRequestForRepairDto: UpdateRequestForRepairDto) {
    let _rfr = await this.requestForRepairRepo.findOneOrFail({ id: id });
    let _items = await this.requestForRepairItemDetailsRepo.find({ where: { rfr: _rfr } });

    await this.requestForRepairItemDetailsRepo.remove(_items);

    _rfr.transactionNo = updateRequestForRepairDto.transactionNo;
    _rfr.transactionDate = updateRequestForRepairDto.transactionDate;
    _rfr.departmentId = updateRequestForRepairDto.departmentId;
    _rfr.departmentName = updateRequestForRepairDto.departmentName;
    _rfr.reason = updateRequestForRepairDto.reason;
    _rfr.remarks = updateRequestForRepairDto.remarks;

    await this.requestForRepairRepo.update(id, _rfr);
    
    updateRequestForRepairDto.items.forEach(async item => {
      if (!item["id"]) delete item["id"];
      const items = this.requestForRepairItemDetailsRepo.create(item);
      items.rfr = _rfr;
      await this.requestForRepairItemDetailsRepo.save(items);
    });

    return this.findOne(id);
  }

  async updateItemRemarks(_id: string, _remarks: string) {
    let _rfri = await this.requestForRepairItemDetailsRepo.findOneOrFail({ id: _id });
    _rfri.remarks = _remarks;

    await this.requestForRepairItemDetailsRepo.update(_id, _rfri);
  }

  async remove(id: string) {
    const model = await this.findOne(id);
    return this.requestForRepairRepo.remove(model);
  }
}
