import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmployeeService } from './employee.service'; 

@ApiTags('Employee')
@Controller({path:'employee',version:'1'})
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

 
  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }
 
}
