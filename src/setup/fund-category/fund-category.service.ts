import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFundCategoryDto } from './dto/create-fund-category.dto';
import { UpdateFundCategoryDto } from './dto/update-fund-category.dto';
import { FundCategory } from './entities/fund-category.entity';

@Injectable()
export class FundCategoryService {

  constructor(
    @InjectRepository(FundCategory)
    private fundCategroyRepo: Repository<FundCategory>
  ) { }

  create(createFundCategoryDto: CreateFundCategoryDto) {
    const model = this.fundCategroyRepo.create(createFundCategoryDto);
    const data = this.fundCategroyRepo.save(model);
    return data;
  }

  findAll() {
    const models = this.fundCategroyRepo.find();
    return models;
  }

  findOne(id: number): Promise<FundCategory> {
    return this.fundCategroyRepo.findOneOrFail(id);
  }

  findByFundId(_fundId: number) {
    const models = this.fundCategroyRepo.find({ fundId: _fundId });
    return models;
  }

  update(id: number, updateFundCategoryDto: UpdateFundCategoryDto) {
    const models = this.fundCategroyRepo.update(id, { ...updateFundCategoryDto });
    return models;
  }

  async remove(id: number) {
    const model = await this.findOne(id);
    return this.fundCategroyRepo.remove(model);
  }
}
