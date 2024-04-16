/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreatePropertyReturnSlipDto } from './dto/create-property-return-slip.dto';
import { UpdatePropertyReturnSlipDto } from './dto/update-property-return-slip.dto';
import { PropertyReturnSlipItemDetails } from './entities/property-return-slip-item-details.entity';
import { PropertyReturnSlip } from './entities/property-return-slip.entity';

@Injectable()
export class PropertyReturnSlipService {

  constructor(
    @InjectRepository(PropertyReturnSlip)
    private propertyReturnSlipRepo: Repository<PropertyReturnSlip>,
    @InjectRepository(PropertyReturnSlipItemDetails)
    private propertyReturnSlipItemDetailsRepo: Repository<PropertyReturnSlipItemDetails>,
    private connection: Connection
  ) { }

  async create(createPropertyReturnSlipDto: CreatePropertyReturnSlipDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      delete createPropertyReturnSlipDto["id"];
      const created = this.propertyReturnSlipRepo.create(createPropertyReturnSlipDto);
      const data = await queryRunner.manager.save(created);

      let i: number = 1;
      createPropertyReturnSlipDto.items.forEach(itemDtl => {
        delete itemDtl["id"];
        itemDtl.itemNo = i;
        i = i + 1;
        const items = this.propertyReturnSlipItemDetailsRepo.create(itemDtl);
        items.prs = data;
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

  async findAll() {
    const prs = await this.connection
    .getRepository(PropertyReturnSlip)
    .createQueryBuilder("prs")
    .leftJoinAndSelect("prs.items", "itemDetails")
    .where("prs.status = :status", { status: "ACTIVE" })
    .orderBy("prs.dateSaved", "DESC")
    .getMany();

    return prs;
  }

  async findOne(_id: string): Promise<PropertyReturnSlip> {
    const prs = await this.connection
    .getRepository(PropertyReturnSlip)
    .createQueryBuilder("prs")
    .leftJoinAndSelect("prs.items", "itemDetails")
    .where("prs.id = :id", { id: _id })
    .getOne();

    return prs;
  }

  async getTransactionNo(): Promise<string> {
    const transNo = this.propertyReturnSlipRepo.query("SELECT CONCAT('PRS-', YEAR(CURRENT_DATE()), '-', LPAD(MONTH(CURRENT_DATE()), 2, '0'), '-', LPAD(COUNT(*)+1, 3, '0')) 'transactionNo' FROM property_return_slip");
    return transNo;
  }

  async update(id: string, updatePropertyReturnSlipDto: UpdatePropertyReturnSlipDto) {
    let _prs = await this.propertyReturnSlipRepo.findOneOrFail({ id: id });
    let _items = await this.propertyReturnSlipItemDetailsRepo.find({ where: { prs: _prs } });

    await this.propertyReturnSlipItemDetailsRepo.remove(_items);

    _prs.transactionNo = updatePropertyReturnSlipDto.transactionNo;
    _prs.transactionDate = updatePropertyReturnSlipDto.transactionDate;
    _prs.propAccId = updatePropertyReturnSlipDto.propAccId;
    _prs.requestorId = updatePropertyReturnSlipDto.requestorId;
    _prs.requestorName = updatePropertyReturnSlipDto.requestorName;
    _prs.receivedById = updatePropertyReturnSlipDto.receivedById;
    _prs.receivedByName = updatePropertyReturnSlipDto.receivedByName;
    _prs.processedById = updatePropertyReturnSlipDto.processedById;
    _prs.processedByName = updatePropertyReturnSlipDto.processedByName;
    _prs.returnStatus = updatePropertyReturnSlipDto.returnStatus;
    _prs.remarks = updatePropertyReturnSlipDto.remarks;

    await this.propertyReturnSlipRepo.update(id, _prs);
    
    let i: number = 1;
    updatePropertyReturnSlipDto.items.forEach(async item => {
      if (!item["id"]) delete item["id"];
      item.itemNo = i;
      i = i + 1;
      const items = this.propertyReturnSlipItemDetailsRepo.create(item);
      items.prs = _prs;
      await this.propertyReturnSlipItemDetailsRepo.save(items);
    });

    return this.findOne(id);
  }

  async remove(id: string) {
    const model = await this.findOne(id);
    return this.propertyReturnSlipRepo.remove(model);
  }
}
