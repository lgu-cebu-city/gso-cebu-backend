import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBarangayDto } from './dto/create-barangay.dto';
import { UpdateBarangayDto } from './dto/update-barangay.dto';
import { Barangay } from './entities/barangay.entity';

@Injectable()
export class BarangayService {

  constructor(
    @InjectRepository(Barangay)
    private barangayRepo: Repository<Barangay>
  ) { }

  create(createBarangayDto: CreateBarangayDto) {
    const model = this.barangayRepo.create(createBarangayDto);
    const data = this.barangayRepo.save(model);
    return data;
  }

  findAll() {
    const models = this.barangayRepo.find({ status: 'Active' });
    return models;
  }

  findOne(id: string): Promise<Barangay> {
    return this.barangayRepo.findOneOrFail(id);
  }

  update(id: string, updateBarangayDto: UpdateBarangayDto) {
    const models = this.barangayRepo.update(id, { ...updateBarangayDto });
    return models;
  }

  async remove(id: string) {
    const model = await this.findOne(id);
    return this.barangayRepo.remove(model);
  }
}
