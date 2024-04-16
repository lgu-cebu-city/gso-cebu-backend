/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateInventoryLedgerDto } from '../inventory/dto/create-inventory-ledger.dto';
import { InventoryLedger } from '../inventory/entities/inventory-ledger.entiry';
import { CreateRequisitionIssuanceSlipDto } from './dto/create-requisition-issuance-slip.dto';
import { UpdateRequisitionIssuanceSlipDto } from './dto/update-requisition-issuance-slip.dto';
import { RequisitionIssuanceSlipItemBatchDetails } from './entities/requisition-issuance-slip-item-batch-details.entity';
import { RequisitionIssuanceSlipItemDetails } from './entities/requisition-issuance-slip-item-details.entity';
import { RequisitionIssuanceSlip } from './entities/requisition-issuance-slip.entity';

@Injectable()
export class RequisitionIssuanceSlipService {

  constructor(
    @InjectRepository(RequisitionIssuanceSlip)
    private requisitionIssuanceSlipRepo: Repository<RequisitionIssuanceSlip>,
    @InjectRepository(RequisitionIssuanceSlipItemDetails)
    private requisitionIssuanceSlipItemDetailsRepo: Repository<RequisitionIssuanceSlipItemDetails>,
    @InjectRepository(RequisitionIssuanceSlipItemBatchDetails)
    private requisitionIssuanceSlipItemBatchDetailsRepo: Repository<RequisitionIssuanceSlipItemBatchDetails>,
    @InjectRepository(InventoryLedger)
    private inventoryLedgerRepo: Repository<InventoryLedger>,
    private readonly connection: Connection
  ) { }

