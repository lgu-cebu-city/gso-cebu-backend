import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
 
@Injectable()
export class GenBarangayService {
  constructor(
    @Inject('GENERAL_SERVICE') private readonly general: ClientProxy
  ) { }

  async findAll() {
    return this.general.send({ cmd: 'find-all-barangay'}, { });
  }

  findOne(id: string): any {
    return this.general.send({ cmd: 'find-one-barangay'}, { id: id });
  }
}
