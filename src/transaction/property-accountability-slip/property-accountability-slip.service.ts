/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreatePropertyAccountabilitySlipDto } from './dto/create-property-accountability-slip.dto';
import { UpdatePropertyAccountabilitySlipDto } from './dto/update-property-accountability-slip.dto';
import { PropertyAccountabilitySlipItemDetails } from './entities/property-accountability-slip-item-details.entity';
import { PropertyAccountabilitySlip } from './entities/property-accountability-slip.entity';

@Injectable()
export class PropertyAccountabilitySlipService {

  constructor(
    @InjectRepository(PropertyAccountabilitySlip)
    private propertyAccountabilitySlipRepo: Repository<PropertyAccountabilitySlip>,
    @InjectRepository(PropertyAccountabilitySlipItemDetails)
    private propertyAccountabilitySlipItemDetailsRepo: Repository<PropertyAccountabilitySlipItemDetails>,
    private connection: Connection
  ) { }

  async create(createPropertyAccountabilitySlipDto: CreatePropertyAccountabilitySlipDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      delete createPropertyAccountabilitySlipDto["id"];
      const created = this.propertyAccountabilitySlipRepo.create(createPropertyAccountabilitySlipDto);
      const data = await queryRunner.manager.save(created);

      let i: number = 1;
      createPropertyAccountabilitySlipDto.items.forEach(itemDtl => {
        delete itemDtl["id"];
        itemDtl.itemNo = i;
        i = i + 1;
        const items = this.propertyAccountabilitySlipItemDetailsRepo.create(itemDtl);
        items.pas = data;
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
    const pas = await this.connection
    .getRepository(PropertyAccountabilitySlip)
    .createQueryBuilder("pas")
    .leftJoinAndSelect("pas.items", "itemDetails")
    .where("pas.status = :status", { status: "ACTIVE" })
    .orderBy("pas.dateSaved", "DESC")
    .getMany();

    return pas;
  }

  async findOne(_id: string): Promise<PropertyAccountabilitySlip> {
    const pas = await this.connection
    .getRepository(PropertyAccountabilitySlip)
    .createQueryBuilder("pas")
    .leftJoinAndSelect("pas.items", "itemDetails")
    .where("pas.id = :id", { id: _id })
    .getOne();

    return pas;
  }

  async getTransactionNo(): Promise<string> {
    const transNo = this.propertyAccountabilitySlipRepo.query("SELECT CONCAT('PAS-', YEAR(CURRENT_DATE()), '-', LPAD(MONTH(CURRENT_DATE()), 2, '0'), '-', LPAD(COUNT(*)+1, 3, '0')) 'transactionNo' FROM property_accountability_slip");
    return transNo;
  }

  async update(id: string, updatePropertyAccountabilitySlipDto: UpdatePropertyAccountabilitySlipDto) {
    let _pas = await this.propertyAccountabilitySlipRepo.findOneOrFail({ id: id });
    let _items = await this.propertyAccountabilitySlipItemDetailsRepo.find({ where: { pas: _pas } });

    await this.propertyAccountabilitySlipItemDetailsRepo.remove(_items);

    _pas.transactionNo = updatePropertyAccountabilitySlipDto.transactionNo;
    _pas.transactionDate = updatePropertyAccountabilitySlipDto.transactionDate;
    _pas.propReqId = updatePropertyAccountabilitySlipDto.propReqId;
    _pas.requestorId = updatePropertyAccountabilitySlipDto.requestorId;
    _pas.requestorName = updatePropertyAccountabilitySlipDto.requestorName;
    _pas.approvedById = updatePropertyAccountabilitySlipDto.approvedById;
    _pas.approvedByName = updatePropertyAccountabilitySlipDto.approvedByName;
    _pas.dateFrom = updatePropertyAccountabilitySlipDto.dateFrom;
    _pas.dateTo = updatePropertyAccountabilitySlipDto.dateTo;
    _pas.requestType = updatePropertyAccountabilitySlipDto.requestType;
    _pas.purpose = updatePropertyAccountabilitySlipDto.purpose;
    _pas.remarks = updatePropertyAccountabilitySlipDto.remarks;

    await this.propertyAccountabilitySlipRepo.update(id, _pas);
    
    let i: number = 1;
    updatePropertyAccountabilitySlipDto.items.forEach(async item => {
      if (!item["id"]) delete item["id"];
      item.itemNo = i;
      i = i + 1;
      const items = this.propertyAccountabilitySlipItemDetailsRepo.create(item);
      items.pas = _pas;
      await this.propertyAccountabilitySlipItemDetailsRepo.save(items);
    });

    return this.findOne(id);
  }

  async remove(id: string) {
    const model = await this.findOne(id);
    return this.propertyAccountabilitySlipRepo.remove(model);
  }
}
