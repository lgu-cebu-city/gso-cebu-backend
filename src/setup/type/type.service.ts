import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './entities/type.entity';

@Injectable()
export class TypeService {

  constructor(
    @InjectRepository(Type)
    private typeRepo: Repository<Type>,
    private connection: Connection
  ) { }

  create(createTypeDto: CreateTypeDto) {
    // const model = this.typeRepo.create(createTypeDto);
    // const data = this.typeRepo.save(model);
    // return data;
  }

  findbyGroup(_group: string) {
    const models = this.typeRepo.find({ groupName: _group, status: 'Active' });
    return models;
  }

  async findAll() {
    const t = await this.connection
    .getRepository(Type)
    .createQueryBuilder("t")
    .orderBy("t.description")
    .getMany();

    return t;
  }

  findOne(id: string): Promise<Type> {
    return this.typeRepo.findOneOrFail(id);
  }

  update(id: string, updateTypeDto: UpdateTypeDto) {
    // const models = this.typeRepo.update(id, { ...updateTypeDto });
    // return models;
  }

  async remove(id: string) {
    const model = await this.findOne(id);
    return this.typeRepo.remove(model);
  }
}
