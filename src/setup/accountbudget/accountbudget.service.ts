import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateAccountBudgetDto } from './dto/create-accountbudget.dto';
import { UpdateAccountBudgetDto } from './dto/update-accountbudget.dto';
import { AccountBudget } from './entities/accountbudget.entity';

@Injectable()
export class AccountBudgetService {

  constructor(
    @InjectRepository(AccountBudget)
    private accountBudgetRepo: Repository<AccountBudget>,
    private connection: Connection
  ) { }

  create(createAccountBudgetDto: CreateAccountBudgetDto) {
    const model = this.accountBudgetRepo.create(createAccountBudgetDto);
    const data = this.accountBudgetRepo.save(model);
    return data;
  }

  findAll() {
    const models = this.accountBudgetRepo.find();
    return models;
  }

  findOne(id: string): Promise<AccountBudget> {
    return this.accountBudgetRepo.findOneOrFail(id);
  }

  async findMany(sofIDList: string[]) {
    const pp = await this.connection
    .getRepository(AccountBudget)
    .createQueryBuilder("ab")
    .where("ID IN(:...ids)", { ids: sofIDList })
    .getMany();

    return pp;
  }

  findByDeptSofCatYear(sof: string, dept: string, cat: string, year: string) {
    const accntBudget = this.accountBudgetRepo.query("SELECT * FROM account_budget WHERE SOF=? AND DepartmentName=? AND Category=? AND BYear=?", [ sof, dept, cat, year ]);
    return accntBudget;
  }

  update(id: string, updateAccountBudgetDto: UpdateAccountBudgetDto) {
    const models = this.accountBudgetRepo.update(id, { ...updateAccountBudgetDto });
    return models;
  }

  async remove(id: string) {
    const model = await this.findOne(id);
    return this.accountBudgetRepo.remove(model);
  }
}
