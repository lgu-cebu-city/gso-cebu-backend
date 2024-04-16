import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyRequisitionSlipService } from './property-requisition-slip.service';
import { CreatePropertyRequisitionSlipDto } from './dto/create-property-requisition-slip.dto';
import { UpdatePropertyRequisitionSlipDto } from './dto/update-property-requisition-slip.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PropertyRequisitionSlip')
@Controller({ path: 'property-requisition-slip', version: '1' })
export class PropertyRequisitionSlipController {
  constructor(private readonly propertyRequisitionSlipService: PropertyRequisitionSlipService) { }

  @Post()
  create(@Body() createPropertyRequisitionSlipDto: CreatePropertyRequisitionSlipDto) {
    return this.propertyRequisitionSlipService.create(createPropertyRequisitionSlipDto);
  }

  @Get()
  findAll() {
    return this.propertyRequisitionSlipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyRequisitionSlipService.findOne(id);
  }

  @Get('transactionNo/transNo')
  getTransactionNo() {
    return this.propertyRequisitionSlipService.getTransactionNo();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyRequisitionSlipDto: UpdatePropertyRequisitionSlipDto) {
    return this.propertyRequisitionSlipService.update(id, updatePropertyRequisitionSlipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyRequisitionSlipService.remove(id);
  }
}
