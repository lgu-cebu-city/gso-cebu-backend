/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateAbstractOfCanvassDto } from './dto/create-abstract-of-canvass.dto';
import { UpdateAbstractOfCanvassDto } from './dto/update-abstract-of-canvass.dto';
import { AbstractOfCanvassItemDetails } from './entities/abstract-of-canvass-item-details.entity';
import { AbstractOfCanvassSupplierDetails } from './entities/abstract-of-canvass-supplier-details.entity';
import { AbstractOfCanvass } from './entities/abstract-of-canvass.entity';
import { ApprovedCanvass } from './entities/approved-canvass.entity';

@Injectable()
export class AbstractOfCanvassService {

  constructor(
    @InjectRepository(AbstractOfCanvass)
    private abstractOfCanvassRepo: Repository<AbstractOfCanvass>,
    @InjectRepository(AbstractOfCanvassSupplierDetails)
    private abstractOfCanvassSupplierDetailsRepo: Repository<AbstractOfCanvassSupplierDetails>,
    @InjectRepository(AbstractOfCanvassItemDetails)
    private abstractOfCanvassItemDetailsRepo: Repository<AbstractOfCanvassItemDetails>,
    private connection: Connection
  ) { }

  async create(createAbstractOfCanvassDto: CreateAbstractOfCanvassDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      delete createAbstractOfCanvassDto["id"];
      const created = this.abstractOfCanvassRepo.create(createAbstractOfCanvassDto);
      const data = await queryRunner.manager.save(created);

      createAbstractOfCanvassDto.supplier.forEach(async supplierDtl => {
        if (!supplierDtl["id"]) delete supplierDtl["id"];
        const suppliers = this.abstractOfCanvassSupplierDetailsRepo.create(supplierDtl);
        suppliers.aoc = data;
        const supp = await queryRunner.manager.save(suppliers);

        supplierDtl.items.forEach(itemsDtl => {
          if (!itemsDtl["id"]) delete itemsDtl["id"];
          const items = this.abstractOfCanvassItemDetailsRepo.create(itemsDtl);
          items.aocs = supp;
          queryRunner.manager.save(items);
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
    const aoc = await this.connection
    .getRepository(AbstractOfCanvass)
    .createQueryBuilder("aoc")
    .leftJoinAndSelect("aoc.supplier", "supplierDetails")
    .leftJoinAndSelect("supplierDetails.items", "itemDetails")
    .where("aoc.status = :status", { status: "ACTIVE" })
    .orderBy("aoc.dateSaved", "DESC")
    .addOrderBy("itemDetails.description")
    .addOrderBy("itemDetails.uom", "ASC")
    .addOrderBy("supplierDetails.supplierName")
    .getMany();

    return aoc;
  }

  async findAllByMonthYear(date: Date) {
    const aoc = await this.connection
    .getRepository(AbstractOfCanvass)
    .createQueryBuilder("aoc")
    .leftJoinAndSelect("aoc.supplier", "supplierDetails")
    .leftJoinAndSelect("supplierDetails.items", "itemDetails")
    .where("aoc.status = :status", { status: "ACTIVE" })
    .andWhere("MONTH(aoc.dateSaved) = :mon", { mon: new Date(date).getMonth() + 1 })
    .andWhere("YEAR(aoc.dateSaved) = :yr", { yr: new Date(date).getFullYear() })
    .orderBy("aoc.dateSaved", "DESC")
    .addOrderBy("supplierDetails.approved", "DESC")
    .addOrderBy("itemDetails.description")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return aoc;
  }

  async findOne(_id: string): Promise<AbstractOfCanvass> {
    const aoc = await this.connection
    .getRepository(AbstractOfCanvass)
    .createQueryBuilder("aoc")
    .leftJoinAndSelect("aoc.supplier", "supplierDetails")
    .leftJoinAndSelect("supplierDetails.items", "itemDetails")
    .where("aoc.id = :id", { id: _id })
    .orderBy("itemDetails.description")
    .addOrderBy("itemDetails.uom", "ASC")
    .getOne();

    return aoc;
  }

  async getTransactionNo(): Promise<string> {
    const transNo = this.abstractOfCanvassRepo.query("SELECT CONCAT('AOC-', YEAR(CURRENT_DATE()), '-', LPAD(MONTH(CURRENT_DATE()), 2, '0'), '-', LPAD(COUNT(*)+1, 3, '0')) 'transactionNo' FROM abstract_of_canvass");
    return transNo;
  }

  async findProject(_id: string) {
    const proj = this.abstractOfCanvassRepo.query("SELECT * FROM abstract_of_canvass aoc INNER JOIN request_quotation rfq ON (aoc.rfqId = rfq.id) INNER JOIN purchase_request pr ON (rfq.prId = pr.id) INNER JOIN project_proposal pp ON (pr.ppId = pp.id) WHERE aoc.id = ?", [ _id ]);
    return proj;
  }

  async findApprovedCanvass() {
    const aoc = await this.connection
    .getRepository(ApprovedCanvass)
    .createQueryBuilder("aoc")
    .leftJoinAndSelect("aoc.items", "itemDetails")
    .where("itemDetails.awarded = true")
    .andWhere("aoc.hasPo = false")
    .orderBy("aoc.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return aoc;
  }

  async findApprovedCanvassByMonthYear(date: Date) {
    const aoc = await this.connection
    .getRepository(ApprovedCanvass)
    .createQueryBuilder("aoc")
    .leftJoinAndSelect("aoc.items", "itemDetails")
    .where("itemDetails.awarded = true")
    .andWhere("aoc.hasPo = false")
    .andWhere("MONTH(aoc.dateSaved) = :mon", { mon: new Date(date).getMonth() + 1 })
    .andWhere("YEAR(aoc.dateSaved) = :yr", { yr: new Date(date).getFullYear() })
    .orderBy("aoc.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return aoc;
  }

  async findApprovedCanvassForPOByMonthYear(date: Date) {
    const aoc = await this.connection
    .getRepository(ApprovedCanvass)
    .createQueryBuilder("aoc")
    .leftJoinAndSelect("aoc.items", "itemDetails")
    .where("itemDetails.awarded = true")
    .andWhere("aoc.hasPo = false")
    .andWhere("MONTH(aoc.dateSaved) = :mon", { mon: new Date(date).getMonth() + 1 })
    .andWhere("YEAR(aoc.dateSaved) = :yr", { yr: new Date(date).getFullYear() })
    .andWhere("aoc.aoc_id NOT IN (SELECT canvassId FROM purchase_order WHERE status = 'ACTIVE')")
    .orderBy("aoc.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return aoc;
  }

  async findApprovedCanvassById(_id: string) {
    const aoc = await this.connection
    .getRepository(ApprovedCanvass)
    .createQueryBuilder("aoc")
    .leftJoinAndSelect("aoc.items", "itemDetails")
    .where("itemDetails.awarded = true")
    .andWhere("aoc.aoc_id = :id", { id: _id })
    .orderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getOne();

    return aoc;
  }

  async update(id: string, updateAbstractOfCanvassDto: UpdateAbstractOfCanvassDto) {
    let _aoc = await this.abstractOfCanvassRepo.findOneOrFail({ id: id });
    let _supplier = await this.abstractOfCanvassSupplierDetailsRepo.find({ where: { aoc: _aoc } });
    const subs = _supplier.map(async supp => {
      let _items = await this.abstractOfCanvassItemDetailsRepo.find({ where: { aocs: supp } });
      await this.abstractOfCanvassItemDetailsRepo.remove(_items);
      await this.abstractOfCanvassSupplierDetailsRepo.remove(supp);
    });

    await Promise.all(subs).then(async () => {
      _aoc.rfqNo = updateAbstractOfCanvassDto.rfqNo;
      _aoc.transactionNo = updateAbstractOfCanvassDto.transactionNo;
      _aoc.transactionDate = updateAbstractOfCanvassDto.transactionDate;
      _aoc.supplyDescription = updateAbstractOfCanvassDto.supplyDescription;
      _aoc.remarks = updateAbstractOfCanvassDto.remarks;
      _aoc.bacChairman = updateAbstractOfCanvassDto.bacChairman;
      _aoc.bacVChairman = updateAbstractOfCanvassDto.bacVChairman;
      _aoc.bacMember1 = updateAbstractOfCanvassDto.bacMember1;
      _aoc.bacMember2 = updateAbstractOfCanvassDto.bacMember2;
      _aoc.bacMember3 = updateAbstractOfCanvassDto.bacMember3;
      _aoc.bacMember4 = updateAbstractOfCanvassDto.bacMember4;
  
      await this.abstractOfCanvassRepo.update(id, _aoc);
      
      updateAbstractOfCanvassDto.supplier.forEach(async _supp => {
        if (!_supp["id"]) delete _supp["id"];
        const supplier = this.abstractOfCanvassSupplierDetailsRepo.create(_supp);
        supplier.aoc = _aoc;
        const supp = await this.abstractOfCanvassSupplierDetailsRepo.save(supplier);
  
        _supp.items.forEach(async item => {
          if (!item["id"]) delete item["id"];
          const items = this.abstractOfCanvassItemDetailsRepo.create(item);
          items.aocs = supp;
          await this.abstractOfCanvassItemDetailsRepo.save(items);
        })
      });
    });

    return this.findOne(id);
  }

  updateAwarded(id: string, awarded: boolean) {
    return this.abstractOfCanvassItemDetailsRepo.query(`UPDATE abstract_of_canvass_item_details SET awarded=${awarded} WHERE id='${id}'`);
  }

  updateApproved(id: string, approved: boolean) {
    return this.abstractOfCanvassItemDetailsRepo.query(`UPDATE abstract_of_canvass_item_details SET approved=${approved} WHERE id='${id}'`);
  }

  async remove(id: string) {
    let _aoc = await this.abstractOfCanvassRepo.findOneOrFail({ id: id });
    _aoc.status = "INACTIVE";
    await this.abstractOfCanvassRepo.update(id, _aoc);
    
    return this.findOne(id);
  }
}
