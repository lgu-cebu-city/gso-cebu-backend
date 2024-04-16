/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateInspectionAndAcceptanceReportActualDto } from './dto/create-inspection-and-acceptance-report-actual.dto';
import { UpdateInspectionAndAcceptanceReportActualDto } from './dto/update-inspection-and-acceptance-report-actual.dto';
import { InspectionAndAcceptanceReportActualItems } from './entities/inspection-and-acceptance-report-actual-items.entity';
import { InspectionAndAcceptanceReportActualSubItems } from './entities/inspection-and-acceptance-report-actual-sub-items.entity';
import { InspectionAndAcceptanceReportActual } from './entities/inspection-and-acceptance-report-actual.entity';

@Injectable()
export class InspectionAndAcceptanceReportActualService {

  constructor(
    @InjectRepository(InspectionAndAcceptanceReportActual)
    private inspectionAndAcceptanceReportActualRepo: Repository<InspectionAndAcceptanceReportActual>,
    @InjectRepository(InspectionAndAcceptanceReportActualItems)
    private inspectionAndAcceptanceReportActualItemDetailsRepo: Repository<InspectionAndAcceptanceReportActualItems>,
    @InjectRepository(InspectionAndAcceptanceReportActualSubItems)
    private inspectionAndAcceptanceReportActualSubItemDetailsRepo: Repository<InspectionAndAcceptanceReportActualSubItems>,
    private readonly connection: Connection
  ) { }

