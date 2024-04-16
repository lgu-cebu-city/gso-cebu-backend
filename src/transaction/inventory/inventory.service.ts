import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/setup/item/entities/item.entity';
import { Connection, Repository } from 'typeorm';
import { CreateInventoryLedgerDto } from './dto/create-inventory-ledger.dto';
import { UpdateInventoryLedgerDto } from './dto/update-inventory-ledger.dto';
import { InventoryCustodianSlipView } from './entities/inventory-custodian-slip.view.entity';
import { InventoryLedger } from './entities/inventory-ledger.entiry';
import { PropertyInventoryView } from './entities/inventory-property.view.entity';
import { InventoryReportDepartmentView } from './entities/inventory-report-department.view.entity';
import { InventoryReportView } from './entities/inventory-report.view.entity';
@Injectable()
export class InventoryReportViewService {

  constructor(
    @InjectRepository(InventoryReportView)
    private inventoryReportRepo: Repository<InventoryReportView>,
    @InjectRepository(PropertyInventoryView)
    private propertyInventoryRepo: Repository<PropertyInventoryView>,
    @InjectRepository(InventoryLedger)
    private inventoryLedgerRepo: Repository<InventoryLedger>,
    private connection: Connection
  ) { }

  async findAll() {
    const ir = await this.connection
    .getRepository(InventoryReportView)
    .createQueryBuilder("ir")
    .leftJoinAndSelect("ir.details", "details")
    .orderBy("ir.generic", "ASC")
    .addOrderBy("details.referenceDate", "ASC")
    .getMany();

    return ir;
  }

  async findAllByDepartment(_deptId: string) {
    const ir = await this.connection
    .getRepository(InventoryReportDepartmentView)
    .createQueryBuilder("ir")
    .leftJoinAndSelect("ir.details", "details")
    .where("ir.departmentId = :deptId", { deptId: _deptId })
    .orderBy("ir.generic", "ASC")
    .addOrderBy("details.referenceDate", "ASC")
    .getMany();

    return ir;
  }

  async findAllByType(_typeId: string) {
    const ir = await this.connection
    .getRepository(InventoryReportView)
    .createQueryBuilder("ir")
    .leftJoinAndSelect("ir.details", "details")
    .where("ir.typeId = :typeId", { typeId: _typeId })
    .orderBy("ir.generic", "ASC")
    .addOrderBy("details.referenceDate", "ASC")
    .getMany();

    return ir;
  }

  async findAllMedicine() {
    const ir = await this.connection
    .getRepository(InventoryReportView)
    .createQueryBuilder("ir")
    .leftJoinAndSelect("ir.details", "details")
    .where("ir.typeId IN (SELECT id FROM type WHERE isMedicine = '1')")
    .orderBy("ir.generic", "ASC")
    .addOrderBy("details.referenceDate", "ASC")
    .getMany();

    return ir;
  }

  async findAllByTypeDepartment(_typeId: string, _deptId: string) {
    const ir = await this.connection
    .getRepository(InventoryReportDepartmentView)
    .createQueryBuilder("ir")
    .leftJoinAndSelect("ir.details", "details")
    .where("ir.typeId = :typeId", { typeId: _typeId })
    .andWhere("ir.departmentId = :deptId", { deptId: _deptId })
    .orderBy("ir.generic", "ASC")
    .addOrderBy("details.referenceDate", "ASC")
    .getMany();

    return ir;
  }

  async findAllMedicineByDepartment(_deptId: string) {
    const ir = await this.connection
    .getRepository(InventoryReportDepartmentView)
    .createQueryBuilder("ir")
    .leftJoinAndSelect("ir.details", "details")
    .where("ir.typeId IN (SELECT id FROM type WHERE isMedicine = '1')")
    .andWhere("ir.departmentId = :deptId", { deptId: _deptId })
    .orderBy("ir.generic", "ASC")
    .addOrderBy("details.referenceDate", "ASC")
    .getMany();

    return ir;
  }

  async findAllProperty() {
    const ir = await this.connection
    .getRepository(PropertyInventoryView)
    .createQueryBuilder("ir")
    .orderBy("ir.description", "ASC")
    .getMany();

    return ir;
  }

