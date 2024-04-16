import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyReturnSlipService } from './property-return-slip.service';
import { CreatePropertyReturnSlipDto } from './dto/create-property-return-slip.dto';
import { UpdatePropertyReturnSlipDto } from './dto/update-property-return-slip.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PropertyReturnSlip')
@Controller({ path: 'property-return-slip', version: '1' })
export class PropertyReturnSlipController {
  constructor(private readonly propertyReturnSlipService: PropertyReturnSlipService) { }

  @Post()
  create(@Body() createPropertyReturnSlipDto: CreatePropertyReturnSlipDto) {
    return this.propertyReturnSlipService.create(createPropertyReturnSlipDto);
  }

  @Get()
  findAll() {
    return this.propertyReturnSlipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyReturnSlipService.findOne(id);
  }

  @Get('transactionNo/transNo')
  getTransactionNo() {
    return this.propertyReturnSlipService.getTransactionNo();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyReturnSlipDto: UpdatePropertyReturnSlipDto) {
    return this.propertyReturnSlipService.update(id, updatePropertyReturnSlipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyReturnSlipService.remove(id);
  }
}
