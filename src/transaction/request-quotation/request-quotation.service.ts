/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateRequestQuotationDto } from './dto/create-request-quotation.dto';
import { UpdateRequestQuotationDto } from './dto/update-request-quotation.dto';
import { RequestQuotationItemDetails } from './entities/request-quotation-item-details.entity';
import { RequestQuotation } from './entities/request-quotation.entity';

@Injectable()
export class RequestQuotationService {

  constructor(
    @InjectRepository(RequestQuotation)
    private requestQuotationRepo: Repository<RequestQuotation>,
    @InjectRepository(RequestQuotationItemDetails)
    private requestQuotationItemDetailsRepo: Repository<RequestQuotationItemDetails>,
    private connection: Connection
  ) { }

  async create(createRequestQuotationDto: CreateRequestQuotationDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      delete createRequestQuotationDto["id"];
      const created = this.requestQuotationRepo.create(createRequestQuotationDto);
      const data = await queryRunner.manager.save(created);

      createRequestQuotationDto.items.forEach(itemDtl => {
        delete itemDtl["id"];
        const items = this.requestQuotationItemDetailsRepo.create(itemDtl);
        items.rfq = data;
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
    const pp = await this.connection
    .getRepository(RequestQuotation)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .where("pp.status = :status", { status: "ACTIVE" })
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findAllByMonthYear(date: Date) {
    const pp = await this.connection
    .getRepository(RequestQuotation)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .where("pp.status = :status", { status: "ACTIVE" })
    .andWhere("MONTH(pp.dateSaved) = :mon", { mon: new Date(date).getMonth() + 1 })
    .andWhere("YEAR(pp.dateSaved) = :yr", { yr: new Date(date).getFullYear() })
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findAllForAOQByMonthYear(date: Date) {
    const pp = await this.connection
    .getRepository(RequestQuotation)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .where("pp.status = :status", { status: "ACTIVE" })
    .andWhere("MONTH(pp.dateSaved) = :mon", { mon: new Date(date).getMonth() + 1 })
    .andWhere("YEAR(pp.dateSaved) = :yr", { yr: new Date(date).getFullYear() })
    .andWhere("pp.id NOT IN (SELECT rfqId FROM abstract_of_canvass WHERE status = 'ACTIVE')")
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findOne(_id: string): Promise<RequestQuotation> {
    const pp = await this.connection
    .getRepository(RequestQuotation)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .where("pp.id = :id", { id: _id })
    .orderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getOne();

    return pp;
  }

  async getTransactionNo(): Promise<string> {
    const transNo = this.requestQuotationRepo.query("SELECT CONCAT('RFQ-', YEAR(CURRENT_DATE()), '-', LPAD(MONTH(CURRENT_DATE()), 2, '0'), '-', LPAD(COUNT(*)+1, 3, '0')) 'transactionNo' FROM request_quotation");
    return transNo;
  }

  async getTransCount(rfqId: string): Promise<number> {
    const transCount = this.requestQuotationRepo.query("SELECT COUNT(*) 'count' FROM abstract_of_canvass WHERE rfqId = '" + rfqId + "' AND STATUS = 'ACTIVE'");
    return transCount;
  }

  async findItemsByRfqId(_id: string) {
    const items = this.requestQuotationRepo.query("SELECT * FROM request_quotation_item_details WHERE rfqId = ? ORDER BY description ASC, uom ASC", [ _id ]);
    return items;
  }

  async update(id: string, updateRequestQuotationDto: UpdateRequestQuotationDto) {
    let _rfq = await this.requestQuotationRepo.findOneOrFail({ id: id });
    let _items = await this.requestQuotationItemDetailsRepo.find({ where: { rfq: _rfq } });

    await this.requestQuotationItemDetailsRepo.remove(_items);
    
    _rfq.transactionNo = updateRequestQuotationDto.transactionNo;
    _rfq.transactionDate = updateRequestQuotationDto.transactionDate;
    _rfq.recommendingDate = updateRequestQuotationDto.recommendingDate;
    _rfq.prId = updateRequestQuotationDto.prId;
    _rfq.prNo = updateRequestQuotationDto.prNo;
    _rfq.prDate = updateRequestQuotationDto.prDate;
    _rfq.departmentId = updateRequestQuotationDto.departmentId;
    _rfq.departmentName = updateRequestQuotationDto.departmentName;
    _rfq.openningDate = updateRequestQuotationDto.openningDate;
    _rfq.location = updateRequestQuotationDto.location;
    _rfq.canvasserId = updateRequestQuotationDto.canvasserId;
    _rfq.canvasserName = updateRequestQuotationDto.canvasserName;
    _rfq.procurementMode = updateRequestQuotationDto.procurementMode;
    _rfq.biddingType = updateRequestQuotationDto.biddingType;
    _rfq.approvedBudget = updateRequestQuotationDto.approvedBudget;
    _rfq.bidSecurity = updateRequestQuotationDto.bidSecurity;
    _rfq.bidDocsFee = updateRequestQuotationDto.bidDocsFee;
    _rfq.supplyDescription = updateRequestQuotationDto.supplyDescription;
    _rfq.deliveryPeriod = updateRequestQuotationDto.deliveryPeriod;
    _rfq.priceValidity = updateRequestQuotationDto.priceValidity;

    await this.requestQuotationRepo.update(id, _rfq);
    
    updateRequestQuotationDto.items.forEach(async item => {
      if (!item["id"]) delete item["id"];
      const items = this.requestQuotationItemDetailsRepo.create(item);
      items.rfq = _rfq;
      await this.requestQuotationItemDetailsRepo.save(items);
    });

    return this.findOne(id);
  }

  async remove(id: string) {
    let _rfq = await this.requestQuotationRepo.findOneOrFail({ id: id });
    _rfq.status = "INACTIVE";
    await this.requestQuotationRepo.update(id, _rfq);
    
    return this.findOne(id);
  }
}
