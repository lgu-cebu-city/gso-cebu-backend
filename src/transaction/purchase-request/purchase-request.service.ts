/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreatePurchaseRequestDto } from './dto/create-purchase-request.dto';
import { UpdatePurchaseRequestDto } from './dto/update-purchase-request.dto';
import { PurchaseRequestItemDetails } from './entities/purchase-request-item-details.entity';
import { PurchaseRequestLogsItemDetails } from './entities/purchase-request-logs-item-details.entity';
import { PurchaseRequestLogsSOFList } from './entities/purchase-request-logs-sof-list.entity';
import { PurchaseRequestLogs } from './entities/purchase-request-logs.entity';
import { PurchaseRequestSOFList } from './entities/purchase-request-sof-list.entity';
import { PurchaseRequest } from './entities/purchase-request.entity';
import { PurchaseRequestView } from './entities/purchase-request.view.entity';
import { PurchaseRequestImageAttachment } from './entities/purchase-request-image-attachment.entity';
import { PurchaseRequestLogsImageAttachment } from './entities/purchase-request-logs-image-attachment.entity';

@Injectable()
export class PurchaseRequestService {

  constructor(
    @InjectRepository(PurchaseRequest)
    private purchaseRequestRepo: Repository<PurchaseRequest>,
    @InjectRepository(PurchaseRequestItemDetails)
    private purchaseRequestItemDetailsRepo: Repository<PurchaseRequestItemDetails>,
    @InjectRepository(PurchaseRequestSOFList)
    private purchaseRequestSOFListRepo: Repository<PurchaseRequestSOFList>,
    @InjectRepository(PurchaseRequestImageAttachment)
    private purchaseRequestImageAttachmentRepo: Repository<PurchaseRequestImageAttachment>,
    @InjectRepository(PurchaseRequestLogs)
    private purchaseRequestLogsRepo: Repository<PurchaseRequestLogs>,
    @InjectRepository(PurchaseRequestLogsItemDetails)
    private purchaseRequestLogsItemDetailsRepo: Repository<PurchaseRequestLogsItemDetails>,
    @InjectRepository(PurchaseRequestLogsSOFList)
    private purchaseRequestLogsSOFListRepo: Repository<PurchaseRequestLogsSOFList>,
    @InjectRepository(PurchaseRequestLogsImageAttachment)
    private purchaseRequestLogsImageAttachmentRepo: Repository<PurchaseRequestLogsImageAttachment>,
    private connection: Connection
  ) { }