  async create(createInspectionAndAcceptanceReportActualDto: CreateInspectionAndAcceptanceReportActualDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      delete createInspectionAndAcceptanceReportActualDto["id"];
      const created = this.inspectionAndAcceptanceReportActualRepo.create(createInspectionAndAcceptanceReportActualDto);
      const data = await queryRunner.manager.save(created);

      let itemNo: number = 1;
      createInspectionAndAcceptanceReportActualDto.items.forEach(async item => {
        delete item["id"];
        item["itemNo"] = itemNo;
        const items = this.inspectionAndAcceptanceReportActualItemDetailsRepo.create(item);
        items.iar = data;
        const iari = await queryRunner.manager.save(items);
        itemNo += 1;

        let subItemNo: number = 1;
        item.subItems.forEach(async subItems => {
          delete subItems["id"];
          item["itemNo"] = subItemNo;
          const subItem = await this.inspectionAndAcceptanceReportActualSubItemDetailsRepo.create(subItems);
          subItem.iari = iari;
          await queryRunner.manager.save(subItem);
          subItemNo += 1;
        })
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
    const po = await this.connection
    .getRepository(InspectionAndAcceptanceReportActual)
    .createQueryBuilder("iar")
    .leftJoinAndSelect("iar.items", "items")
    .leftJoinAndSelect("items.subItems", "subItems")
    .where("iar.status = :status", { status: "ACTIVE" })
    .orderBy("iar.dateSaved", "DESC")
    .addOrderBy("items.description")
    .addOrderBy("items.uom", "ASC")
    .addOrderBy("subItems.description")
    .addOrderBy("subItems.uom", "ASC")
    .getMany();

    return po;
  }

  async findAllByMonthYear(date: Date) {
    const po = await this.connection
    .getRepository(InspectionAndAcceptanceReportActual)
    .createQueryBuilder("iar")
    .leftJoinAndSelect("iar.items", "items")
    .leftJoinAndSelect("items.subItems", "subItems")
    .where("iar.status = :status", { status: "ACTIVE" })
    .andWhere("MONTH(iar.dateSaved) = :mon", { mon: new Date(date).getMonth() + 1 })
    .andWhere("YEAR(iar.dateSaved) = :yr", { yr: new Date(date).getFullYear() })
    .orderBy("iar.dateSaved", "DESC")
    .addOrderBy("items.description")
    .addOrderBy("items.uom", "ASC")
    .addOrderBy("subItems.description")
    .addOrderBy("subItems.uom", "ASC")
    .getMany();

    return po;
  }

  async findAllARE() {
    const po = await this.connection
    .getRepository(InspectionAndAcceptanceReportActual)
    .createQueryBuilder("iar")
    .innerJoinAndSelect("iar.itemsView", "itemsView")
    .leftJoinAndSelect("itemsView.subItems", "subItemsView")
    .where("iar.status = :status", { status: "ACTIVE" })
    .andWhere("itemsView.price > 5000")
    .andWhere("itemsView.typeId = 'a3eab656-ff94-41ea-b1d1-f39514a77427'")
    .orderBy("iar.dateSaved", "DESC")
    .addOrderBy("itemsView.description")
    .addOrderBy("itemsView.uom", "ASC")
    .addOrderBy("subItemsView.description")
    .addOrderBy("subItemsView.uom", "ASC")
    .getMany();

    return po;
  }

  async findAllICS() {
    const po = await this.connection
    .getRepository(InspectionAndAcceptanceReportActual)
    .createQueryBuilder("iar")
    .innerJoinAndSelect("iar.itemsView", "itemsView")
    .leftJoinAndSelect("itemsView.subItems", "subItemsView")
    .where("iar.status = :status", { status: "ACTIVE" })
    .andWhere("itemsView.price <= 5000")
    .andWhere("itemsView.typeId = 'a3eab656-ff94-41ea-b1d1-f39514a77427'")
    .orderBy("iar.dateSaved", "DESC")
    .addOrderBy("itemsView.description")
    .addOrderBy("itemsView.uom", "ASC")
    .addOrderBy("subItemsView.description")
    .addOrderBy("subItemsView.uom", "ASC")
    .getMany();

    return po;
  }

  async findOne(_id: string): Promise<InspectionAndAcceptanceReportActual> {
    const iar = await this.connection
    .getRepository(InspectionAndAcceptanceReportActual)
    .createQueryBuilder("iar")
    .leftJoinAndSelect("iar.items", "items")
    .leftJoinAndSelect("items.subItems", "subItems")
    .where("iar.id = :id", { id: _id })
    .orderBy("items.description")
    .addOrderBy("items.uom", "ASC")
    .addOrderBy("subItems.description")
    .addOrderBy("subItems.uom", "ASC")
    .getOne();

    return iar;
  }

  async getTransactionNo(): Promise<string> {
    const transNo = this.inspectionAndAcceptanceReportActualRepo.query("SELECT CONCAT('AIR-', YEAR(CURRENT_DATE()), '-', LPAD(MONTH(CURRENT_DATE()), 2, '0'), '-', LPAD(COUNT(*)+1, 3, '0')) 'transactionNo' FROM inspection_and_acceptance_report_actual");
    return transNo;
  }

  async update(id: string, updateInspectionAndAcceptanceReportActualDto: UpdateInspectionAndAcceptanceReportActualDto) {
    let _iar = await this.inspectionAndAcceptanceReportActualRepo.findOneOrFail({ id: id });
    let _items = await this.inspectionAndAcceptanceReportActualItemDetailsRepo.find({ where: { iar: _iar } });
    const subs = _items.map(async item => {
      let _subItems = await this.inspectionAndAcceptanceReportActualSubItemDetailsRepo.find({ where: { iari: item } });
      await this.inspectionAndAcceptanceReportActualSubItemDetailsRepo.remove(_subItems);
      await this.inspectionAndAcceptanceReportActualItemDetailsRepo.remove(item);
    });

    await Promise.all(subs).then(async () => {
      _iar.referenceNo = updateInspectionAndAcceptanceReportActualDto.referenceNo;
      _iar.referenceDate = updateInspectionAndAcceptanceReportActualDto.referenceDate;
      _iar.invoiceNo = updateInspectionAndAcceptanceReportActualDto.invoiceNo;
      _iar.invoiceDate = updateInspectionAndAcceptanceReportActualDto.invoiceDate;
      _iar.prId = updateInspectionAndAcceptanceReportActualDto.prId;
      _iar.prNo = updateInspectionAndAcceptanceReportActualDto.prNo;
      _iar.poId = updateInspectionAndAcceptanceReportActualDto.poId;
      _iar.poNo = updateInspectionAndAcceptanceReportActualDto.poNo;
      _iar.poDate = updateInspectionAndAcceptanceReportActualDto.poDate;
      _iar.departmentId = updateInspectionAndAcceptanceReportActualDto.departmentId;
      _iar.departmentName = updateInspectionAndAcceptanceReportActualDto.departmentName;
      _iar.supplierId = updateInspectionAndAcceptanceReportActualDto.supplierId;
      _iar.supplierName = updateInspectionAndAcceptanceReportActualDto.supplierName;
      _iar.supplierAddress = updateInspectionAndAcceptanceReportActualDto.supplierAddress;
      _iar.purpose = updateInspectionAndAcceptanceReportActualDto.purpose;
      _iar.supplyPropCust = updateInspectionAndAcceptanceReportActualDto.supplyPropCust;
      _iar.receivedBy = updateInspectionAndAcceptanceReportActualDto.receivedBy;
      _iar.receivedByPosition = updateInspectionAndAcceptanceReportActualDto.receivedByPosition;
      _iar.cto = updateInspectionAndAcceptanceReportActualDto.cto;
      _iar.cao = updateInspectionAndAcceptanceReportActualDto.cao;
      _iar.cmo = updateInspectionAndAcceptanceReportActualDto.cmo;
      _iar.it = updateInspectionAndAcceptanceReportActualDto.it;

      await this.inspectionAndAcceptanceReportActualRepo.update(id, _iar);
      
      let itemNo: number = 1;
      updateInspectionAndAcceptanceReportActualDto.items.forEach(async item => {
        if (!item["id"]) delete item["id"];
        item["itemNo"] = itemNo;
        const items = await this.inspectionAndAcceptanceReportActualItemDetailsRepo.create(item);
        items.iar = _iar;
        const sItem = await this.inspectionAndAcceptanceReportActualItemDetailsRepo.save(items);
        itemNo += 1;

        let subItemNo: number = 1;
        item.subItems.forEach(async subItem => {
          if (!subItem["id"]) delete subItem["id"];
          subItem["itemNo"] = subItemNo;
          const subItems = await this.inspectionAndAcceptanceReportActualSubItemDetailsRepo.create(subItem);
          subItems.iari = sItem;
          await this.inspectionAndAcceptanceReportActualSubItemDetailsRepo.save(subItems);
          subItemNo += 1;
        });
      });
    });
    
    return this.findOne(id);
  }

  async remove(id: string) {
    let _iar = await this.inspectionAndAcceptanceReportActualRepo.findOneOrFail({ id: id });
    _iar.status = "INACTIVE";
    await this.inspectionAndAcceptanceReportActualRepo.update(id, _iar);
    
    return this.findOne(id);
  }
}
