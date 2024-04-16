/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateWasteMaterialReportDto } from './dto/create-waste-material-report.dto';
import { UpdateWasteMaterialReportDto } from './dto/update-waste-material-report.dto';
import { WasteMaterialReportItemDetails } from './entities/waste-material-report-item-details.entity';
import { WasteMaterialReportInspectionCertificate } from './entities/waste-material-report-inspection-certificate.entity';
import { WasteMaterialReport } from './entities/waste-material-report.entity';
import { WmrAreIcsItemsView } from './entities/wmr-are-ics-items.view.entity';
import { WmrPostRepairItemsView } from './entities/wmr-post-repair-items.view.entity';

@Injectable()
export class WasteMaterialReportService {

  constructor(
    @InjectRepository(WasteMaterialReport)
    private wasteMaterialReportRepo: Repository<WasteMaterialReport>,
    @InjectRepository(WasteMaterialReportItemDetails)
    private wasteMaterialReportItemDetailsRepo: Repository<WasteMaterialReportItemDetails>,
    @InjectRepository(WasteMaterialReportInspectionCertificate)
    private wasteMaterialReportTypeRepo: Repository<WasteMaterialReportInspectionCertificate>,
    private connection: Connection
  ) { }

  async create(createWasteMaterialReportDto: CreateWasteMaterialReportDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      delete createWasteMaterialReportDto["id"];
      const created = this.wasteMaterialReportRepo.create(createWasteMaterialReportDto);
      const data = await queryRunner.manager.save(created);

      createWasteMaterialReportDto.items.forEach(itemDtl => {
        delete itemDtl["id"];
        const items = this.wasteMaterialReportItemDetailsRepo.create(itemDtl);
        items.wmr = data;
        queryRunner.manager.save(items);
      });
      
      createWasteMaterialReportDto.inspectionCertificate.forEach(_type => {
        delete _type["id"];
        const detail = this.wasteMaterialReportTypeRepo.create(_type);
        detail.wmr = data;
        queryRunner.manager.save(detail);
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
    const wmr = await this.connection
    .getRepository(WasteMaterialReport)
    .createQueryBuilder("wmr")
    .leftJoinAndSelect("wmr.inspectionCertificate", "inspectionCertificate")
    .leftJoinAndSelect("wmr.items", "itemDetails")
    .where("wmr.status = :status", { status: "ACTIVE" })
    .orderBy("wmr.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .getMany();

    return wmr;
  }

  async findAllByMonthYear(date: Date) {
    const wmr = await this.connection
    .getRepository(WasteMaterialReport)
    .createQueryBuilder("wmr")
    .leftJoinAndSelect("wmr.inspectionCertificate", "inspectionCertificate")
    .leftJoinAndSelect("wmr.items", "itemDetails")
    .where("wmr.status = :status", { status: "ACTIVE" })
    .andWhere("MONTH(wmr.transactionDate) = :mon", { mon: new Date(date).getMonth() + 1 })
    .andWhere("YEAR(wmr.transactionDate) = :yr", { yr: new Date(date).getFullYear() })
    .orderBy("wmr.dateSaved", "DESC")
    .addOrderBy("itemDetails.description", "ASC")
    .getMany();

    return wmr;
  }

  async findAllAREICSItems(_deptId: string) {
    const wmri = await this.connection
    .getRepository(WmrAreIcsItemsView)
    .createQueryBuilder("wmri")
    .where("wmri.status = :status", { status: "ACTIVE" })
    .andWhere("wmri.departmentId = :departmentId", { departmentId: _deptId })
    .orderBy("wmri.transactionDate", "DESC")
    .addOrderBy("wmri.brand", "ASC")
    .getMany();

    return wmri;
  }

  async findAllAREICSItemsById(_transId: string, _transType: string, _itemId: string) {
    const wmri = await this.connection
    .getRepository(WmrAreIcsItemsView)
    .createQueryBuilder("wmri")
    .where("wmri.status = :status", { status: "ACTIVE" })
    .andWhere("wmri.transactionId = :transactionId", { transactionId: _transId })
    .andWhere("wmri.id = :id", { id: _itemId })
    .andWhere("wmri.type = :type", { type: _transType })
    .orderBy("wmri.transactionDate", "DESC")
    .addOrderBy("wmri.brand", "ASC")
    .getOne();

    return wmri;
  }

  async findAllPostRepairItems(_deptId: string) {
    const wmri = await this.connection
    .getRepository(WmrPostRepairItemsView)
    .createQueryBuilder("wmri")
    .where("wmri.status = :status", { status: "ACTIVE" })
    .andWhere("wmri.departmentId = :departmentId", { departmentId: _deptId })
    .orderBy("wmri.transactionDate", "DESC")
    .addOrderBy("wmri.brand", "ASC")
    .getMany();

    return wmri;
  }

  async findAllPostRepairItemsById(_transId: string, _transType: string, _itemId: string) {
    const wmri = await this.connection
    .getRepository(WmrPostRepairItemsView)
    .createQueryBuilder("wmri")
    .where("wmri.status = :status", { status: "ACTIVE" })
    .andWhere("wmri.transactionId = :transactionId", { transactionId: _transId })
    .andWhere("wmri.id = :id", { id: _itemId })
    .andWhere("wmri.type = :type", { type: _transType })
    .orderBy("wmri.transactionDate", "DESC")
    .addOrderBy("wmri.brand", "ASC")
    .getOne();

    return wmri;
  }

  async findOne(_id: string): Promise<WasteMaterialReport> {
    const wmr = await this.connection
    .getRepository(WasteMaterialReport)
    .createQueryBuilder("wmr")
    .leftJoinAndSelect("wmr.inspectionCertificate", "inspectionCertificate")
    .leftJoinAndSelect("wmr.items", "itemDetails")
    .where("wmr.id = :id", { id: _id })
    .orderBy("itemDetails.description", "ASC")
    .getOne();

    return wmr;
  }

  async getTransactionNo(): Promise<string> {
    const transNo = this.wasteMaterialReportRepo.query("SELECT CONCAT('WMR-', YEAR(CURRENT_DATE()), '-', LPAD(MONTH(CURRENT_DATE()), 2, '0'), '-', LPAD(COUNT(*)+1, 3, '0')) 'transactionNo' FROM waste_material_report");
    return transNo;
  }

  async update(id: string, updateWasteMaterialReportDto: UpdateWasteMaterialReportDto) {
    let _wmr = await this.wasteMaterialReportRepo.findOneOrFail({ id: id });
    let _items = await this.wasteMaterialReportItemDetailsRepo.find({ where: { wmr: _wmr } });
    let _types = await this.wasteMaterialReportTypeRepo.find({ where: { wmr: _wmr } });

    await this.wasteMaterialReportItemDetailsRepo.remove(_items);
    await this.wasteMaterialReportTypeRepo.remove(_types);

    _wmr.transactionNo = updateWasteMaterialReportDto.transactionNo;
    _wmr.transactionDate = updateWasteMaterialReportDto.transactionDate;
    _wmr.departmentId = updateWasteMaterialReportDto.departmentId;
    _wmr.departmentName = updateWasteMaterialReportDto.departmentName;
    _wmr.placeOfStorage = updateWasteMaterialReportDto.placeOfStorage;
    _wmr.inspOfficerId = updateWasteMaterialReportDto.inspOfficerId;
    _wmr.inspOfficerName = updateWasteMaterialReportDto.inspOfficerName;
    _wmr.witnessId = updateWasteMaterialReportDto.witnessId;
    _wmr.witnessName = updateWasteMaterialReportDto.witnessName;
    _wmr.fund = updateWasteMaterialReportDto.fund;
    _wmr.remarks = updateWasteMaterialReportDto.remarks;

    await this.wasteMaterialReportRepo.update(id, _wmr);
    
    updateWasteMaterialReportDto.items.forEach(async item => {
      delete item["id"];
      const items = this.wasteMaterialReportItemDetailsRepo.create(item);
      items.wmr = _wmr;
      await this.wasteMaterialReportItemDetailsRepo.save(items);
    });

    updateWasteMaterialReportDto.inspectionCertificate.forEach(async _type => {
      delete _type["id"];
      const type = this.wasteMaterialReportTypeRepo.create(_type);
      type.wmr = _wmr;
      await this.wasteMaterialReportTypeRepo.save(type);
    });

    return this.findOne(id);
  }

  async remove(id: string) {
    let _wmr = await this.wasteMaterialReportRepo.findOneOrFail({ id: id });
    _wmr.status = "INACTIVE";
    await this.wasteMaterialReportRepo.update(id, _wmr);
    
    return this.findOne(id);
  }
}
