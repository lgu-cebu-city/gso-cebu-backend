/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { AbstractOfCanvassSupplierDetails } from '../abstract-of-canvass/entities/abstract-of-canvass-supplier-details.entity';
import { AbstractOfCanvass } from '../abstract-of-canvass/entities/abstract-of-canvass.entity';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { PurchaseOrderItemDetails } from './entities/purchase-order-item-details.entity';
import { PurchaseOrder } from './entities/purchase-order.entity';

@Injectable()
export class PurchaseOrderService {

  constructor(
    @InjectRepository(PurchaseOrder)
    private purchaseOrderRepo: Repository<PurchaseOrder>,
    @InjectRepository(PurchaseOrderItemDetails)
    private purchaseOrderItemDetailsRepo: Repository<PurchaseOrderItemDetails>,
    @InjectRepository(AbstractOfCanvass)
    private abstractOfCanvassRepo: Repository<AbstractOfCanvass>,
    @InjectRepository(AbstractOfCanvassSupplierDetails)
    private abstractOfCanvassSupplierDetailsRepo: Repository<AbstractOfCanvassSupplierDetails>,
    private readonly connection: Connection
  ) { }

  async create(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    const queryRunner = this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      delete createPurchaseOrderDto["id"];
      const created = this.purchaseOrderRepo.create(createPurchaseOrderDto);
      const data = await queryRunner.manager.save(created);

      createPurchaseOrderDto.items.forEach(async item => {
        delete item["id"];
        const items = this.purchaseOrderItemDetailsRepo.create(item);
        items.po = data;
        queryRunner.manager.save(items);
      });

      if (createPurchaseOrderDto.canvassId != "") {
        let _aoc = await this.abstractOfCanvassRepo.findOneOrFail({ id: createPurchaseOrderDto.canvassId });
        let _aocSupp = await this.abstractOfCanvassSupplierDetailsRepo.findOne( { where: { supplierId: createPurchaseOrderDto.supplierId, aoc: _aoc } } );
        
        _aocSupp.hasPo = true;
        await this.abstractOfCanvassSupplierDetailsRepo.update(_aocSupp.id, _aocSupp);
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
    const po = await this.connection
    .getRepository(PurchaseOrder)
    .createQueryBuilder("po")
    .leftJoinAndSelect("po.items", "itemDetails")
    .where("po.status = :status", { status: "ACTIVE" })
    .orderBy("po.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return po;
  }

  async findAllByMonthYear(date: Date) {
    const po = await this.connection
    .getRepository(PurchaseOrder)
    .createQueryBuilder("po")
    .leftJoinAndSelect("po.items", "itemDetails")
    .where("po.status = :status", { status: "ACTIVE" })
    .andWhere("MONTH(po.dateSaved) = :mon", { mon: new Date(date).getMonth() + 1 })
    .andWhere("YEAR(po.dateSaved) = :yr", { yr: new Date(date).getFullYear() })
    .orderBy("po.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .getMany();

    return po;
  }

  async findAllByMonthYearWithDR(date: Date) {
    const po = await this.connection
    .getRepository(PurchaseOrder)
    .createQueryBuilder("po")
    .leftJoinAndSelect("po.items", "itemDetails")
    .leftJoinAndSelect("itemDetails.dr", "dr")
    .leftJoinAndSelect("itemDetails.drActual", "drActual")
    .where("po.status = :status", { status: "ACTIVE" })
    .andWhere("MONTH(po.dateSaved) = :mon", { mon: new Date(date).getMonth() + 1 })
    .andWhere("YEAR(po.dateSaved) = :yr", { yr: new Date(date).getFullYear() })
    .orderBy("po.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .addOrderBy("dr.referenceDate", "ASC")
    .addOrderBy("drActual.referenceDate", "ASC")
    .getMany();

    return po;
  }

  async findAllByForIARMonthYearWithDR(date: Date) {
    const po = await this.connection
    .getRepository(PurchaseOrder)
    .createQueryBuilder("po")
    .leftJoinAndSelect("po.items", "itemDetails")
    .leftJoinAndSelect("itemDetails.dr", "dr")
    .leftJoinAndSelect("itemDetails.drActual", "drActual")
    .where("po.status = :status", { status: "ACTIVE" })
    .andWhere("MONTH(po.dateSaved) = :mon", { mon: new Date(date).getMonth() + 1 })
    .andWhere("YEAR(po.dateSaved) = :yr", { yr: new Date(date).getFullYear() })
    .andWhere("po.id NOT IN (SELECT poId FROM inspection_and_acceptance_report WHERE status = 'ACTIVE')")
    .orderBy("po.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .addOrderBy("dr.referenceDate", "ASC")
    .addOrderBy("drActual.referenceDate", "ASC")
    .getMany();

    return po;
  }

  async findAllByForIARActualMonthYearWithDR(date: Date) {
    const po = await this.connection
    .getRepository(PurchaseOrder)
    .createQueryBuilder("po")
    .leftJoinAndSelect("po.items", "itemDetails")
    .leftJoinAndSelect("itemDetails.dr", "dr")
    .leftJoinAndSelect("itemDetails.drActual", "drActual")
    .where("po.status = :status", { status: "ACTIVE" })
    .andWhere("MONTH(po.dateSaved) = :mon", { mon: new Date(date).getMonth() + 1 })
    .andWhere("YEAR(po.dateSaved) = :yr", { yr: new Date(date).getFullYear() })
    .andWhere("po.id NOT IN (SELECT poId FROM inspection_and_acceptance_report_actual WHERE status = 'ACTIVE')")
    .orderBy("po.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .addOrderBy("dr.referenceDate", "ASC")
    .addOrderBy("drActual.referenceDate", "ASC")
    .getMany();

    return po;
  }

  async findOne(_id: string): Promise<PurchaseOrder> {
    const po = await this.connection
    .getRepository(PurchaseOrder)
    .createQueryBuilder("po")
    .leftJoinAndSelect("po.items", "itemDetails")
    .leftJoinAndSelect("itemDetails.dr", "dr")
    .leftJoinAndSelect("itemDetails.drActual", "drActual")
    .where("po.id = :id", { id: _id })
    .orderBy("itemDetails.description", "ASC")
    .addOrderBy("itemDetails.uom", "ASC")
    .addOrderBy("dr.referenceDate", "ASC")
    .addOrderBy("drActual.referenceDate", "ASC")
    .getOne();

    return po;
  }

  async getTransactionNo(): Promise<string> {
    const transNo = this.purchaseOrderRepo.query("SELECT CONCAT('PO-', YEAR(CURRENT_DATE()), '-', LPAD(MONTH(CURRENT_DATE()), 2, '0'), '-', LPAD(COUNT(*)+1, 3, '0')) 'transactionNo' FROM purchase_order");
    return transNo;
  }

  async getTransCount(poId: string): Promise<number> {
    const transCount = this.purchaseOrderRepo.query("SELECT SUM(cnt) 'count' FROM (SELECT COUNT(*) 'cnt' FROM inspection_and_acceptance_report WHERE poId = '" + poId + "' AND STATUS = 'ACTIVE' UNION ALL SELECT COUNT(*) 'cnt' FROM inspection_and_acceptance_report_actual WHERE poId = '" + poId + "' AND STATUS = 'ACTIVE') xx");
    return transCount;
  }

  async update(id: string, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    let _po = await this.purchaseOrderRepo.findOneOrFail({ id: id });
    let _items = await this.purchaseOrderItemDetailsRepo.find({ where: { po: _po } });

    await this.purchaseOrderItemDetailsRepo.remove(_items);

    _po.transactionNo = updatePurchaseOrderDto.transactionNo;
    _po.transactionDate = updatePurchaseOrderDto.transactionDate;
    _po.canvassId = updatePurchaseOrderDto.canvassId;
    _po.canvassNo = updatePurchaseOrderDto.canvassNo;
    _po.prId = updatePurchaseOrderDto.prId;
    _po.prNo = updatePurchaseOrderDto.prNo;
    _po.procurementMode = updatePurchaseOrderDto.procurementMode;
    _po.supplierId = updatePurchaseOrderDto.supplierId;
    _po.supplierName = updatePurchaseOrderDto.supplierName;
    _po.supplierAddress = updatePurchaseOrderDto.supplierAddress;
    _po.supplierContactNo = updatePurchaseOrderDto.supplierContactNo;
    _po.supplierRemarks = updatePurchaseOrderDto.supplierRemarks;
    _po.deliveryPlace = updatePurchaseOrderDto.deliveryPlace;
    _po.deliveryDate = updatePurchaseOrderDto.deliveryDate;
    _po.deliveryTerm = updatePurchaseOrderDto.deliveryTerm;
    _po.paymentTerm = updatePurchaseOrderDto.paymentTerm;

    await this.purchaseOrderRepo.update(id, _po);
    
    updatePurchaseOrderDto.items.forEach(async item => {
      if (!item["id"]) delete item["id"];
      const items = this.purchaseOrderItemDetailsRepo.create(item);
      items.po = _po;
      await this.purchaseOrderItemDetailsRepo.save(items);
    });

    return this.findOne(id);
  }

  async remove(id: string) {
    let _po = await this.purchaseOrderRepo.findOneOrFail({ id: id });
    _po.status = "INACTIVE";
    await this.purchaseOrderRepo.update(id, _po);
    
    if (_po.canvassId != "") {
      let _aoc = await this.abstractOfCanvassRepo.findOneOrFail({ id: _po.canvassId });
      let _aocSupp = await this.abstractOfCanvassSupplierDetailsRepo.findOne( { where: { supplierId: _po.supplierId, aoc: _aoc } } );

      _aocSupp.hasPo = false;
      await this.abstractOfCanvassSupplierDetailsRepo.update(_aocSupp.id, _aocSupp);
    }
    
    return this.findOne(id);
  }
}
