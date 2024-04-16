import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyTransferService } from './property-transfer.service';
import { CreatePropertyTransferDto } from './dto/create-property-transfer.dto';
import { UpdatePropertyTransferDto } from './dto/update-property-transfer.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PropertyTransfer')
@Controller({ path: 'property-transfer', version: '1' })
export class PropertyTransferController {
  constructor(private readonly propertyTransferService: PropertyTransferService) { }

  @Post()
  create(@Body() createPropertyTransferDto: CreatePropertyTransferDto) {
    return this.propertyTransferService.create(createPropertyTransferDto);
  }

  @Get()
  findAll() {
    return this.propertyTransferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyTransferService.findOne(id);
  }

  @Get('transactionNo/transNo')
  getTransactionNo() {
    return this.propertyTransferService.getTransactionNo();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyTransferDto: UpdatePropertyTransferDto) {
    return this.propertyTransferService.update(id, updatePropertyTransferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyTransferService.remove(id);
  }
}
