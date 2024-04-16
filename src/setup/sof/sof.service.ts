import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSOFDto } from './dto/create-sof.dto';
import { UpdateSOFDto } from './dto/update-sof.dto';
import { SOF } from './entities/sof.entity';

@Injectable()
export class SOFService {

  constructor(
    @InjectRepository(SOF)
    private sofRepo: Repository<SOF>
  ) { }

  create(createSOFDto: CreateSOFDto) {
    const model = this.sofRepo.create(createSOFDto);
    const data = this.sofRepo.save(model);
    return data;
  }

  findAll() {
    const models = this.sofRepo.find();
    return models;
  }

  findOne(id: string): Promise<SOF> {
    return this.sofRepo.findOneOrFail(id);
  }

  findByDept(sofID: string) {
    const models = this.sofRepo.find({ id: sofID });
    return models;
  }

  update(id: string, updateSOFDto: UpdateSOFDto) {
    const models = this.sofRepo.update(id, { ...updateSOFDto });
    return models;
  }

  async remove(id: string) {
    const model = await this.findOne(id);
    return this.sofRepo.remove(model);
  }
}
