import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section } from './entities/section.entity';

@Injectable()
export class SectionService {

  constructor(
    @InjectRepository(Section)
    private sectionRepo: Repository<Section>
  ) { }

  create(createSectionDto: CreateSectionDto) {
    const model = this.sectionRepo.create(createSectionDto);
    const data = this.sectionRepo.save(model);
    return data;
  }

  findAll() {
    const models = this.sectionRepo.find();
    return models;
  }

  findOne(id: string): Promise<Section> {
    return this.sectionRepo.findOneOrFail(id);
  }

  update(id: string, updateSectionDto: UpdateSectionDto) {
    const models = this.sectionRepo.update(id, { ...updateSectionDto });
    return models;
  }

  async remove(id: string) {
    const model = await this.findOne(id);
    return this.sectionRepo.remove(model);
  }
}
