/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateInventoryLedgerDto } from '../inventory/dto/create-inventory-ledger.dto';
import { InventoryLedger } from '../inventory/entities/inventory-ledger.entiry';
import { CreateBarangayIssuanceDto } from './dto/create-barangay-issuance.dto';
import { UpdateBarangayIssuanceDto } from './dto/update-barangay-issuance.dto';
import { BarangayIssuanceItemBatchDetails } from './entities/barangay-issuance-item-batch-details.entity';
import { BarangayIssuanceItemDetails } from './entities/barangay-issuance-item-details.entity';
import { BarangayIssuance } from './entities/barangay-issuance.entity';

@Injectable()
export class BarangayIssuanceService {

  constructor(
    @InjectRepository(BarangayIssuance)
    private barangayIssuanceRepo: Repository<BarangayIssuance>,
    @InjectRepository(BarangayIssuanceItemDetails)
    private barangayIssuanceItemDetailsRepo: Repository<BarangayIssuanceItemDetails>,
    @InjectRepository(BarangayIssuanceItemBatchDetails)
    private barangayIssuanceItemBatchDetailsRepo: Repository<BarangayIssuanceItemBatchDetails>,
    @InjectRepository(InventoryLedger)
    private inventoryLedgerRepo: Repository<InventoryLedger>,
    private readonly connection: Connection
  ) { }

