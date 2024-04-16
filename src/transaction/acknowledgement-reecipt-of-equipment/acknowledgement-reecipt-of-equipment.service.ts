/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateAcknowledgementReceiptOfEquipmentDto } from './dto/create-acknowledgement-reecipt-of-equipment.dto';
import { UpdateAcknowledgementReceiptOfEquipmentDto } from './dto/update-acknowledgement-reecipt-of-equipment.dto';
import { AcknowledgementReceiptOfEquipmentItems } from './entities/acknowledgement-reecipt-of-equipment-items.entity';
import { AcknowledgementReceiptOfEquipmentItemsView } from './entities/acknowledgement-reecipt-of-equipment-items.view.entity';
import { AcknowledgementReceiptOfEquipmentSubItems } from './entities/acknowledgement-reecipt-of-equipment-sub-items.entity';
import { AcknowledgementReceiptOfEquipment } from './entities/acknowledgement-reecipt-of-equipment.entity';

@Injectable()
export class AcknowledgementReceiptOfEquipmentService {

  constructor(
    @InjectRepository(AcknowledgementReceiptOfEquipment)
    private acknowledgementReceiptOfEquipmentRepo: Repository<AcknowledgementReceiptOfEquipment>,
    @InjectRepository(AcknowledgementReceiptOfEquipmentItems)
    private acknowledgementReceiptOfEquipmentItemDetailsRepo: Repository<AcknowledgementReceiptOfEquipmentItems>,
    @InjectRepository(AcknowledgementReceiptOfEquipmentSubItems)
    private acknowledgementReceiptOfEquipmentSubItemDetailsRepo: Repository<AcknowledgementReceiptOfEquipmentSubItems>,
    private readonly connection: Connection
  ) { }

