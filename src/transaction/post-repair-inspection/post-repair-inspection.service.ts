/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreatePostRepairInspectionDto } from './dto/create-post-repair-inspection.dto';
import { UpdatePostRepairInspectionDto } from './dto/update-post-repair-inspection.dto';
import { PostRepairInspectionItemDetails } from './entities/post-repair-inspection-item-details.entity';
import { PostRepairInspection } from './entities/post-repair-inspection.entity';

@Injectable()
export class PostRepairInspectionService {

  constructor(
    @InjectRepository(PostRepairInspection)
    private purchaseOrderRepo: Repository<PostRepairInspection>,
    @InjectRepository(PostRepairInspectionItemDetails)
    private purchaseOrderItemDetailsRepo: Repository<PostRepairInspectionItemDetails>,
    private readonly connection: Connection
  ) { }

  async create(createPostRepairInspectionDto: CreatePostRepairInspectionDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      delete createPostRepairInspectionDto["id"];
      const created = this.purchaseOrderRepo.create(createPostRepairInspectionDto);
      const data = await queryRunner.manager.save(created);

      createPostRepairInspectionDto.items.forEach(async item => {
        delete item["id"];
        const items = this.purchaseOrderItemDetailsRepo.create(item);
        items.pori = data;
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
    const pori = await this.connection
    .getRepository(PostRepairInspection)
    .createQueryBuilder("pori")
    .leftJoinAndSelect("pori.items", "itemDetails")
    .where("pori.status = :status", { status: "ACTIVE" })
    .orderBy("pori.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .getMany();

    return pori;
  }

  async findAllByMonthYear(date: Date) {
    const pori = await this.connection
    .getRepository(PostRepairInspection)
    .createQueryBuilder("pori")
    .leftJoinAndSelect("pori.items", "itemDetails")
    .where("pori.status = :status", { status: "ACTIVE" })
    .andWhere("MONTH(pori.transactionDate) = :mon", { mon: new Date(date).getMonth() + 1 })
    .andWhere("YEAR(pori.transactionDate) = :yr", { yr: new Date(date).getFullYear() })
    .orderBy("pori.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .getMany();

    return pori;
  }

  async findAllForWaste() {
    const pori = await this.connection
    .getRepository(PostRepairInspection)
    .createQueryBuilder("pori")
    .innerJoinAndSelect("pori.itemsForWaste", "itemDetails")
    .where("pori.status = :status", { status: "ACTIVE" })
    .orderBy("pori.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .getMany();

    return pori;
  }

  async findOne(_id: string): Promise<PostRepairInspection> {
    const pori = await this.connection
    .getRepository(PostRepairInspection)
    .createQueryBuilder("pori")
    .leftJoinAndSelect("pori.items", "itemDetails")
    .where("pori.id = :id", { id: _id })
    .orderBy("itemDetails.description", "ASC")
    .getOne();

    return pori;
  }

  async getTransactionNo(): Promise<string> {
    const transNo = this.purchaseOrderRepo.query("SELECT CONCAT('PORI-', YEAR(CURRENT_DATE()), '-', LPAD(MONTH(CURRENT_DATE()), 2, '0'), '-', LPAD(COUNT(*)+1, 3, '0')) 'transactionNo' FROM post_repair_inspection");
    return transNo;
  }

  async update(id: string, updatePostRepairInspectionDto: UpdatePostRepairInspectionDto) {
    let _pori = await this.purchaseOrderRepo.findOneOrFail({ id: id });
    let _items = await this.purchaseOrderItemDetailsRepo.find({ where: { pori: _pori } });

    await this.purchaseOrderItemDetailsRepo.remove(_items);

    _pori.transactionNo = updatePostRepairInspectionDto.transactionNo;
    _pori.transactionDate = updatePostRepairInspectionDto.transactionDate;
    _pori.vehicleName = updatePostRepairInspectionDto.vehicleName;
    _pori.vehicleType = updatePostRepairInspectionDto.vehicleType;
    _pori.plateNo = updatePostRepairInspectionDto.plateNo;
    _pori.brandModel = updatePostRepairInspectionDto.brandModel;
    _pori.engineNo = updatePostRepairInspectionDto.engineNo;
    _pori.chassisNo = updatePostRepairInspectionDto.chassisNo;
    _pori.departmentId = updatePostRepairInspectionDto.departmentId;
    _pori.departmentName = updatePostRepairInspectionDto.departmentName;
    _pori.divisionId = updatePostRepairInspectionDto.divisionId;
    _pori.divisionName = updatePostRepairInspectionDto.divisionName;
    _pori.jobDescription = updatePostRepairInspectionDto.jobDescription;
    _pori.remarks = updatePostRepairInspectionDto.remarks;
    _pori.signatory1Id = updatePostRepairInspectionDto.signatory1Id;
    _pori.signatory1Name = updatePostRepairInspectionDto.signatory1Name;
    _pori.signatory2Id = updatePostRepairInspectionDto.signatory2Id;
    _pori.signatory2Name = updatePostRepairInspectionDto.signatory2Name;
    _pori.acceptedById = updatePostRepairInspectionDto.acceptedById;
    _pori.acceptedByName = updatePostRepairInspectionDto.acceptedByName;

    await this.purchaseOrderRepo.update(id, _pori);
    
    updatePostRepairInspectionDto.items.forEach(async item => {
      delete item["id"];
      const items = this.purchaseOrderItemDetailsRepo.create(item);
      items.pori = _pori;
      await this.purchaseOrderItemDetailsRepo.save(items);
    });

    return this.findOne(id);
  }

  async remove(id: string) {
    const model = await this.findOne(id);
    return this.purchaseOrderRepo.remove(model);
  }
}