  async create(createBarangayIssuanceDto: CreateBarangayIssuanceDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      delete createBarangayIssuanceDto["id"];
      const created = this.barangayIssuanceRepo.create(createBarangayIssuanceDto);
      const data = await queryRunner.manager.save(created);

      const refId: string = data.id;
      const refType: string = "Barangay Issuance";
      const departmentId: string = data.accountablePersonIdTo;
      const sectionId: string = "";

      createBarangayIssuanceDto.items.forEach(async item => {
        delete item["id"];
        const items = this.barangayIssuanceItemDetailsRepo.create(item);
        items.bri = data;
        const brii = await queryRunner.manager.save(items);

        let subItemNo = 1;
        item.itemsDetails.forEach(async subItem => {
          delete subItem["id"];
          subItem["itemNo"] = subItemNo;
          const subItems = await this.barangayIssuanceItemBatchDetailsRepo.create(subItem);
          subItems.brid = brii;
          await this.barangayIssuanceItemBatchDetailsRepo.save(subItems);
          subItemNo += 1;

          const invtyItem= new CreateInventoryLedgerDto();
          invtyItem.refId = refId;
          invtyItem.refType = refType;
          invtyItem.departmentId = departmentId;
          invtyItem.sectionId = sectionId;
          invtyItem.groupId = item.groupId;
          invtyItem.itemId = item.genericId;
          invtyItem.brandId = item.itemId;
          invtyItem.description = item.description;
          invtyItem.uom = item.uom;
          invtyItem.quantity = subItem.quantity;
          invtyItem.price = item.price;
          invtyItem.expirationDate = subItem.expirationDate;
          invtyItem.lotNo = subItem.batchNo;
          invtyItem.remarks = subItem.remarks;
          invtyItem.serialNo = "";
          invtyItem.model = "";
  
          const invtyItm = this.inventoryLedgerRepo.create(invtyItem);
          await this.inventoryLedgerRepo.save(invtyItm);
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
    const bri = await this.connection
    .getRepository(BarangayIssuance)
    .createQueryBuilder("bri")
    .leftJoinAndSelect("bri.items", "items")
    .leftJoinAndSelect("items.itemsDetails", "itemsDetails")
    .where("bri.status = :status", { status: "ACTIVE" })
    .orderBy("bri.dateSaved", "DESC")
    .getMany();

    return bri;
  }

  async findAllByDepartment(_departmentId: string) {
    const bri = await this.connection
    .getRepository(BarangayIssuance)
    .createQueryBuilder("bri")
    .leftJoinAndSelect("bri.items", "items")
    .leftJoinAndSelect("items.itemsDetails", "itemsDetails")
    .where("bri.status = :status", { status: "ACTIVE" })
    .andWhere("bri.entryByDepartment = :dept", { dept: _departmentId })
    .orderBy("bri.dateSaved", "DESC")
    .getMany();

    return bri;
  }

  async findOne(_id: string): Promise<BarangayIssuance> {
    const bri = await this.connection
    .getRepository(BarangayIssuance)
    .createQueryBuilder("bri")
    .leftJoinAndSelect("bri.items", "items")
    .leftJoinAndSelect("items.itemsDetails", "itemsDetails")
    .where("bri.id = :id", { id: _id })
    .getOne();

    return bri;
  }

  async getTransactionNo(): Promise<string> {
    const transNo = this.barangayIssuanceRepo.query("SELECT CONCAT('BRI-', YEAR(CURRENT_DATE()), '-', LPAD(MONTH(CURRENT_DATE()), 2, '0'), '-', LPAD(COUNT(*)+1, 3, '0')) 'transactionNo' FROM barangay_issuance");
    return transNo;
  }

  async update(id: string, updateBarangayIssuanceDto: UpdateBarangayIssuanceDto) {
    const refId: string = id;
    const refType: string = "Barangay Issuance";
    const departmentId: string = updateBarangayIssuanceDto.accountablePersonIdTo;
    const sectionId: string = "";

    const _bri = await this.barangayIssuanceRepo.findOneOrFail({ id: id });
    const _items = await this.barangayIssuanceItemDetailsRepo.find({ where: { bri: _bri } });

    const subs = _items.map(async item => {
      const _subItems = await this.barangayIssuanceItemBatchDetailsRepo.find({ where: { iari: item } });
      await this.barangayIssuanceItemBatchDetailsRepo.remove(_subItems);
      await this.barangayIssuanceItemDetailsRepo.remove(_items);

      const invtyItm = await this.inventoryLedgerRepo.find({ where: { refId: id, refType: "Barangay Issuance", itemId: item.genericId } });
      await this.inventoryLedgerRepo.remove(invtyItm);
    });

    await Promise.all(subs).then(async () => {
      _bri.transactionNo = updateBarangayIssuanceDto.transactionNo;
      _bri.transactionDate = updateBarangayIssuanceDto.transactionDate;
      _bri.accountablePersonIdFrom = updateBarangayIssuanceDto.accountablePersonIdFrom;
      _bri.accountablePersonNameFrom = updateBarangayIssuanceDto.accountablePersonNameFrom;
      _bri.accountablePersonDesignationFrom = updateBarangayIssuanceDto.accountablePersonDesignationFrom;
      _bri.accountablePersonIdTo = updateBarangayIssuanceDto.accountablePersonIdTo;
      _bri.accountablePersonNameTo = updateBarangayIssuanceDto.accountablePersonNameTo;
      _bri.accountablePersonDesignationTo = updateBarangayIssuanceDto.accountablePersonDesignationTo;
      _bri.approvePersonId = updateBarangayIssuanceDto.approvePersonId;
      _bri.approvePersonName = updateBarangayIssuanceDto.approvePersonName;
      _bri.approvePersonDesignation = updateBarangayIssuanceDto.approvePersonDesignation;
      _bri.releasePersonId = updateBarangayIssuanceDto.releasePersonId;
      _bri.releasePersonName = updateBarangayIssuanceDto.releasePersonName;
      _bri.releasePersonDesignation = updateBarangayIssuanceDto.releasePersonDesignation;
      _bri.remarks = updateBarangayIssuanceDto.remarks;

      await this.barangayIssuanceRepo.update(id, _bri);
      
      updateBarangayIssuanceDto.items.forEach(async item => {
        if (!item["id"]) delete item["id"];
        const items = this.barangayIssuanceItemDetailsRepo.create(item);
        items.bri = _bri;
        const brii = await this.barangayIssuanceItemDetailsRepo.save(items);

        item.itemsDetails.forEach(async subItem => {
          if (!subItem["id"]) delete subItem["id"];
          const subItems = await this.barangayIssuanceItemBatchDetailsRepo.create(subItem);
          subItems.brid = brii;
          await this.barangayIssuanceItemBatchDetailsRepo.save(subItems);

          const invtyItem= new CreateInventoryLedgerDto();
          invtyItem.refId = refId;
          invtyItem.refType = refType;
          invtyItem.departmentId = departmentId;
          invtyItem.sectionId = sectionId;
          invtyItem.groupId = item.groupId;
          invtyItem.itemId = item.genericId;
          invtyItem.brandId = item.itemId;
          invtyItem.description = item.description;
          invtyItem.uom = item.uom;
          invtyItem.quantity = subItem.quantity;
          invtyItem.price = item.price;
          invtyItem.expirationDate = subItem.expirationDate;
          invtyItem.lotNo = subItem.batchNo;
          invtyItem.remarks = subItem.remarks;
          invtyItem.serialNo = "";
          invtyItem.model = "";
  
          const invtyItm = this.inventoryLedgerRepo.create(invtyItem);
          await this.inventoryLedgerRepo.save(invtyItm);
        });
      });
    });
    
    return this.findOne(id);
  }

  async remove(id: string) {
    const _bri = await this.barangayIssuanceRepo.findOneOrFail({ id: id });
    _bri.status = "INACTIVE";
    await this.barangayIssuanceRepo.update(id, _bri);
    
    return this.findOne(id);
  }
}