  async create(createRequisitionIssuanceSlipDto: CreateRequisitionIssuanceSlipDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      delete createRequisitionIssuanceSlipDto["id"];
      const created = this.requisitionIssuanceSlipRepo.create(createRequisitionIssuanceSlipDto);
      const data = await queryRunner.manager.save(created);

      createRequisitionIssuanceSlipDto.items.forEach(async item => {
        delete item["id"];
        const items = this.requisitionIssuanceSlipItemDetailsRepo.create(item);
        items.ris = data;
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
  
  async updateForIssuance(id: string, updateRequisitionIssuanceSlipDto: UpdateRequisitionIssuanceSlipDto) {
    const refId: string = id;
    const refType: string = "Issue";
    const departmentId: string = updateRequisitionIssuanceSlipDto.departmentId;
    const sectionId: string = "";

    let _ris = await this.requisitionIssuanceSlipRepo.findOneOrFail({ id: id });
    let _items = await this.requisitionIssuanceSlipItemDetailsRepo.find({ where: { ris: _ris } });
    const subs = _items.map(async item => {
      let _subItems = await this.requisitionIssuanceSlipItemBatchDetailsRepo.find({ where: { risd: item } });
      await this.requisitionIssuanceSlipItemBatchDetailsRepo.remove(_subItems);
      await this.requisitionIssuanceSlipItemDetailsRepo.remove(item);

      let invtyItm = await this.inventoryLedgerRepo.find({ where: { refId: id, refType: "Issue", itemId: item.genericId } });
      await this.inventoryLedgerRepo.remove(invtyItm);
    });

    await Promise.all(subs).then(async () => {
      _ris.transactionNo = updateRequisitionIssuanceSlipDto.transactionNo;
      _ris.transactionDate = updateRequisitionIssuanceSlipDto.transactionDate;
      _ris.saiNo = updateRequisitionIssuanceSlipDto.saiNo;
      _ris.saiDate = updateRequisitionIssuanceSlipDto.saiDate;
      _ris.division = updateRequisitionIssuanceSlipDto.division;
      _ris.departmentId = updateRequisitionIssuanceSlipDto.departmentId;
      _ris.departmentName = updateRequisitionIssuanceSlipDto.departmentName;
      _ris.purpose = updateRequisitionIssuanceSlipDto.purpose;
      _ris.issuanceType = updateRequisitionIssuanceSlipDto.issuanceType;
      _ris.transactionType = updateRequisitionIssuanceSlipDto.transactionType;
      _ris.transactionStatus = updateRequisitionIssuanceSlipDto.transactionStatus;

      await this.requisitionIssuanceSlipRepo.update(id, _ris);
      
      updateRequisitionIssuanceSlipDto.items.forEach(async item => {
        if (!item["id"]) delete item["id"];
        const items = this.requisitionIssuanceSlipItemDetailsRepo.create(item);
        items.ris = _ris;
        const sItem = await this.requisitionIssuanceSlipItemDetailsRepo.save(items);

        if (item.itemsDetails.length > 0) {
          item.itemsDetails.forEach(async subItem => {
            if (!subItem["id"]) delete subItem["id"];
            const subItems = await this.requisitionIssuanceSlipItemBatchDetailsRepo.create(subItem);
            subItems.risd = sItem;
            await this.requisitionIssuanceSlipItemBatchDetailsRepo.save(subItems);
  
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
        } else {
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
          invtyItem.quantity = item.issuedQty;
          invtyItem.price = item.price;
          invtyItem.expirationDate = null;
          invtyItem.lotNo = "";
          invtyItem.remarks = item.remarks;
          invtyItem.serialNo = "";
          invtyItem.model = "";

          const invtyItm = this.inventoryLedgerRepo.create(invtyItem);
          await this.inventoryLedgerRepo.save(invtyItm);
        }
      });
    })

    return this.findOne(id);
  }

  async findAll() {
    const ris = await this.connection
    .getRepository(RequisitionIssuanceSlip)
    .createQueryBuilder("ris")
    .leftJoinAndSelect("ris.items", "itemDetails")
    .where("ris.status = :status", { status: "ACTIVE" })
    .orderBy("ris.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .getMany();

    return ris;
  }

  async findAllIssuance() {
    const ris = await this.connection
    .getRepository(RequisitionIssuanceSlip)
    .createQueryBuilder("ris")
    .leftJoinAndSelect("ris.items", "items")
    .leftJoinAndSelect("items.itemsDetails", "itemsDetails")
    .where("ris.status = :status", { status: "ACTIVE" })
    .andWhere("ris.transactionStatus != ''")
    .orderBy("ris.dateSaved", "DESC")
    .addOrderBy("items.description", "ASC")
    .getMany();

    return ris;
  }

  async findAllByTransType(_transType: string) {
    const ris = await this.connection
    .getRepository(RequisitionIssuanceSlip)
    .createQueryBuilder("ris")
    .leftJoinAndSelect("ris.items", "items")
    .leftJoinAndSelect("items.itemsDetails", "itemsDetails")
    .where("ris.status = :status", { status: "ACTIVE" })
    .andWhere("ris.transactionType = :transType", { transType: _transType })
    .andWhere("ris.transactionStatus != 'Issued'")
    .orderBy("ris.dateSaved", "DESC")
    .addOrderBy("items.description", "ASC")
    .getMany();

    return ris;
  }

  async findAllByIssuanceType(_issuanceType: string) {
    const ris = await this.connection
    .getRepository(RequisitionIssuanceSlip)
    .createQueryBuilder("ris")
    .leftJoinAndSelect("ris.items", "items")
    .leftJoinAndSelect("items.itemsDetails", "itemsDetails")
    .where("ris.status = :status", { status: "ACTIVE" })
    .andWhere("ris.issuanceType = :issuanceType", { issuanceType: _issuanceType })
    .orderBy("ris.dateSaved", "DESC")
    .addOrderBy("items.description", "ASC")
    .getMany();

    return ris;
  }

  async findAllByDepartment(_departmentId: string) {
    const ris = await this.connection
    .getRepository(RequisitionIssuanceSlip)
    .createQueryBuilder("ris")
    .leftJoinAndSelect("ris.items", "itemDetails")
    .where("ris.status = :status", { status: "ACTIVE" })
    .andWhere("ris.entryByDepartment = :dept", { dept: _departmentId })
    .orderBy("ris.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .getMany();

    return ris;
  }

  async findAllIssuanceByDepartment(_departmentId: string) {
    const ris = await this.connection
    .getRepository(RequisitionIssuanceSlip)
    .createQueryBuilder("ris")
    .leftJoinAndSelect("ris.items", "items")
    .leftJoinAndSelect("items.itemsDetails", "itemsDetails")
    .where("ris.status = :status", { status: "ACTIVE" })
    .andWhere("ris.entryByDepartment = :dept", { dept: _departmentId })
    .andWhere("ris.transactionStatus != ''")
    .orderBy("ris.dateSaved", "DESC")
    .addOrderBy("items.description", "ASC")
    .getMany();

    return ris;
  }

  async findAllByTransTypeByDepartment(_transType: string, _departmentId: string) {
    const ris = await this.connection
    .getRepository(RequisitionIssuanceSlip)
    .createQueryBuilder("ris")
    .leftJoinAndSelect("ris.items", "items")
    .leftJoinAndSelect("items.itemsDetails", "itemsDetails")
    .where("ris.status = :status", { status: "ACTIVE" })
    .andWhere("ris.entryByDepartment = :dept", { dept: _departmentId })
    .andWhere("ris.transactionType = :transType", { transType: _transType })
    .orderBy("ris.dateSaved", "DESC")
    .addOrderBy("items.description", "ASC")
    .getMany();

    return ris;
  }

  async findAllByIssuanceTypeByDepartment(_issuanceType: string, _departmentId: string) {
    const ris = await this.connection
    .getRepository(RequisitionIssuanceSlip)
    .createQueryBuilder("ris")
    .leftJoinAndSelect("ris.items", "items")
    .leftJoinAndSelect("items.itemsDetails", "itemsDetails")
    .where("ris.status = :status", { status: "ACTIVE" })
    .andWhere("ris.entryByDepartment = :dept", { dept: _departmentId })
    .andWhere("ris.issuanceType = :issuanceType", { issuanceType: _issuanceType })
    .orderBy("ris.dateSaved", "DESC")
    .addOrderBy("items.description", "ASC")
    .getMany();

    return ris;
  }

  async findOne(_id: string): Promise<RequisitionIssuanceSlip> {
    const ris = await this.connection
    .getRepository(RequisitionIssuanceSlip)
    .createQueryBuilder("ris")
    .leftJoinAndSelect("ris.items", "items")
    .leftJoinAndSelect("items.itemsDetails", "itemsDetails")
    .where("ris.id = :id", { id: _id })
    .orderBy("items.description", "ASC")
    .getOne();

    return ris;
  }

  async getTransactionNo(): Promise<string> {
    const transNo = this.requisitionIssuanceSlipRepo.query("SELECT CONCAT('RIS-', YEAR(CURRENT_DATE()), '-', LPAD(MONTH(CURRENT_DATE()), 2, '0'), '-', LPAD(COUNT(*)+1, 3, '0')) 'transactionNo' FROM requisition_issuance_slip");
    return transNo;
  }

  async update(id: string, updateRequisitionIssuanceSlipDto: UpdateRequisitionIssuanceSlipDto) {
    let _ris = await this.requisitionIssuanceSlipRepo.findOneOrFail({ id: id });
    let _items = await this.requisitionIssuanceSlipItemDetailsRepo.find({ where: { ris: _ris } });

    await this.requisitionIssuanceSlipItemDetailsRepo.remove(_items);

    _ris.transactionNo = updateRequisitionIssuanceSlipDto.transactionNo;
    _ris.transactionDate = updateRequisitionIssuanceSlipDto.transactionDate;
    _ris.saiNo = updateRequisitionIssuanceSlipDto.saiNo;
    _ris.saiDate = updateRequisitionIssuanceSlipDto.saiDate;
    _ris.division = updateRequisitionIssuanceSlipDto.division;
    _ris.departmentId = updateRequisitionIssuanceSlipDto.departmentId;
    _ris.departmentName = updateRequisitionIssuanceSlipDto.departmentName;
    _ris.purpose = updateRequisitionIssuanceSlipDto.purpose;
    _ris.issuanceType = updateRequisitionIssuanceSlipDto.issuanceType;
    _ris.transactionType = updateRequisitionIssuanceSlipDto.transactionType;
    _ris.transactionStatus = updateRequisitionIssuanceSlipDto.transactionStatus;

    await this.requisitionIssuanceSlipRepo.update(id, _ris);
    
    updateRequisitionIssuanceSlipDto.items.forEach(async item => {
      const items = this.requisitionIssuanceSlipItemDetailsRepo.create(item);
      items.ris = _ris;
      await this.requisitionIssuanceSlipItemDetailsRepo.save(items);
    });

    return this.findOne(id);
  }

  async remove(id: string) {
    let _ris = await this.requisitionIssuanceSlipRepo.findOneOrFail({ id: id });
    _ris.status = "INACTIVE";
    await this.requisitionIssuanceSlipRepo.update(id, _ris);
    
    return this.findOne(id);
  }
}
