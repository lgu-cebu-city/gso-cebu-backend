/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreatePropertyTransferDto } from './dto/create-property-transfer.dto';
import { UpdatePropertyTransferDto } from './dto/update-property-transfer.dto';
import { PropertyTransferItemBatchDetails } from './entities/poperty-transfer-item-batch-details.entity';
import { PropertyTransferItemDetails } from './entities/property-transfer-item-details.entity';
import { PropertyTransfer } from './entities/property-transfer.entity';
import { InventoryLedger } from '../inventory/entities/inventory-ledger.entiry';
import { CreateInventoryLedgerDto } from '../inventory/dto/create-inventory-ledger.dto';

@Injectable()
export class PropertyTransferService {

  constructor(
    @InjectRepository(PropertyTransfer)
    private propertyTransferRepo: Repository<PropertyTransfer>,
    @InjectRepository(PropertyTransferItemDetails)
    private propertyTransferItemDetailsRepo: Repository<PropertyTransferItemDetails>,
    @InjectRepository(PropertyTransferItemBatchDetails)
    private propertyTransferItemBatchDetailsRepo: Repository<PropertyTransferItemBatchDetails>,
    @InjectRepository(InventoryLedger)
    private inventoryLedgerRepo: Repository<InventoryLedger>,
    private readonly connection: Connection
  ) { }

