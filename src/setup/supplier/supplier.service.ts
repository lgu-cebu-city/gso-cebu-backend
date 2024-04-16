import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SupplierService {

  constructor(
    @InjectRepository(Supplier)
    private supplierRepo: Repository<Supplier>,
    private connection: Connection
  ) { }

  create(createSupplierDto: CreateSupplierDto) {
    delete createSupplierDto["id"];
    const model = this.supplierRepo.create(createSupplierDto);
    const data = this.supplierRepo.save(model);
    return data;
  }

  async findAll() {
    // const models = this.supplierRepo.find();
    // return models;

    const supp = await this.connection
    .getRepository(Supplier)
    .createQueryBuilder("supp")
    .where("supp.status = 'Active'")
    .orderBy("supp.name")
    .getMany();

    return supp;
  }

  findOne(id: string): Promise<Supplier> {
    return this.supplierRepo.findOneOrFail(id);
  }

  update(id: string, updateSupplierDto: UpdateSupplierDto) {
    const models = this.supplierRepo.update(id, { ...updateSupplierDto });
    return models;
  }

  async remove(id: string) {
    const _supp = await this.supplierRepo.findOneOrFail({ id: id });
    _supp.status = "Inactive";
    await this.supplierRepo.update(id, _supp);
    return this.findOne(id);
  }
}
