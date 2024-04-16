/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateRequestForInspectionDto } from './dto/create-request-for-inspection.dto';
import { UpdateRequestForInspectionDto } from './dto/update-request-for-inspection.dto';
import { RequestForInspectionItemDetails } from './entities/request-for-inspection-item-details.entity';
import { RequestForInspectionType } from './entities/request-for-inspection-type.entity';
import { RequestForInspection } from './entities/request-for-inspection.entity';

@Injectable()
export class RequestForInspectionService {

  constructor(
    @InjectRepository(RequestForInspection)
    private requestForInspectionRepo: Repository<RequestForInspection>,
    @InjectRepository(RequestForInspectionItemDetails)
    private requestForInspectionItemDetailsRepo: Repository<RequestForInspectionItemDetails>,
    @InjectRepository(RequestForInspectionType)
    private requestForInspectionTypeRepo: Repository<RequestForInspectionType>,
    private connection: Connection
  ) { }

  async create(createRequestForInspectionDto: CreateRequestForInspectionDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      delete createRequestForInspectionDto["id"];
      const created = this.requestForInspectionRepo.create(createRequestForInspectionDto);
      const data = await queryRunner.manager.save(created);

      createRequestForInspectionDto.items.forEach(itemDtl => {
        delete itemDtl["id"];
        const items = this.requestForInspectionItemDetailsRepo.create(itemDtl);
        items.rfi = data;
        queryRunner.manager.save(items);
      });
      
      createRequestForInspectionDto.type.forEach(_type => {
        delete _type["id"];
        const detail = this.requestForInspectionTypeRepo.create(_type);
        detail.rfi = data;
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
    const rfi = await this.connection
    .getRepository(RequestForInspection)
    .createQueryBuilder("rfi")
    .leftJoinAndSelect("rfi.type", "type")
    .leftJoinAndSelect("rfi.items", "itemDetails")
    .where("rfi.status = :status", { status: "ACTIVE" })
    .orderBy("rfi.dateSaved", "DESC")
    .getMany();

    return rfi;
  }

  async findOne(_id: string): Promise<RequestForInspection> {
    const rfi = await this.connection
    .getRepository(RequestForInspection)
    .createQueryBuilder("rfi")
    .leftJoinAndSelect("rfi.type", "type")
    .leftJoinAndSelect("rfi.items", "itemDetails")
    .where("rfi.id = :id", { id: _id })
    .getOne();

    return rfi;
  }

  async getTransactionNo(): Promise<string> {
    const transNo = this.requestForInspectionRepo.query("SELECT CONCAT('RFI-', YEAR(CURRENT_DATE()), '-', LPAD(MONTH(CURRENT_DATE()), 2, '0'), '-', LPAD(COUNT(*)+1, 3, '0')) 'transactionNo' FROM request_for_inspection");
    return transNo;
  }

  async update(id: string, updateRequestForInspectionDto: UpdateRequestForInspectionDto) {
    let _rfi = await this.requestForInspectionRepo.findOneOrFail({ id: id });
    let _items = await this.requestForInspectionItemDetailsRepo.find({ where: { rfi: _rfi } });
    let _types = await this.requestForInspectionTypeRepo.find({ where: { rfi: _rfi } });

    await this.requestForInspectionItemDetailsRepo.remove(_items);
    await this.requestForInspectionTypeRepo.remove(_types);

    _rfi.transactionNo = updateRequestForInspectionDto.transactionNo;
    _rfi.transactionDate = updateRequestForInspectionDto.transactionDate;
    _rfi.departmentId = updateRequestForInspectionDto.departmentId;
    _rfi.departmentName = updateRequestForInspectionDto.departmentName;
    _rfi.transactionType = updateRequestForInspectionDto.transactionType;
    _rfi.remarks = updateRequestForInspectionDto.remarks;
    _rfi.actionTaken = updateRequestForInspectionDto.actionTaken;

    await this.requestForInspectionRepo.update(id, _rfi);
    
    updateRequestForInspectionDto.items.forEach(async item => {
      if (!item["id"]) delete item["id"];
      const items = this.requestForInspectionItemDetailsRepo.create(item);
      items.rfi = _rfi;
      await this.requestForInspectionItemDetailsRepo.save(items);
    });

    updateRequestForInspectionDto.type.forEach(async _type => {
      if (!_type["id"]) delete _type["id"];
      const type = this.requestForInspectionTypeRepo.create(_type);
      type.rfi = _rfi;
      await this.requestForInspectionTypeRepo.save(type);
    });

    return this.findOne(id);
  }

  async updateItemRemarks(_id: string, _remarks: string) {
    let _rfii = await this.requestForInspectionItemDetailsRepo.findOneOrFail({ id: _id });
    _rfii.remarks = _remarks;

    await this.requestForInspectionItemDetailsRepo.update(_id, _rfii);
  }

  async remove(id: string) {
    const model = await this.findOne(id);
    return this.requestForInspectionRepo.remove(model);
  }
}
