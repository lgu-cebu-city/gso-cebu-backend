import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentService {

  constructor(
    @InjectRepository(Department)
    private departmentRepo: Repository<Department>
  ) { }

  create(createDepartmentDto: CreateDepartmentDto) {
    const model = this.departmentRepo.create(createDepartmentDto);
    const data = this.departmentRepo.save(model);
    return data;
  }

  findAll() {
    const dept = this.departmentRepo.query("SELECT bd.*, hd.positionId, hd.position_name FROM gso_cebu.department bd INNER JOIN hr_db.setup_department hd ON(bd.hr_department = hd.id) ORDER BY sequence ASC");
    return dept;
  }

  findAllSignatories() {
    const items = this.departmentRepo.query("CALL emp_display");
    return items;
  }

  findDefaultSignatories(deptId: string) {
    const items = this.departmentRepo.query("CALL sp_getSignatories('" + deptId + "')");
    return items;
  }

  findOne(id: string): Promise<Department> {
    return this.departmentRepo.findOneOrFail(id);
  }

  findByDept(deptId: string) {
    const models = this.departmentRepo.find({ id: deptId });
    return models;
  }

  update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    const models = this.departmentRepo.update(id, { ...updateDepartmentDto });
    return models;
  }

  async remove(id: string) {
    const model = await this.findOne(id);
    return this.departmentRepo.remove(model);
  }
}
