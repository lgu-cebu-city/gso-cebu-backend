import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
 
@Injectable()
export class EmployeeService {
  constructor(
    @Inject('GENERAL_SERVICE') private readonly general: ClientProxy
  ) { }

  async findAll() {
    return this.general.send({ cmd: 'find-all-employee'}, { });
  }

  findOne(id: string): any {
    return this.general.send({ cmd: 'find-one-employee'}, { id: id });
  }
}
