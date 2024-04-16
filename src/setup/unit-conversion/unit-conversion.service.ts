/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUnitConversionDto } from './dto/create-unit-conversion.dto';
import { UpdateUnitConversionDto } from './dto/update-unit-conversion.dto';
import { UnitConversion } from './entities/unit-conversion.entity';

@Injectable()
export class UnitConversionService {

  constructor(
    @InjectRepository(UnitConversion)
    private unitConversionRepo: Repository<UnitConversion>
  ) { }

  create(createUnitConversionDto: CreateUnitConversionDto) {
    delete createUnitConversionDto["id"];
    const model = this.unitConversionRepo.create(createUnitConversionDto);
    const data = this.unitConversionRepo.save(model);
    return data;
  }

  findAll() {
    const models = this.unitConversionRepo.find({ status: 'Active' });
    return models;
  }

  findOne(id: string): Promise<UnitConversion> {
    return this.unitConversionRepo.findOneOrFail(id);
  }

  findAllbyType(_type: string) {
    const models = this.unitConversionRepo.find({ status: 'Active', itemType: _type });
    return models;
  }

  update(id: string, updateUnitConversionDto: UpdateUnitConversionDto) {
    const models = this.unitConversionRepo.update(id, { ...updateUnitConversionDto });
    return models;
  }

  async remove(_id: string) {
    let _uc = await this.unitConversionRepo.findOneOrFail({ id: _id });
    _uc.status = "Inactive";
    await this.unitConversionRepo.update(_id, _uc);
    return this.findOne(_id);
  }
}
