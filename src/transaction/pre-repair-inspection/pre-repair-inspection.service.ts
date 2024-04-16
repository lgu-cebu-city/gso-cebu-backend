/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreatePreRepairInspectionDto } from './dto/create-pre-repair-inspection.dto';
import { UpdatePreRepairInspectionDto } from './dto/update-pre-repair-inspection.dto';
import { PreRepairInspectionItemDetails } from './entities/pre-repair-inspection-item-details.entity';
import { PreRepairInspection } from './entities/pre-repair-inspection.entity';

@Injectable()
export class PreRepairInspectionService {

  constructor(
    @InjectRepository(PreRepairInspection)
    private preRepairInspectionRepo: Repository<PreRepairInspection>,
    @InjectRepository(PreRepairInspectionItemDetails)
    private preRepairInspectionItemDetailsRepo: Repository<PreRepairInspectionItemDetails>,
    private readonly connection: Connection
  ) { }

  async create(createPreRepairInspectionDto: CreatePreRepairInspectionDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      delete createPreRepairInspectionDto["id"];
      const created = this.preRepairInspectionRepo.create(createPreRepairInspectionDto);
      const data = await queryRunner.manager.save(created);

      createPreRepairInspectionDto.items.forEach(async item => {
        delete item["id"];
        const items = this.preRepairInspectionItemDetailsRepo.create(item);
        items.pri = data;
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
    const pri = await this.connection
    .getRepository(PreRepairInspection)
    .createQueryBuilder("pri")
    .leftJoinAndSelect("pri.items", "itemDetails")
    .where("pri.status = :status", { status: "ACTIVE" })
    .orderBy("pri.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .getMany();

    return pri;
  }

  async findAllByMonthYear(date: Date) {
    const pri = await this.connection
    .getRepository(PreRepairInspection)
    .createQueryBuilder("pri")
    .leftJoinAndSelect("pri.items", "itemDetails")
    .where("pri.status = :status", { status: "ACTIVE" })
    .andWhere("MONTH(pri.transactionDate) = :mon", { mon: new Date(date).getMonth() + 1 })
    .andWhere("YEAR(pri.transactionDate) = :yr", { yr: new Date(date).getFullYear() })
    .orderBy("pri.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .getMany();

    return pri;
  }

  async findOne(_id: string): Promise<PreRepairInspection> {
    const pri = await this.connection
    .getRepository(PreRepairInspection)
    .createQueryBuilder("pri")
    .leftJoinAndSelect("pri.items", "itemDetails")
    .where("pri.id = :id", { id: _id })
    .orderBy("itemDetails.description", "ASC")
    .getOne();

    return pri;
  }

  async getTransactionNo(): Promise<string> {
    const transNo = this.preRepairInspectionRepo.query("SELECT CONCAT('PRI-', YEAR(CURRENT_DATE()), '-', LPAD(MONTH(CURRENT_DATE()), 2, '0'), '-', LPAD(COUNT(*)+1, 3, '0')) 'transactionNo' FROM pre_repair_inspection");
    return transNo;
  }

  async update(id: string, updatePreRepairInspectionDto: UpdatePreRepairInspectionDto) {
    let _pri = await this.preRepairInspectionRepo.findOneOrFail({ id: id });
    let _items = await this.preRepairInspectionItemDetailsRepo.find({ where: { pri: _pri } });

    await this.preRepairInspectionItemDetailsRepo.remove(_items);

    _pri.transactionNo = updatePreRepairInspectionDto.transactionNo;
    _pri.transactionDate = updatePreRepairInspectionDto.transactionDate;
    _pri.vehicleName = updatePreRepairInspectionDto.vehicleName;
    _pri.vehicleType = updatePreRepairInspectionDto.vehicleType;
    _pri.plateNo = updatePreRepairInspectionDto.plateNo;
    _pri.brandModel = updatePreRepairInspectionDto.brandModel;
    _pri.engineNo = updatePreRepairInspectionDto.engineNo;
    _pri.chassisNo = updatePreRepairInspectionDto.chassisNo;
    _pri.acquisationDate = updatePreRepairInspectionDto.acquisationDate;
    _pri.acquisationCost = updatePreRepairInspectionDto.acquisationCost;
    _pri.lastRepairDate = updatePreRepairInspectionDto.lastRepairDate;
    _pri.lastRepairNature = updatePreRepairInspectionDto.lastRepairNature;
    _pri.defectComplaints = updatePreRepairInspectionDto.defectComplaints;
    _pri.workScope = updatePreRepairInspectionDto.workScope;
    _pri.remarks = updatePreRepairInspectionDto.remarks;
    _pri.requestedById = updatePreRepairInspectionDto.requestedById;
    _pri.requestedByName = updatePreRepairInspectionDto.requestedByName;
    _pri.inspectedBy1Id = updatePreRepairInspectionDto.inspectedBy1Id;
    _pri.inspectedBy1Name = updatePreRepairInspectionDto.inspectedBy1Name;
    _pri.inspectedBy2Id = updatePreRepairInspectionDto.inspectedBy2Id;
    _pri.inspectedBy2Name = updatePreRepairInspectionDto.inspectedBy2Name;
    _pri.notedById = updatePreRepairInspectionDto.notedById;
    _pri.notedByName = updatePreRepairInspectionDto.notedByName;

    await this.preRepairInspectionRepo.update(id, _pri);
    
    updatePreRepairInspectionDto.items.forEach(async item => {
      delete item["id"];
      const items = this.preRepairInspectionItemDetailsRepo.create(item);
      items.pri = _pri;
      await this.preRepairInspectionItemDetailsRepo.save(items);
    });

    return this.findOne(id);
  }

  async remove(id: string) {
    let _wmr = await this.preRepairInspectionRepo.findOneOrFail({ id: id });
    _wmr.status = "INACTIVE";
    await this.preRepairInspectionRepo.update(id, _wmr);
    
    return this.findOne(id);
  }
}