  async create(createPropertyTransferDto: CreatePropertyTransferDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      delete createPropertyTransferDto["id"];
      const created = this.propertyTransferRepo.create(createPropertyTransferDto);
      const data = await queryRunner.manager.save(created);

      const refId: string = data.id;
      const refType: string = "Transfer";
      const departmentId: string = data.risId;
      const sectionId: string = "";

      createPropertyTransferDto.items.forEach(async item => {
        delete item["id"];
        const items = this.propertyTransferItemDetailsRepo.create(item);
        items.pt = data;
        const pti = await queryRunner.manager.save(items);

        const invtyItem= new CreateInventoryLedgerDto();
        invtyItem.refId = refId;
        invtyItem.refType = refType;
        invtyItem.departmentId = departmentId;
        invtyItem.sectionId = sectionId;
        invtyItem.groupId = pti.groupId;
        invtyItem.itemId = pti.itemId;
        invtyItem.brandId = pti.itemId;
        invtyItem.description = pti.description;
        invtyItem.uom = pti.uom;
        invtyItem.quantity = pti.issuedQty;
        invtyItem.price = pti.price;
        invtyItem.expirationDate = null;
        invtyItem.lotNo = pti.lotNo;
        invtyItem.remarks = pti.remarks;
        invtyItem.serialNo = "";
        invtyItem.model = "";

        const invtyItm = this.inventoryLedgerRepo.create(invtyItem);
        await queryRunner.manager.save(invtyItm);

        let subItemNo: number = 1;
        item.itemsDetails.forEach(async subItem => {
          delete subItem["id"];
          subItem["itemNo"] = subItemNo;
          const subItems = await this.propertyTransferItemBatchDetailsRepo.create(subItem);
          subItems.ptd = pti;
          await queryRunner.manager.save(subItems);
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
    const pt = await this.connection
    .getRepository(PropertyTransfer)
    .createQueryBuilder("pt")
    .leftJoinAndSelect("pt.items", "itemDetails")
    .where("pt.status = :status", { status: "ACTIVE" })
    .orderBy("pt.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .getMany();

    return pt;
  }

  async findOne(_id: string): Promise<PropertyTransfer> {
    const pt = await this.connection
    .getRepository(PropertyTransfer)
    .createQueryBuilder("pt")
    .leftJoinAndSelect("pt.items", "itemDetails")
    .where("pt.id = :id", { id: _id })
    .orderBy("itemDetails.description", "ASC")
    .getOne();

    return pt;
  }

  async getTransactionNo(): Promise<string> {
    const transNo = this.propertyTransferRepo.query("SELECT CONCAT('TWS-', YEAR(CURRENT_DATE()), '-', LPAD(MONTH(CURRENT_DATE()), 2, '0'), '-', LPAD(COUNT(*)+1, 3, '0')) 'transactionNo' FROM property_transfer");
    return transNo;
  }

  async update(id: string, updatePropertyTransferDto: UpdatePropertyTransferDto) {
    const refId: string = id;
    const refType: string = "Transfer";
    const departmentId: string = updatePropertyTransferDto.risId;
    const sectionId: string = "";
    
    let _pt = await this.propertyTransferRepo.findOneOrFail({ id: id });
    let _items = await this.propertyTransferItemDetailsRepo.find({ where: { pt: _pt } });

    const subs = _items.map(async item => {
      let _subItems = await this.propertyTransferItemBatchDetailsRepo.find({ where: { iari: item } });
      await this.propertyTransferItemBatchDetailsRepo.remove(_subItems);
      await this.propertyTransferItemDetailsRepo.remove(_items);

      let invtyItm = await this.inventoryLedgerRepo.find({ where: { refId: id, refType: "Transfer", itemId: item.itemId } });
      await this.inventoryLedgerRepo.remove(invtyItm);
    });

    await Promise.all(subs).then(async () => {
      _pt.transactionNo = updatePropertyTransferDto.transactionNo;
      _pt.transactionDate = updatePropertyTransferDto.transactionDate;
      _pt.risId = updatePropertyTransferDto.risId;
      _pt.risNo = updatePropertyTransferDto.risNo;
      _pt.accountablePersonIdFrom = updatePropertyTransferDto.accountablePersonIdFrom;
      _pt.accountablePersonNameFrom = updatePropertyTransferDto.accountablePersonNameFrom;
      _pt.accountablePersonDesignationFrom = updatePropertyTransferDto.accountablePersonDesignationFrom;
      _pt.accountablePersonIdTo = updatePropertyTransferDto.accountablePersonIdTo;
      _pt.accountablePersonNameTo = updatePropertyTransferDto.accountablePersonNameTo;
      _pt.accountablePersonDesignationTo = updatePropertyTransferDto.accountablePersonDesignationTo;
      _pt.approvePersonId = updatePropertyTransferDto.approvePersonId;
      _pt.approvePersonName = updatePropertyTransferDto.approvePersonName;
      _pt.approvePersonDesignation = updatePropertyTransferDto.approvePersonDesignation;
      _pt.releasePersonId = updatePropertyTransferDto.releasePersonId;
      _pt.releasePersonName = updatePropertyTransferDto.releasePersonName;
      _pt.releasePersonDesignation = updatePropertyTransferDto.releasePersonDesignation;
      _pt.remarks = updatePropertyTransferDto.remarks;

      await this.propertyTransferRepo.update(id, _pt);
      
      updatePropertyTransferDto.items.forEach(async item => {
        if (!item["id"]) delete item["id"];
        const items = this.propertyTransferItemDetailsRepo.create(item);
        items.pt = _pt;
        const sItem = await this.propertyTransferItemDetailsRepo.save(items);

        const invtyItem= new CreateInventoryLedgerDto();
        invtyItem.refId = refId;
        invtyItem.refType = refType;
        invtyItem.departmentId = departmentId;
        invtyItem.sectionId = sectionId;
        invtyItem.groupId = items.groupId;
        invtyItem.itemId = items.itemId;
        invtyItem.brandId = items.itemId;
        invtyItem.description = items.description;
        invtyItem.uom = items.uom;
        invtyItem.quantity = items.issuedQty;
        invtyItem.price = items.price;
        invtyItem.expirationDate = null;
        invtyItem.lotNo = items.lotNo;
        invtyItem.remarks = items.remarks;
        invtyItem.serialNo = "";
        invtyItem.model = "";

        const invtyItm = this.inventoryLedgerRepo.create(invtyItem);
        await this.inventoryLedgerRepo.save(invtyItm);

        let subItemNo: number = 1;
        item.itemsDetails.forEach(async subItem => {
          if (!subItem["id"]) delete subItem["id"];
          subItem["itemNo"] = subItemNo;
          const subItems = await this.propertyTransferItemBatchDetailsRepo.create(subItem);
          subItems.ptd = sItem;
          await this.propertyTransferItemBatchDetailsRepo.save(subItems);
          subItemNo += 1;
        });
      });
    });
    
    return this.findOne(id);
  }

  async remove(id: string) {
    let _pt = await this.propertyTransferRepo.findOneOrFail({ id: id });
    _pt.status = "INACTIVE";
    await this.propertyTransferRepo.update(id, _pt);

    // update status of inventoryledger
    let invtyItm = await this.inventoryLedgerRepo.findOneOrFail({ where: { refId: id, refType: "Transfer" } });
    invtyItm.status = 'INACTIVE';
    await this.inventoryLedgerRepo.update(id, invtyItm);
    
    return this.findOne(id);
  }
}