  async create(createPurchaseRequestDto: CreatePurchaseRequestDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      delete createPurchaseRequestDto["id"];
      const created = this.purchaseRequestRepo.create(createPurchaseRequestDto);
      const data = await queryRunner.manager.save(created);

      createPurchaseRequestDto.items.forEach(itemDtl => {
        delete itemDtl["id"];
        const items = this.purchaseRequestItemDetailsRepo.create(itemDtl);
        items.pr = data;
        queryRunner.manager.save(items);
      });
      
      createPurchaseRequestDto.sof.forEach(sofDtl => {
        delete sofDtl["id"];
        const detail = this.purchaseRequestSOFListRepo.create(sofDtl);
        detail.pr = data;
        queryRunner.manager.save(detail);
      });
      
      createPurchaseRequestDto?.img?.forEach(_img => {
        delete _img["id"];
        const detail = this.purchaseRequestImageAttachmentRepo.create(_img);
        detail.pr = data;
        queryRunner.manager.save(detail);
      });

      if (createPurchaseRequestDto["status"] == "CONSOLIDATED") {
        const prIds: string[] = createPurchaseRequestDto.title.split(",");
        prIds.forEach(async prId => {
          let _pr = await this.purchaseRequestRepo.findOneOrFail({ id: prId.trim() });
          _pr.status = "CLOSED";
          await this.purchaseRequestRepo.update(prId, _pr);
        });
      }

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
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.status = :status", { status: "ACTIVE" })
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findAllByMonthYear(date: Date) {
    const pp = await this.connection
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.status = :status", { status: "ACTIVE" })
    .andWhere("MONTH(pp.dateSaved) = :mon", { mon: new Date(date).getMonth() + 1 })
    .andWhere("YEAR(pp.dateSaved) = :yr", { yr: new Date(date).getFullYear() })
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findAllForConsoByMonthYear(date: Date) {
    const pp = await this.connection
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.status = :status", { status: "ACTIVE" })
    .andWhere("MONTH(pp.dateSaved) = :mon", { mon: new Date(date).getMonth() + 1 })
    .andWhere("YEAR(pp.dateSaved) = :yr", { yr: new Date(date).getFullYear() })
    .andWhere("pp.id NOT IN (SELECT prId FROM request_quotation WHERE STATUS = 'ACTIVE' UNION ALL SELECT prId FROM purchase_order WHERE STATUS = 'ACTIVE')")
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findAllByMonthYearDBM(date: Date) {
    const pp = await this.connection
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.status = :status", { status: "ACTIVE" })
    .andWhere("MONTH(pp.dateSaved) = :mon", { mon: new Date(date).getMonth() + 1 })
    .andWhere("YEAR(pp.dateSaved) = :yr", { yr: new Date(date).getFullYear() })
    .andWhere("pp.forDBM = 1")
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findAllForConsoByMonthYearDBM(date: Date) {
    const pp = await this.connection
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.status = :status", { status: "ACTIVE" })
    .andWhere("MONTH(pp.dateSaved) = :mon", { mon: new Date(date).getMonth() + 1 })
    .andWhere("YEAR(pp.dateSaved) = :yr", { yr: new Date(date).getFullYear() })
    .andWhere("pp.forDBM = 1")
    .andWhere("pp.id NOT IN (SELECT prId FROM request_quotation WHERE STATUS = 'ACTIVE' UNION ALL SELECT prId FROM purchase_order WHERE STATUS = 'ACTIVE')")
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findAllByDateRange(dateFrom: Date, dateTo: Date) {
    const pp = await this.connection
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.status = :status", { status: "ACTIVE" })
    .andWhere("pp.dateSaved between :from and :to", { from: dateFrom, to: dateTo })
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findAllForConsoByDateRange(dateFrom: Date, dateTo: Date) {
    const pp = await this.connection
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.status = :status", { status: "ACTIVE" })
    .andWhere("pp.dateSaved between :from and :to", { from: dateFrom, to: dateTo })
    .andWhere("pp.id NOT IN (SELECT prId FROM request_quotation WHERE STATUS = 'ACTIVE' UNION ALL SELECT prId FROM purchase_order WHERE STATUS = 'ACTIVE')")
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findAllByQuarter(qtr: string, year: string) {
    const pp = await this.connection
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.status = :status", { status: "ACTIVE" })
    .andWhere("pp.prQtr = :qtr", { qtr: qtr })
    .andWhere("YEAR(pp.dateSaved) = :yr", { yr: year })
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findAllForConsoByQuarter(qtr: string, year: string) {
    const pp = await this.connection
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.status = :status", { status: "ACTIVE" })
    .andWhere("pp.prQtr = :qtr", { qtr: qtr })
    .andWhere("YEAR(pp.dateSaved) = :yr", { yr: year })
    .andWhere("pp.id NOT IN (SELECT prId FROM request_quotation WHERE STATUS = 'ACTIVE' UNION ALL SELECT prId FROM purchase_order WHERE STATUS = 'ACTIVE')")
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findAllByQuarterDBM(qtr: string, year: string) {
    const pp = await this.connection
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.status = :status", { status: "ACTIVE" })
    .andWhere("pp.prQtr = :qtr", { qtr: qtr })
    .andWhere("YEAR(pp.dateSaved) = :yr", { yr: year })
    .andWhere("pp.forDBM = 1")
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findAllForConsoByQuarterDBM(qtr: string, year: string) {
    const pp = await this.connection
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.status = :status", { status: "ACTIVE" })
    .andWhere("pp.prQtr = :qtr", { qtr: qtr })
    .andWhere("YEAR(pp.dateSaved) = :yr", { yr: year })
    .andWhere("pp.forDBM = 1")
    .andWhere("pp.id NOT IN (SELECT prId FROM request_quotation WHERE STATUS = 'ACTIVE' UNION ALL SELECT prId FROM purchase_order WHERE STATUS = 'ACTIVE')")
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findAllIncludingClosedByMonthYear(date: Date) {
    const pp = await this.connection
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.status IN ('ACTIVE','CLOSED')")
    .andWhere("MONTH(pp.dateSaved) = :mon", { mon: new Date(date).getMonth() + 1 })
    .andWhere("YEAR(pp.dateSaved) = :yr", { yr: new Date(date).getFullYear() })
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findAllIncludingClosedByDateRange(dateFrom: Date, dateTo: Date) {
    const pp = await this.connection
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.status IN ('ACTIVE','CLOSED')")
    .andWhere("pp.dateSaved between :from and :to", { from: dateFrom, to: dateTo })
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findAllIncludingClosedByQuarter(qtr: string, year: string) {
    const pp = await this.connection
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.status IN ('ACTIVE','CLOSED')")
    .andWhere("pp.prQtr = :qtr", { qtr: qtr })
    .andWhere("YEAR(pp.dateSaved) = :yr", { yr: year })
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findAllConsolidated() {
    const pp = await this.connection
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.status = :status", { status: "CONSOLIDATED" })
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findAllConsolidatedByMonthYear(date: Date) {
    const pp = await this.connection
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.status = :status", { status: "CONSOLIDATED" })
    .andWhere("MONTH(pp.dateSaved) = :mon", { mon: new Date(date).getMonth() + 1 })
    .andWhere("YEAR(pp.dateSaved) = :yr", { yr: new Date(date).getFullYear() })
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findAllConsolidatedByDateRange(dateFrom: Date, dateTo: Date) {
    const pp = await this.connection
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.status = :status", { status: "CONSOLIDATED" })
    .andWhere("pp.dateSaved between :from and :to", { from: dateFrom, to: dateTo })
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findAllConsolidatedByQuarter(qtr: string, year: string) {
    const pp = await this.connection
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.status = :status", { status: "CONSOLIDATED" })
    .andWhere("pp.prQtr = :qtr", { qtr: qtr })
    .andWhere("YEAR(pp.dateSaved) = :yr", { yr: year })
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findPRLogsByPRId(_prId: string) {
    const pr = await this.connection
    .getRepository(PurchaseRequestLogs)
    .createQueryBuilder("pr")
    .leftJoinAndSelect("pr.items", "itemDetails")
    .leftJoinAndSelect("pr.sof", "sof")
    .where("pr.status = :status", { status: "ACTIVE" })
    .andWhere("pr.prId = :prId", { prId: _prId })
    .orderBy("pr.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pr;
  }

  async findAllByDepartment(_departmentId: string) {
    const pp = await this.connection
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.status = :status", { status: "ACTIVE" })
    .andWhere("pp.entryByDepartment = :dept", { dept: _departmentId })
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findAllWithIssuanceByDepartment(_departmentId: string) {
    const pp = await this.connection
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.issuanceItems", "itemDetails")
    .where("pp.status IN ('ACTIVE','CLOSED')")
    .andWhere("pp.departmentId = :dept", { dept: _departmentId })
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findAllByDepartmentMonthYear(_departmentId: string, date: Date) {
    const pp = await this.connection
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.status IN ('ACTIVE','CLOSED')")
    .andWhere("pp.entryByDepartment = :dept", { dept: _departmentId })
    .andWhere("MONTH(pp.dateSaved) = :mon", { mon: new Date(date).getMonth() + 1 })
    .andWhere("YEAR(pp.dateSaved) = :yr", { yr: new Date(date).getFullYear() })
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findAllByDepartmentByDateRange(_departmentId: string, dateFrom: Date, dateTo: Date) {
    const pp = await this.connection
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.status IN ('ACTIVE','CLOSED')")
    .andWhere("pp.entryByDepartment = :dept", { dept: _departmentId })
    .andWhere("pp.dateSaved between :from and :to", { from: dateFrom, to: dateTo })
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findAllByDepartmentByQuarter(_departmentId: string, qtr: string, year: string) {
    const pp = await this.connection
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.status IN ('ACTIVE','CLOSED')")
    .andWhere("pp.entryByDepartment = :dept", { dept: _departmentId })
    .andWhere("pp.prQtr = :qtr", { qtr: qtr })
    .andWhere("YEAR(pp.dateSaved) = :yr", { yr: year })
    .orderBy("pp.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async findOne(_id: string): Promise<PurchaseRequest> {
    const pp = await this.connection
    .getRepository(PurchaseRequest)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.id = :id", { id: _id })
    .orderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getOne();

    return pp;
  }

  async ListPrInConsolidated(_id: string) {
    const pp = await this.connection
    .getRepository(PurchaseRequestView)
    .createQueryBuilder("pp")
    .leftJoinAndSelect("pp.items", "itemDetails")
    .leftJoinAndSelect("pp.sof", "sof")
    .where("pp.prId = :id", { id: _id })
    .andWhere("itemDetails.itemId IN (SELECT itemId FROM purchase_request_item_details WHERE prId = :id)", { id: _id })
    .orderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return pp;
  }

  async getTransactionNo(): Promise<string> {
    const transNo = this.purchaseRequestRepo.query("SELECT CONCAT(YEAR(CURRENT_DATE()), '-', LPAD(COUNT(*)+1, 4, '0')) 'transactionNo' FROM purchase_request");
    return transNo;
  }

  async getTransCount(prId: string): Promise<number> {
    const transCount = this.purchaseRequestRepo.query("SELECT SUM(cnt) 'count' FROM (SELECT COUNT(*) 'cnt' FROM purchase_order WHERE prId = '" + prId + "' AND STATUS = 'ACTIVE' UNION ALL SELECT COUNT(*) 'cnt' FROM request_quotation WHERE prId = '" + prId + "' AND STATUS = 'ACTIVE') xx");
    return transCount;
  }

  async getConsolidatedTransCount(prIds: string): Promise<number> {
    const transCount = this.purchaseRequestRepo.query("SELECT COUNT(*) 'count' FROM purchase_request WHERE title = '" + prIds + "' AND STATUS = 'ACTIVE'");
    return transCount;
  }

  async getCalledOutTransCount(prIds: string): Promise<number> {
    const transCount = this.purchaseRequestRepo.query("SELECT COUNT(*) 'count' FROM purchase_request WHERE alobsNo = '" + prIds + "' AND STATUS = 'ACTIVE'");
    return transCount;
  }

  getTotalPOPerDept(deptId: string, year: string, accId: string) {
    const ret = this.purchaseRequestRepo.query("CALL sp_getTotalPOPerDept('"+ deptId +"',"+ year +","+ accId +")");
    return ret;
  }

  getTotalAmountPerAccPerDept(deptId: string, year: string, accId: string) {
    const ret = this.purchaseRequestRepo.query("CALL get_totalAmountPerAccountPerDepartment('"+ deptId +"',"+ year +","+ accId +")");
    return ret;
  }

  async getPRItemsByDeptDate(deptId: string, year: string): Promise<string> {
    const transNo = this.purchaseRequestRepo.query("SELECT pri.*, pr.prQtr FROM purchase_request_item_details pri INNER JOIN purchase_request pr ON(pr.id = pri.prId) WHERE STATUS IN ('ACTIVE','CLOSED') AND departmentId = '" + deptId + "' AND YEAR(dateSaved) = '" + year + "' ORDER BY pri.description ASC");
    return transNo;
  }

  async update(id: string, updatePurchaseRequestDto: UpdatePurchaseRequestDto) {
    let _pr = await this.purchaseRequestRepo.findOneOrFail({ id: id });
    let _items = await this.purchaseRequestItemDetailsRepo.find({ where: { pr: _pr } });
    let _sofs = await this.purchaseRequestSOFListRepo.find({ where: { pr: _pr } });

    // Save to Logs start
    let oldPR = await this.purchaseRequestRepo.findOneOrFail({ id: id });
    let oldPRItems = await this.purchaseRequestItemDetailsRepo.find({ where: { pr: oldPR } });
    let oldPRSof = await this.purchaseRequestSOFListRepo.find({ where: { pr: oldPR } });
    let oldPRImgAttachment = await this.purchaseRequestImageAttachmentRepo.find({ where: { pr: oldPR } });

    oldPR["prId"] = _pr.id;
    delete oldPR["id"];
    delete oldPR["dateSaved"];
    delete oldPR["dateUpdated"];
    const model = this.purchaseRequestLogsRepo.create(oldPR);
    const data = await this.purchaseRequestLogsRepo.save(model);
    
    oldPRItems.forEach(async item => {
      delete item["id"];
      const items = this.purchaseRequestLogsItemDetailsRepo.create(item);
      items.pr = data;
      await this.purchaseRequestLogsItemDetailsRepo.save(items);
    });

    oldPRSof.forEach(async _sof => {
      delete _sof["id"];
      const sof = this.purchaseRequestLogsSOFListRepo.create(_sof);
      sof.pr = data;
      await this.purchaseRequestLogsSOFListRepo.save(sof);
    });

    oldPRImgAttachment.forEach(async _img => {
      delete _img["id"];
      const imgAtt = this.purchaseRequestLogsImageAttachmentRepo.create(_img);
      imgAtt.pr = data;
      await this.purchaseRequestLogsImageAttachmentRepo.save(imgAtt);
    });
    // Save to Logs end

    await this.purchaseRequestItemDetailsRepo.remove(_items);
    await this.purchaseRequestSOFListRepo.remove(_sofs);

    _pr.prType = updatePurchaseRequestDto.prType;
    _pr.prNo = updatePurchaseRequestDto.prNo;
    _pr.prDate = updatePurchaseRequestDto.prDate;
    _pr.prQtr = updatePurchaseRequestDto.prQtr;
    _pr.title = updatePurchaseRequestDto.title;
    _pr.departmentId = updatePurchaseRequestDto.departmentId;
    _pr.departmentName = updatePurchaseRequestDto.departmentName;
    _pr.sectionId = updatePurchaseRequestDto.sectionId;
    _pr.sectionName = updatePurchaseRequestDto.sectionName;
    _pr.transactionNo = updatePurchaseRequestDto.transactionNo;
    _pr.transactionDate = updatePurchaseRequestDto.transactionDate;
    _pr.ppId = updatePurchaseRequestDto.ppId;
    _pr.ppNo = updatePurchaseRequestDto.ppNo;
    _pr.sourceOfFund = updatePurchaseRequestDto.sourceOfFund;
    _pr.rationale = updatePurchaseRequestDto.rationale;
    _pr.procurementMode = updatePurchaseRequestDto.procurementMode;
    _pr.requestedByName = updatePurchaseRequestDto.requestedByName;
    _pr.requestedByPosition = updatePurchaseRequestDto.requestedByPosition;
    _pr.cashAvailabilityName = updatePurchaseRequestDto.cashAvailabilityName;
    _pr.cashAvailabilityPosition = updatePurchaseRequestDto.cashAvailabilityPosition;
    _pr.approvedByName = updatePurchaseRequestDto.approvedByName;
    _pr.approvedByPosition = updatePurchaseRequestDto.approvedByPosition;

    await this.purchaseRequestRepo.update(id, _pr);
    
    updatePurchaseRequestDto.items.forEach(async item => {
      delete item["id"];
      const items = this.purchaseRequestItemDetailsRepo.create(item);
      items.pr = _pr;
      await this.purchaseRequestItemDetailsRepo.save(items);
    });

    updatePurchaseRequestDto.sof.forEach(async _sof => {
      delete _sof["id"];
      const sof = this.purchaseRequestSOFListRepo.create(_sof);
      sof.pr = _pr;
      await this.purchaseRequestSOFListRepo.save(sof);
    });

    updatePurchaseRequestDto.img?.forEach(async _img => {
      delete _img["id"];
      const img = this.purchaseRequestImageAttachmentRepo.create(_img);
      img.pr = _pr;
      await this.purchaseRequestImageAttachmentRepo.save(img);
    });

    return this.findOne(id);
  }

  async lockPR(id: string, isLocked: boolean) {
    let _pr = await this.purchaseRequestRepo.findOneOrFail({ id: id });
    _pr.isLocked = isLocked;
    await this.purchaseRequestRepo.update(id, _pr);

    return this.findOne(id);
  }

  async remove(id: string) {
    let _pr = await this.purchaseRequestRepo.findOneOrFail({ id: id });

    if (_pr.status == "CONSOLIDATED") {
      const prIds: string[] = _pr.title.split(",");
      prIds.forEach(async prId => {
        let _prx = await this.purchaseRequestRepo.findOneOrFail({ id: prId.trim() });
        _prx.status = "ACTIVE";
        await this.purchaseRequestRepo.update(prId, _prx);
      });
    }

    _pr.status = "INACTIVE";
    await this.purchaseRequestRepo.update(id, _pr);
    
    return this.findOne(id);
  }
}