  async findAllICS(_price: number) {
    const ir = await this.connection
    .getRepository(InventoryCustodianSlipView)
    .createQueryBuilder("iar")
    .leftJoinAndSelect("iar.items", "items")
    .where("items.price <= :price", { price: _price })
    .andWhere("items.group = 'Equipment'")
    .getMany();

    return ir;
  }

  async findOne(_id: string): Promise<InventoryReportView> {
    const ir = await this.connection
    .getRepository(InventoryReportView)
    .createQueryBuilder("ir")
    .leftJoinAndSelect("ir.details", "details")
    .where("ir.id = :id", { id: _id })
    .getOne();

    return ir;
  }

  async findbyDept(_deptId: string) {
    const ir = await this.connection
    .getRepository(InventoryReportView)
    .createQueryBuilder("ir")
    .leftJoinAndSelect("ir.details", "details", "details.departmentId = :deptId", { deptId: _deptId })
    .orderBy("ir.generic", "ASC")
    .getMany();

    return ir;
  }

  async findAllSSMI(_year: number) {
    const items = this.inventoryReportRepo.query("CALL sp_getSSMI(?)", [ _year ]);
    return items;
  }

  insertInventoryLedger(item: CreateInventoryLedgerDto) {
    delete CreateInventoryLedgerDto["id"];
    const model = this.inventoryLedgerRepo.create(item);
    const data = this.inventoryLedgerRepo.save(model);
    return data;
  }

  updateInventoryLedger(id: string, updateInventoryLedgerDto: UpdateInventoryLedgerDto) {
    const models = this.inventoryLedgerRepo.update(id, { ...updateInventoryLedgerDto });
    return models;
  }

  async removeInventoryLedger(_id: string) {
    const _item = await this.inventoryLedgerRepo.findOneOrFail({ id: _id });
    _item.status = "Inactive";
    await this.inventoryLedgerRepo.update(_id, _item);
    return this.findOne(_id);
  }

  async findMedicine() {
    const items = this.inventoryLedgerRepo.query("SELECT il.id, refId, refType, departmentId, sectionId, il.groupId, itemId, i.code, il.description, il.uom, quantity, il.price, expirationDate, lotNo FROM inventory_ledger il INNER JOIN item i ON(i.id = il.itemId) WHERE il.status='ACTIVE' AND refType='Receive' AND il.groupId in (SELECT id FROM type WHERE isMedicine = '1') ORDER BY expirationDate, description");
    return items;
  }
  
  async findMedicineByBrandId(_brandId: string) {
    const med = await this.connection
    .getRepository(InventoryLedger)
    .createQueryBuilder("ledger")
    .select("''", "id")
    .addSelect("ledger.brandId", "itemId")
    .addSelect("ledger.lotNo", "batchNo")
    .addSelect("ledger.expirationDate", "expirationDate")
    .addSelect("SUM(ledger.quantity)", "quantity")
    .addSelect("ledger.remarks", "remarks")
    .where("ledger.itemId = :brandId", { brandId: _brandId })
    .andWhere("ledger.refType = 'Receive'")
    .andWhere("ledger.groupId IN (SELECT id FROM type WHERE isMedicine = '1')")
    .andWhere("ledger.status = 'ACTIVE'")
    .groupBy("ledger.lotNo")
    .addGroupBy("ledger.itemId")
    .orderBy("ledger.expirationDate", "ASC")
    .getRawMany();

    return med;
  }

  async findMedicineTest() {
    const med = await this.connection
    .getRepository(Item)
    .createQueryBuilder("item")
    .innerJoinAndSelect("item.ledger", "ledger")
    .where("ledger.refType = 'Receive'")
    .andWhere("ledger.groupId IN (SELECT id FROM type WHERE isMedicine = '1')")
    .andWhere("ledger.status = 'ACTIVE'")
    .orderBy("item.description, ledger.description")
    .getMany();

    return med;
  }

  async findMedicineById(itemId: string) {
    const items = this.inventoryLedgerRepo.query("SELECT il.id, refId, refType, departmentId, sectionId, il.groupId, itemId, i.code, il.description, il.uom, quantity, il.price, expirationDate, lotNo FROM inventory_ledger il INNER JOIN item i ON(i.id = il.itemId) WHERE il.status='ACTIVE' AND refType='Receive' AND il.groupId IN (SELECT id FROM type WHERE isMedicine = '1') AND brandId=? ORDER BY expirationDate", [ itemId ]);
    return items;
  }
}
