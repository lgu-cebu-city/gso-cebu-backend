import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { Office } from './entities/office.entity';

@Injectable()
export class OfficeService {

  constructor(
    @InjectRepository(Office)
    private officeRepo: Repository<Office>
  ) { }

  create(createOfficeDto: CreateOfficeDto) {
    const model = this.officeRepo.create(createOfficeDto);
    const data = this.officeRepo.save(model);
    return data;
  }

  findAll() {
    const models = this.officeRepo.find({ status: 'Active' });
    return models;
  }

  findOne(id: string): Promise<Office> {
    return this.officeRepo.findOneOrFail(id);
  }

  update(id: string, updateOfficeDto: UpdateOfficeDto) {
    const models = this.officeRepo.update(id, { ...updateOfficeDto });
    return models;
  }

  async remove(id: string) {
    const model = await this.findOne(id);
    return this.officeRepo.remove(model);
  }
}
