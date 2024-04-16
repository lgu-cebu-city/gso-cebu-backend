import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BarangayIssuanceService } from './barangay-issuance.service';
import { CreateBarangayIssuanceDto } from './dto/create-barangay-issuance.dto';
import { UpdateBarangayIssuanceDto } from './dto/update-barangay-issuance.dto';

@ApiTags('BarangayIssuance')
@Controller({path: 'barangay-issuance', version: '1'})
export class BarangayIssuanceController {
  constructor(private readonly barangayIssuanceService: BarangayIssuanceService) {}

  @Post()
  create(@Body() createBarangayIssuanceDto: CreateBarangayIssuanceDto) {
    return this.barangayIssuanceService.create(createBarangayIssuanceDto);
  }

  @Get()
  findAll() {
    return this.barangayIssuanceService.findAll();
  }

  @Get('byDepartment/:deptId')
  findAllByDepartment(@Param('deptId') deptId: string) {
    return this.barangayIssuanceService.findAllByDepartment(deptId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barangayIssuanceService.findOne(id);
  }

  @Get('transactionNo/transNo')
  getTransactionNo() {
    return this.barangayIssuanceService.getTransactionNo();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBarangayIssuanceDto: UpdateBarangayIssuanceDto) {
    return this.barangayIssuanceService.update(id, updateBarangayIssuanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.barangayIssuanceService.remove(id);
  }
}
