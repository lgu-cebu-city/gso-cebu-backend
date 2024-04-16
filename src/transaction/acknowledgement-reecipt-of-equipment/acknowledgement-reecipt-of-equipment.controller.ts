import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcknowledgementReceiptOfEquipmentService } from './acknowledgement-reecipt-of-equipment.service';
import { CreateAcknowledgementReceiptOfEquipmentDto } from './dto/create-acknowledgement-reecipt-of-equipment.dto';
import { UpdateAcknowledgementReceiptOfEquipmentDto } from './dto/update-acknowledgement-reecipt-of-equipment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AcknowledgementReceiptOfEquipment')
@Controller({ path: 'acknowledgement-reecipt-of-equipment', version: '1' })
export class AcknowledgementReceiptOfEquipmentController {
  constructor(private readonly acknowledgementReceiptOfEquipmentService: AcknowledgementReceiptOfEquipmentService) { }

  @Post()
  create(@Body() createAcknowledgementReceiptOfEquipmentDto: CreateAcknowledgementReceiptOfEquipmentDto) {
    return this.acknowledgementReceiptOfEquipmentService.create(createAcknowledgementReceiptOfEquipmentDto);
  }

  @Get()
  findAll() {
    return this.acknowledgementReceiptOfEquipmentService.findAll();
  }

  @Get('byMonthYear/:date')
  findAllByMonthYear(@Param('date') date: Date) {
    return this.acknowledgementReceiptOfEquipmentService.findAllByMonthYear(date);
  }

  @Get('are/items/all')
  findAllAREItems() {
    return this.acknowledgementReceiptOfEquipmentService.findAllAREItems();
  }

  @Get('are/deptitems/:deptId')
  findAllAREItemsByDept(@Param('deptId') deptId: string) {
    return this.acknowledgementReceiptOfEquipmentService.findAllAREItemsByDept(deptId);
  }

  @Get('are/items/:areId/:id')
  findAllAREItemsById(@Param('areId') areId: string, @Param('id') id: string) {
    return this.acknowledgementReceiptOfEquipmentService.findAllAREItemsById(areId, id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.acknowledgementReceiptOfEquipmentService.findOne(id);
  }

  @Get('transactionNo/transNo')
  getTransactionNo() {
    return this.acknowledgementReceiptOfEquipmentService.getTransactionNo();
  }

  @Get('propertyNo/:prefix')
  getPropertyNo(@Param('prefix') prefix: string) {
    return this.acknowledgementReceiptOfEquipmentService.getPropertyNo(prefix);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAcknowledgementReceiptOfEquipmentDto: UpdateAcknowledgementReceiptOfEquipmentDto) {
    return this.acknowledgementReceiptOfEquipmentService.update(id, updateAcknowledgementReceiptOfEquipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.acknowledgementReceiptOfEquipmentService.remove(id);
  }
}
