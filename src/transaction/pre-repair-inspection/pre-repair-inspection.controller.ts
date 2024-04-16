import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PreRepairInspectionService } from './pre-repair-inspection.service';
import { CreatePreRepairInspectionDto } from './dto/create-pre-repair-inspection.dto';
import { UpdatePreRepairInspectionDto } from './dto/update-pre-repair-inspection.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PreRepairInspection')
@Controller({ path: 'pre-repair-inspection', version: '1' })
export class PreRepairInspectionController {
  constructor(private readonly preRepairInspectionService: PreRepairInspectionService) { }

  @Post()
  create(@Body() createPreRepairInspectionDto: CreatePreRepairInspectionDto) {
    return this.preRepairInspectionService.create(createPreRepairInspectionDto);
  }

  @Get()
  findAll() {
    return this.preRepairInspectionService.findAll();
  }

  @Get('byMonthYear/:date')
  findAllByMonthYear(@Param('date') date: Date) {
    return this.preRepairInspectionService.findAllByMonthYear(date);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preRepairInspectionService.findOne(id);
  }

  @Get('transactionNo/transNo')
  getTransactionNo() {
    return this.preRepairInspectionService.getTransactionNo();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePreRepairInspectionDto: UpdatePreRepairInspectionDto) {
    return this.preRepairInspectionService.update(id, updatePreRepairInspectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preRepairInspectionService.remove(id);
  }
}