  async create(createAcknowledgementReceiptOfEquipmentDto: CreateAcknowledgementReceiptOfEquipmentDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      delete createAcknowledgementReceiptOfEquipmentDto["id"];
      const created = this.acknowledgementReceiptOfEquipmentRepo.create(createAcknowledgementReceiptOfEquipmentDto);
      const data = await queryRunner.manager.save(created);

      createAcknowledgementReceiptOfEquipmentDto.items.forEach(async item => {
        delete item["id"];
        const items = this.acknowledgementReceiptOfEquipmentItemDetailsRepo.create(item);
        items.are = data;
        const arei = await queryRunner.manager.save(items);

        item.subItems.forEach(async subItems => {
          delete subItems["id"];
          const subItem = await this.acknowledgementReceiptOfEquipmentSubItemDetailsRepo.create(subItems);
          subItem.arei = arei;
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
    .getRepository(AcknowledgementReceiptOfEquipment)
    .createQueryBuilder("are")
    .leftJoinAndSelect("are.items", "items")
    .leftJoinAndSelect("items.subItems", "subItems")
    .where("are.status = :status", { status: "ACTIVE" })
    .orderBy("are.dateSaved", "DESC")
    .addOrderBy("items.groupName", "ASC")
    .addOrderBy("items.description", "ASC")
    .addOrderBy("items.propertyNo", "ASC")
    .getMany();

    return po;
  }

  async findAllByMonthYear(date: Date) {
    const po = await this.connection
    .getRepository(AcknowledgementReceiptOfEquipment)
    .createQueryBuilder("are")
    .leftJoinAndSelect("are.items", "items")
    .leftJoinAndSelect("items.subItems", "subItems")
    .where("are.status = :status", { status: "ACTIVE" })
    .andWhere("MONTH(are.parDate) = :mon", { mon: new Date(date).getMonth() + 1 })
    .andWhere("YEAR(are.parDate) = :yr", { yr: new Date(date).getFullYear() })
    .orderBy("are.dateSaved", "DESC")
    .addOrderBy("items.groupName", "ASC")
    .addOrderBy("items.description", "ASC")
    .addOrderBy("items.propertyNo", "ASC")
    .getMany();

    return po;
  }

  async findOne(_id: string): Promise<AcknowledgementReceiptOfEquipment> {
    const are = await this.connection
    .getRepository(AcknowledgementReceiptOfEquipment)
    .createQueryBuilder("are")
    .leftJoinAndSelect("are.items", "items")
    .leftJoinAndSelect("items.subItems", "subItems")
    .where("are.id = :id", { id: _id })
    .orderBy("items.groupName", "ASC")
    .addOrderBy("items.description", "ASC")
    .addOrderBy("items.propertyNo", "ASC")
    .getOne();

    return are;
  }

  async findAllAREItems() {
    const po = await this.connection
    .getRepository(AcknowledgementReceiptOfEquipmentItemsView)
    .createQueryBuilder("are")
    .leftJoinAndSelect("are.subItems", "subItems")
    .where("are.status = :status", { status: "ACTIVE" })
    .orderBy("are.parDate", "ASC")
    .addOrderBy("are.brand", "ASC")
    .addOrderBy("are.propertyNo", "ASC")
    .getMany();

    return po;
  }

  async findAllAREItemsByDept(_deptId) {
    const po = await this.connection
    .getRepository(AcknowledgementReceiptOfEquipmentItemsView)
    .createQueryBuilder("are")
    .leftJoinAndSelect("are.subItems", "subItems")
    .where("are.status = :status", { status: "ACTIVE" })
    .andWhere("are.departmentId = :departmentId", { departmentId: _deptId })
    .orderBy("are.parDate", "ASC")
    .addOrderBy("are.brand", "ASC")
    .addOrderBy("are.propertyNo", "ASC")
    .getMany();

    return po;
  }

  async findAllAREItemsById(_areId: string, _id: string) {
    const po = await this.connection
    .getRepository(AcknowledgementReceiptOfEquipmentItemsView)
    .createQueryBuilder("are")
    .leftJoinAndSelect("are.subItems", "subItems")
    .where("are.status = :status", { status: "ACTIVE" })
    .andWhere("are.areId = :areId", { areId: _areId })
    .andWhere("are.id = :id", { id: _id })
    .orderBy("are.brand", "ASC")
    .addOrderBy("are.propertyNo", "ASC")
    .getOne();

    return po;
  }

  async getTransactionNo(): Promise<string> {
    const transNo = this.acknowledgementReceiptOfEquipmentRepo.query("SELECT CONCAT('PAR-', YEAR(CURRENT_DATE()), '-', LPAD(MONTH(CURRENT_DATE()), 2, '0'), '-', LPAD(COUNT(*)+1, 3, '0')) 'transactionNo' FROM acknowledgement_receipt_of_equipment");
    return transNo;
  }

  async getPropertyNo(_prefix: string): Promise<string> {
    const transNo = this.acknowledgementReceiptOfEquipmentRepo.query("SELECT CONCAT(IFNULL(t.typeCode,''),'-', LPAD((IFNULL(MAX(REPLACE(propertyNo,CONCAT(IFNULL(t.typeCode,''),'-'),'')),0) + 0)+1, 6, '0')) 'propertyNo' FROM `type` t LEFT JOIN acknowledgement_receipt_of_equipment_items i ON(t.id = i.groupId AND propertyNo LIKE CONCAT(t.typeCode,'%')) WHERE t.id = '" + _prefix + "'");
    return transNo;
  }

  async update(id: string, updateAcknowledgementReceiptOfEquipmentDto: UpdateAcknowledgementReceiptOfEquipmentDto) {
    let _are = await this.acknowledgementReceiptOfEquipmentRepo.findOneOrFail({ id: id });
    let _items = await this.acknowledgementReceiptOfEquipmentItemDetailsRepo.find({ where: { are: _are } });
    const subs = _items.map(async item => {
      try {
        let _subItems = await this.acknowledgementReceiptOfEquipmentSubItemDetailsRepo.find({ where: { arei: item } });
        await this.acknowledgementReceiptOfEquipmentSubItemDetailsRepo.remove(_subItems);
      } catch(ex) {}
      await this.acknowledgementReceiptOfEquipmentItemDetailsRepo.remove(item);
    });

    await Promise.all(subs).then(async () => {
      _are.parNo = updateAcknowledgementReceiptOfEquipmentDto.parNo;
      _are.parDate = updateAcknowledgementReceiptOfEquipmentDto.parDate;
      _are.departmentId = updateAcknowledgementReceiptOfEquipmentDto.departmentId;
      _are.departmentName = updateAcknowledgementReceiptOfEquipmentDto.departmentName;
      _are.fundCluster = updateAcknowledgementReceiptOfEquipmentDto.fundCluster;
      _are.accountType = updateAcknowledgementReceiptOfEquipmentDto.accountType;
      _are.prNo = updateAcknowledgementReceiptOfEquipmentDto.prNo;
      _are.poNo = updateAcknowledgementReceiptOfEquipmentDto.poNo;
      _are.location = updateAcknowledgementReceiptOfEquipmentDto.location;
      _are.supplierName = updateAcknowledgementReceiptOfEquipmentDto.supplierName;
      _are.deliveryDate = updateAcknowledgementReceiptOfEquipmentDto.deliveryDate;
      _are.remarks = updateAcknowledgementReceiptOfEquipmentDto.remarks;
      _are.receivedById = updateAcknowledgementReceiptOfEquipmentDto.receivedById;
      _are.receivedByName = updateAcknowledgementReceiptOfEquipmentDto.receivedByName;
      _are.issuedById = updateAcknowledgementReceiptOfEquipmentDto.issuedById;
      _are.issuedByName = updateAcknowledgementReceiptOfEquipmentDto.issuedByName;

      await this.acknowledgementReceiptOfEquipmentRepo.update(id, _are);
      
      updateAcknowledgementReceiptOfEquipmentDto.items.forEach(async item => {
        delete item["id"];
        const items = await this.acknowledgementReceiptOfEquipmentItemDetailsRepo.create(item);
        items.are = _are;
        const sItem = await this.acknowledgementReceiptOfEquipmentItemDetailsRepo.save(items);

        item.subItems.forEach(async subItem => {
          delete subItem["id"];
          const subItems = await this.acknowledgementReceiptOfEquipmentSubItemDetailsRepo.create(subItem);
          subItems.arei = sItem;
          await this.acknowledgementReceiptOfEquipmentSubItemDetailsRepo.save(subItems);
        });
      });
    });
    
    return this.findOne(id);
  }

  async remove(id: string) {
    let _are = await this.acknowledgementReceiptOfEquipmentRepo.findOneOrFail({ id: id });
    _are.status = "INACTIVE";
    await this.acknowledgementReceiptOfEquipmentRepo.update(id, _are);
    
    return this.findOne(id);
  }
}
