import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyAccountabilitySlipService } from './property-accountability-slip.service';
import { CreatePropertyAccountabilitySlipDto } from './dto/create-property-accountability-slip.dto';
import { UpdatePropertyAccountabilitySlipDto } from './dto/update-property-accountability-slip.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PropertyAccountabilitySlip')
@Controller({ path: 'property-accountability-slip', version: '1' })
export class PropertyAccountabilitySlipController {
  constructor(private readonly propertyAccountabilitySlipService: PropertyAccountabilitySlipService) { }

  @Post()
  create(@Body() createPropertyAccountabilitySlipDto: CreatePropertyAccountabilitySlipDto) {
    return this.propertyAccountabilitySlipService.create(createPropertyAccountabilitySlipDto);
  }

  @Get()
  findAll() {
    return this.propertyAccountabilitySlipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyAccountabilitySlipService.findOne(id);
  }

  @Get('transactionNo/transNo')
  getTransactionNo() {
    return this.propertyAccountabilitySlipService.getTransactionNo();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyAccountabilitySlipDto: UpdatePropertyAccountabilitySlipDto) {
    return this.propertyAccountabilitySlipService.update(id, updatePropertyAccountabilitySlipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyAccountabilitySlipService.remove(id);
  }
}
