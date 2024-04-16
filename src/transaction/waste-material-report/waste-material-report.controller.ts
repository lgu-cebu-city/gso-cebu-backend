import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WasteMaterialReportService } from './waste-material-report.service';
import { CreateWasteMaterialReportDto } from './dto/create-waste-material-report.dto';
import { UpdateWasteMaterialReportDto } from './dto/update-waste-material-report.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('WasteMaterialReport')
@Controller({ path: 'waste-material-report', version: '1' })
export class WasteMaterialReportController {
  constructor(private readonly wasteMaterialReportService: WasteMaterialReportService) { }

  @Post()
  create(@Body() createWasteMaterialReportDto: CreateWasteMaterialReportDto) {
    return this.wasteMaterialReportService.create(createWasteMaterialReportDto);
  }

  @Get()
  findAll() {
    return this.wasteMaterialReportService.findAll();
  }

  @Get('byMonthYear/:date')
  findAllByMonthYear(@Param('date') date: Date) {
    return this.wasteMaterialReportService.findAllByMonthYear(date);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wasteMaterialReportService.findOne(id);
  }

  @Get('transactionNo/transNo')
  getTransactionNo() {
    return this.wasteMaterialReportService.getTransactionNo();
  }

  @Get('areicsItems/:deptId')
  findAllAREICSItems(@Param('deptId') deptId: string) {
    return this.wasteMaterialReportService.findAllAREICSItems(deptId);
  }

  @Get('areicsItemsById/:transId/:transType/:itemId')
  findAllAREICSItemsById(@Param('transId',) _transId: string, @Param('transType',) _transType: string, @Param('itemId',) _itemId: string) {
    return this.wasteMaterialReportService.findAllAREICSItemsById(_transId, _transType, _itemId);
  }

  @Get('postRepairItems/:deptId')
  findAllPostRepairItems(@Param('deptId') deptId: string) {
    return this.wasteMaterialReportService.findAllPostRepairItems(deptId);
  }

  @Get('postRepairItemsById/:transId/:transType/:itemId')
  findAllPostRepairItemsById(@Param('transId',) _transId: string, @Param('transType',) _transType: string, @Param('itemId',) _itemId: string) {
    return this.wasteMaterialReportService.findAllPostRepairItemsById(_transId, _transType, _itemId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWasteMaterialReportDto: UpdateWasteMaterialReportDto) {
    return this.wasteMaterialReportService.update(id, updateWasteMaterialReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wasteMaterialReportService.remove(id);
  }
}
