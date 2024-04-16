/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateInventoryCustodianSlipDto } from './dto/create-inventory-custodian-slip.dto';
import { UpdateInventoryCustodianSlipDto } from './dto/update-inventory-custodian-slip.dto';
import { InventoryCustodianSlipItems } from './entities/inventory-custodian-slip-items.entity';
import { InventoryCustodianSlipSubItems } from './entities/inventory-custodian-slip-sub-items.entity';
import { InventoryCustodianSlip } from './entities/inventory-custodian-slip.entity';

@Injectable()
export class InventoryCustodianSlipService {

  constructor(
    @InjectRepository(InventoryCustodianSlip)
    private inventoryCustodianSlipRepo: Repository<InventoryCustodianSlip>,
    @InjectRepository(InventoryCustodianSlipItems)
    private inventoryCustodianSlipItemDetailsRepo: Repository<InventoryCustodianSlipItems>,
    @InjectRepository(InventoryCustodianSlipSubItems)
    private inventoryCustodianSlipSubItemDetailsRepo: Repository<InventoryCustodianSlipSubItems>,
    private readonly connection: Connection
  ) { }

  async create(createInventoryCustodianSlipDto: CreateInventoryCustodianSlipDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      delete createInventoryCustodianSlipDto["id"];
      const created = this.inventoryCustodianSlipRepo.create(createInventoryCustodianSlipDto);
      const data = await queryRunner.manager.save(created);

      createInventoryCustodianSlipDto.items.forEach(async item => {
        delete item["id"];
        const items = this.inventoryCustodianSlipItemDetailsRepo.create(item);
        items.ics = data;
        const icsi = await queryRunner.manager.save(items);

        item.subItems.forEach(async subItems => {
          delete subItems["id"];
          const subItem = await this.inventoryCustodianSlipSubItemDetailsRepo.create(subItems);
          subItem.icsi = icsi;
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
    .getRepository(InventoryCustodianSlip)
    .createQueryBuilder("ics")
    .leftJoinAndSelect("ics.items", "items")
    .leftJoinAndSelect("items.subItems", "subItems")
    .where("ics.status = :status", { status: "ACTIVE" })
    .orderBy("ics.dateSaved", "DESC")
    .addOrderBy("items.groupName", "ASC")
    .addOrderBy("items.description", "ASC")
    .addOrderBy("items.propertyNo", "ASC")
    .getMany();

    return po;
  }

  async findAllByMonthYear(date: Date) {
    const po = await this.connection
    .getRepository(InventoryCustodianSlip)
    .createQueryBuilder("ics")
    .leftJoinAndSelect("ics.items", "items")
    .leftJoinAndSelect("items.subItems", "subItems")
    .where("ics.status = :status", { status: "ACTIVE" })
    .andWhere("MONTH(ics.icsDate) = :mon", { mon: new Date(date).getMonth() + 1 })
    .andWhere("YEAR(ics.icsDate) = :yr", { yr: new Date(date).getFullYear() })
    .orderBy("ics.dateSaved", "DESC")
    .addOrderBy("items.groupName", "ASC")
    .addOrderBy("items.description", "ASC")
    .addOrderBy("items.propertyNo", "ASC")
    .getMany();

    return po;
  }

  async findOne(_id: string): Promise<InventoryCustodianSlip> {
    const ics = await this.connection
    .getRepository(InventoryCustodianSlip)
    .createQueryBuilder("ics")
    .leftJoinAndSelect("ics.items", "items")
    .leftJoinAndSelect("items.subItems", "subItems")
    .where("ics.id = :id", { id: _id })
    .orderBy("items.groupName", "ASC")
    .addOrderBy("items.description", "ASC")
    .addOrderBy("items.propertyNo", "ASC")
    .getOne();

    return ics;
  }

  async getTransactionNo(): Promise<string> {
    const transNo = this.inventoryCustodianSlipRepo.query("SELECT CONCAT('ICS-', YEAR(CURRENT_DATE()), '-', LPAD(MONTH(CURRENT_DATE()), 2, '0'), '-', LPAD(COUNT(*)+1, 3, '0')) 'transactionNo' FROM inventory_custodian_slip");
    return transNo;
  }

  async getPropertyNo(_prefix: string): Promise<string> {
    const transNo = this.inventoryCustodianSlipRepo.query("SELECT CONCAT(IFNULL(t.typeCode,''),'-', LPAD((IFNULL(MAX(REPLACE(propertyNo,CONCAT(IFNULL(t.typeCode,''),'-'),'')),0) + 0)+1, 6, '0')) 'propertyNo' FROM `type` t LEFT JOIN inventory_custodian_slip_items i ON(t.id = i.groupId AND propertyNo LIKE CONCAT(t.typeCode,'%')) WHERE t.id = '" + _prefix + "'");
    return transNo;
  }

  async update(id: string, updateInventoryCustodianSlipDto: UpdateInventoryCustodianSlipDto) {
    let _ics = await this.inventoryCustodianSlipRepo.findOneOrFail({ id: id });
    let _items = await this.inventoryCustodianSlipItemDetailsRepo.find({ where: { ics: _ics } });
    const subs = _items.map(async item => {
      let _subItems = await this.inventoryCustodianSlipSubItemDetailsRepo.find({ where: { icsi: item } });
      await this.inventoryCustodianSlipSubItemDetailsRepo.remove(_subItems);
      await this.inventoryCustodianSlipItemDetailsRepo.remove(item);
    });

    await Promise.all(subs).then(async () => {
      _ics.icsNo = updateInventoryCustodianSlipDto.icsNo;
      _ics.icsDate = updateInventoryCustodianSlipDto.icsDate;
      _ics.departmentId = updateInventoryCustodianSlipDto.departmentId;
      _ics.departmentName = updateInventoryCustodianSlipDto.departmentName;
      _ics.fundCluster = updateInventoryCustodianSlipDto.fundCluster;
      _ics.accountType = updateInventoryCustodianSlipDto.accountType;
      _ics.prNo = updateInventoryCustodianSlipDto.prNo;
      _ics.poNo = updateInventoryCustodianSlipDto.poNo;
      _ics.location = updateInventoryCustodianSlipDto.location;
      _ics.supplierName = updateInventoryCustodianSlipDto.supplierName;
      _ics.deliveryDate = updateInventoryCustodianSlipDto.deliveryDate;
      _ics.remarks = updateInventoryCustodianSlipDto.remarks;
      _ics.receivedFromId = updateInventoryCustodianSlipDto.receivedFromId;
      _ics.receivedFromName = updateInventoryCustodianSlipDto.receivedFromName;
      _ics.receivedById = updateInventoryCustodianSlipDto.receivedById;
      _ics.receivedByName = updateInventoryCustodianSlipDto.receivedByName;

      await this.inventoryCustodianSlipRepo.update(id, _ics);
      
      updateInventoryCustodianSlipDto.items.forEach(async item => {
        delete item["id"];
        const items = await this.inventoryCustodianSlipItemDetailsRepo.create(item);
        items.ics = _ics;
        const sItem = await this.inventoryCustodianSlipItemDetailsRepo.save(items);

        item.subItems.forEach(async subItem => {
          delete subItem["id"];
          const subItems = await this.inventoryCustodianSlipSubItemDetailsRepo.create(subItem);
          subItems.icsi = sItem;
          await this.inventoryCustodianSlipSubItemDetailsRepo.save(subItems);
        });
      });
    });
    
    return this.findOne(id);
  }

  async remove(id: string) {
    let _ics = await this.inventoryCustodianSlipRepo.findOneOrFail({ id: id });
    _ics.status = "INACTIVE";
    await this.inventoryCustodianSlipRepo.update(id, _ics);
    
    return this.findOne(id);
  }
}
