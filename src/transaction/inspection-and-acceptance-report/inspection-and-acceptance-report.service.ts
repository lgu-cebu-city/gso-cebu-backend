/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateInventoryLedgerDto } from '../inventory/dto/create-inventory-ledger.dto';
import { InventoryLedger } from '../inventory/entities/inventory-ledger.entiry';
import { CreateInspectionAndAcceptanceReportDto } from './dto/create-inspection-and-acceptance-report.dto';
import { UpdateInspectionAndAcceptanceReportDto } from './dto/update-inspection-and-acceptance-report.dto';
import { InspectionAndAcceptanceReportItems } from './entities/inspection-and-acceptance-report-items.entity';
import { InspectionAndAcceptanceReportSubItems } from './entities/inspection-and-acceptance-report-sub-items.entity';
import { InspectionAndAcceptanceReport } from './entities/inspection-and-acceptance-report.entity';
import { InventoryLedgerSubItems } from '../inventory/entities/inventory-ledger-sub-items.entity';
import { CreateInventoryLedgerSubItemsDto } from '../inventory/dto/create-inventory-ledger-sub-items.dto';

@Injectable()
export class InspectionAndAcceptanceReportService {

  constructor(
    @InjectRepository(InspectionAndAcceptanceReport)
    private inspectionAndAcceptanceReportRepo: Repository<InspectionAndAcceptanceReport>,
    @InjectRepository(InspectionAndAcceptanceReportItems)
    private inspectionAndAcceptanceReportItemDetailsRepo: Repository<InspectionAndAcceptanceReportItems>,
    @InjectRepository(InspectionAndAcceptanceReportSubItems)
    private inspectionAndAcceptanceReportSubItemDetailsRepo: Repository<InspectionAndAcceptanceReportSubItems>,
    @InjectRepository(InventoryLedger)
    private inventoryLedgerRepo: Repository<InventoryLedger>,
    @InjectRepository(InventoryLedgerSubItems)
    private inventoryLedgerSubItemsRepo: Repository<InventoryLedgerSubItems>,
    private readonly connection: Connection
  ) { }

