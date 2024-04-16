import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateAppropriationDto } from './dto/create-appropriation.dto';
import { UpdateAppropriationDto } from './dto/update-appropriation.dto';
import { Appropriation } from './entities/appropriation.entity';

@Injectable()
export class AppropriationService {

  constructor(
    @InjectRepository(Appropriation)
    private appropriationRepo: Repository<Appropriation>,
    private connection: Connection
  ) { }

  create(createAppropriationDto: CreateAppropriationDto) {
    delete createAppropriationDto["id"];
    const model = this.appropriationRepo.create(createAppropriationDto);
    const data = this.appropriationRepo.save(model);
    return data;
  }

  findAll() {
    const accntBudget = this.appropriationRepo.query("SELECT * FROM budget_db.appropriation WHERE deleted_at IS NULL ORDER BY description");
    return accntBudget;
  }

  findAllByYear(_year: string) {
    const accntBudget = this.appropriationRepo.query("SELECT * FROM budget_db.appropriation WHERE budgetYear='"+ _year +"' AND deleted_at IS NULL ORDER BY description");
    return accntBudget;
  }

  findOne(id: number) {
    const accntBudget = this.appropriationRepo.query("SELECT * FROM budget_db.appropriation WHERE id = " + id);
    return accntBudget;
  }

  async findMany(sofIDList: string[]) {
    let ids = "";
    sofIDList.forEach((sofId, i) => {
      ids += "'" + sofId + "'";
      if (sofIDList.length - 1 != i) {
        ids += ",";
      }
    });

    const accntBudget = this.appropriationRepo.query("SELECT * FROM budget_db.appropriation WHERE id IN(" + ids + ") ORDER BY description");
    return accntBudget;
  }

  findByDeptSofCatYear(sof: string, dept: string, cat: string, year: string) {
    const accntBudget = this.appropriationRepo.query("SELECT * FROM budget_db.appropriation WHERE fundId=? AND officeId=? AND classificationId=? AND budgetYear=? AND deleted_at IS NULL ORDER BY description", [ sof, dept, cat, year ]);
    return accntBudget;
  }

  update(id: number, updateAppropriationDto: UpdateAppropriationDto) {
    const models = this.appropriationRepo.update(id, { ...updateAppropriationDto });
    return models;
  }

  remove(id: number) {
    return `This action removes a #${id} appropriation`;
  }
}
