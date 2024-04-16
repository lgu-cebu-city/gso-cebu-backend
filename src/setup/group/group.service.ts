import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupService {

  constructor(
    @InjectRepository(Group)
    private groupRepo: Repository<Group>,
    private connection: Connection
  ) { }

  create(createGroupDto: CreateGroupDto) {
    const model = this.groupRepo.create(createGroupDto);
    const data = this.groupRepo.save(model);
    return data;
  }

  findAll() {
    const models = this.groupRepo.find({ status: 'Active' });
    return models;
  }

  async findAllWithType() {
    const g = await this.connection
    .getRepository(Group)
    .createQueryBuilder("g")
    .leftJoinAndSelect("g.type", "type")
    .orderBy("type.description")
    .getMany();

    return g;
  }

  async findAllWithTypeDistinct() {
    const g = await this.connection
    .getRepository(Group)
    .createQueryBuilder("g")
    .leftJoinAndSelect("g.type", "type")
    .groupBy("type.description")
    .orderBy("type.description")
    .getMany();

    return g;
  }

  findOne(id: string): Promise<Group> {
    return this.groupRepo.findOneOrFail(id);
  }

  update(id: string, updateGroupDto: UpdateGroupDto) {
    const models = this.groupRepo.update(id, { ...updateGroupDto });
    return models;
  }

  async remove(id: string) {
    const model = await this.findOne(id);
    return this.groupRepo.remove(model);
  }
}