  async create(createInspectionAndAcceptanceReportDto: CreateInspectionAndAcceptanceReportDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      delete createInspectionAndAcceptanceReportDto["id"];
      const created = this.inspectionAndAcceptanceReportRepo.create(createInspectionAndAcceptanceReportDto);
      const data = await queryRunner.manager.save(created);

      const refId: string = data.id;
      const refType: string = "Receive";
      const departmentId: string = data.departmentId;
      const sectionId: string = "";

      createInspectionAndAcceptanceReportDto.items.forEach(async item => {
        delete item["id"];
        const items = this.inspectionAndAcceptanceReportItemDetailsRepo.create(item);
        items.iar = data;
        const iari = await queryRunner.manager.save(items);

        if (item.detailedItem.length > 0) {
          item.detailedItem.forEach(async (_dtlItem) => {
            const invtyItem = new CreateInventoryLedgerDto();
            invtyItem.refId = refId;
            invtyItem.refType = refType;
            invtyItem.departmentId = departmentId;
            invtyItem.sectionId = sectionId;
            invtyItem.groupId = iari.groupId;
            invtyItem.itemId = iari.itemId;
            invtyItem.brandId = _dtlItem.brand;
            invtyItem.description = iari.description;
            invtyItem.uom = iari.uom;
            invtyItem.quantity = 1;
            invtyItem.price = iari.price;
            invtyItem.expirationDate = iari.expirationDate;
            invtyItem.lotNo = iari.lotNo;
            invtyItem.remarks = _dtlItem.propCode;
            invtyItem.serialNo = _dtlItem.serial;
            invtyItem.model = _dtlItem.model;

            const invtyItm = this.inventoryLedgerRepo.create(invtyItem);
            const il = await queryRunner.manager.save(invtyItm);

            _dtlItem.subItems.forEach(async (_dtlSubItem) => {
              const invtySubItem = new CreateInventoryLedgerSubItemsDto();
              invtySubItem.refId = iari.id;
              invtySubItem.itemId = _dtlSubItem.itemId;
              invtySubItem.description = _dtlSubItem.description;
              invtySubItem.uom = _dtlSubItem.uom;
              invtySubItem.quantity = _dtlSubItem.quantity;
              invtySubItem.serialNo = _dtlSubItem.serialNo;
              invtySubItem.model = _dtlSubItem.model;
              invtySubItem.itemNo = "";
              invtySubItem.remarks = "";

              const dtlItems = this.inventoryLedgerSubItemsRepo.create(invtySubItem);
              dtlItems.il = il;
              await queryRunner.manager.save(dtlItems);
            })
          });
        } else {
          const invtyItem = new CreateInventoryLedgerDto();
          invtyItem.refId = refId;
          invtyItem.refType = refType;
          invtyItem.departmentId = departmentId;
          invtyItem.sectionId = sectionId;
          invtyItem.groupId = iari.groupId;
          invtyItem.itemId = iari.itemId;
          invtyItem.brandId = items.brandId;
          invtyItem.description = iari.description;
          invtyItem.uom = iari.uom;
          invtyItem.quantity = iari.receivedQuantity;
          invtyItem.price = iari.price;
          invtyItem.expirationDate = iari.expirationDate;
          invtyItem.lotNo = iari.lotNo;
          invtyItem.remarks = iari.remarks;
          invtyItem.serialNo = iari.serialNo;
          invtyItem.model = iari.model;

          const invtyItm = this.inventoryLedgerRepo.create(invtyItem);
          await queryRunner.manager.save(invtyItm);
        }

        item.subItems.forEach(async subItems => {
          delete subItems["id"];
          subItems["itemNo"] = "";
          const subItem = await this.inspectionAndAcceptanceReportSubItemDetailsRepo.create(subItems);
          subItem.iari = iari;
          await queryRunner.manager.save(subItem);
        });
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
    .getRepository(InspectionAndAcceptanceReport)
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
    .getRepository(InspectionAndAcceptanceReport)
    .createQueryBuilder("iar")
    .leftJoinAndSelect("iar.items", "items")
    .leftJoinAndSelect("items.subItems", "subItems")
    .leftJoinAndSelect("iar.detailedItem", "detailedItem")
    .leftJoinAndSelect("detailedItem.subItems", "detailedItemSubItems")
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
    .getRepository(InspectionAndAcceptanceReport)
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
    .getRepository(InspectionAndAcceptanceReport)
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

  async findOne(_id: string): Promise<InspectionAndAcceptanceReport> {
    const iar = await this.connection
    .getRepository(InspectionAndAcceptanceReport)
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
    const transNo = this.inspectionAndAcceptanceReportRepo.query("SELECT CONCAT('AIR-', YEAR(CURRENT_DATE()), '-', LPAD(MONTH(CURRENT_DATE()), 2, '0'), '-', LPAD(COUNT(*)+1, 3, '0')) 'transactionNo' FROM inspection_and_acceptance_report");
    return transNo;
  }

  async update(id: string, updateInspectionAndAcceptanceReportDto: UpdateInspectionAndAcceptanceReportDto) {
    const refId: string = id;
    const refType: string = "Receive";
    const departmentId: string = updateInspectionAndAcceptanceReportDto.departmentId;
    const sectionId: string = "";

    let _iar = await this.inspectionAndAcceptanceReportRepo.findOneOrFail({ id: id });
    let _items = await this.inspectionAndAcceptanceReportItemDetailsRepo.find({ where: { iar: _iar } });
    const subs = _items.map(async item => {
      let _subItems = await this.inspectionAndAcceptanceReportSubItemDetailsRepo.find({ where: { iari: item } });
      await this.inspectionAndAcceptanceReportSubItemDetailsRepo.remove(_subItems);
      await this.inspectionAndAcceptanceReportItemDetailsRepo.remove(item);

      let invtyItm = await this.inventoryLedgerRepo.find({ where: { refId: id, refType: "Receive", itemId: item.itemId } });
      await this.inventoryLedgerRepo.remove(invtyItm);
    });

    await Promise.all(subs).then(async () => {
      _iar.referenceNo = updateInspectionAndAcceptanceReportDto.referenceNo;
      _iar.referenceDate = updateInspectionAndAcceptanceReportDto.referenceDate;
      _iar.invoiceNo = updateInspectionAndAcceptanceReportDto.invoiceNo;
      _iar.invoiceDate = updateInspectionAndAcceptanceReportDto.invoiceDate;
      _iar.prId = updateInspectionAndAcceptanceReportDto.prId;
      _iar.prNo = updateInspectionAndAcceptanceReportDto.prNo;
      _iar.poId = updateInspectionAndAcceptanceReportDto.poId;
      _iar.poNo = updateInspectionAndAcceptanceReportDto.poNo;
      _iar.poDate = updateInspectionAndAcceptanceReportDto.poDate;
      _iar.departmentId = updateInspectionAndAcceptanceReportDto.departmentId;
      _iar.departmentName = updateInspectionAndAcceptanceReportDto.departmentName;
      _iar.supplierId = updateInspectionAndAcceptanceReportDto.supplierId;
      _iar.supplierName = updateInspectionAndAcceptanceReportDto.supplierName;
      _iar.supplierAddress = updateInspectionAndAcceptanceReportDto.supplierAddress;
      _iar.purpose = updateInspectionAndAcceptanceReportDto.purpose;
      _iar.supplyPropCust = updateInspectionAndAcceptanceReportDto.supplyPropCust;
      _iar.receivedBy = updateInspectionAndAcceptanceReportDto.receivedBy;
      _iar.receivedByPosition = updateInspectionAndAcceptanceReportDto.receivedByPosition;
      _iar.cto = updateInspectionAndAcceptanceReportDto.cto;
      _iar.cao = updateInspectionAndAcceptanceReportDto.cao;
      _iar.cmo = updateInspectionAndAcceptanceReportDto.cmo;
      _iar.it = updateInspectionAndAcceptanceReportDto.it;

      await this.inspectionAndAcceptanceReportRepo.update(id, _iar);
      
      updateInspectionAndAcceptanceReportDto.items.forEach(async item => {
        if (!item["id"]) delete item["id"];
        const items = await this.inspectionAndAcceptanceReportItemDetailsRepo.create(item);
        items.iar = _iar;
        const sItem = await this.inspectionAndAcceptanceReportItemDetailsRepo.save(items);

        const invtyItem= new CreateInventoryLedgerDto();
        invtyItem.refId = refId;
        invtyItem.refType = refType;
        invtyItem.departmentId = departmentId;
        invtyItem.sectionId = sectionId;
        invtyItem.groupId = items.groupId;
        invtyItem.itemId = items.itemId;
        invtyItem.brandId = items.brandId;
        invtyItem.description = items.description;
        invtyItem.uom = items.uom;
        invtyItem.quantity = items.receivedQuantity;
        invtyItem.price = items.price;
        invtyItem.expirationDate = items.expirationDate;
        invtyItem.lotNo = items.lotNo;
        invtyItem.remarks = items.remarks;
        invtyItem.serialNo = items.serialNo;
        invtyItem.model = items.model;

        const invtyItm = this.inventoryLedgerRepo.create(invtyItem);
        await this.inventoryLedgerRepo.save(invtyItm);

        item.subItems.forEach(async subItem => {
          if (!subItem["id"]) delete subItem["id"];
          const subItems = await this.inspectionAndAcceptanceReportSubItemDetailsRepo.create(subItem);
          subItems.iari = sItem;
          await this.inspectionAndAcceptanceReportSubItemDetailsRepo.save(subItems);
        });
      });
    });
    
    return this.findOne(id);
  }

  async remove(id: string) {
    let _iar = await this.inspectionAndAcceptanceReportRepo.findOneOrFail({ id: id });
    _iar.status = "INACTIVE";
    await this.inspectionAndAcceptanceReportRepo.update(id, _iar);

    // update status of inventoryledger
    let invtyItm = await this.inventoryLedgerRepo.findOneOrFail({ where: { refId: id, refType: "Receive" } });
    invtyItm.status = 'INACTIVE';
    await this.inventoryLedgerRepo.update(id, invtyItm);
    
    return this.findOne(id);
  }
}
