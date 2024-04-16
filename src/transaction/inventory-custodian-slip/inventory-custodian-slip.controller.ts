import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryCustodianSlipService } from './inventory-custodian-slip.service';
import { CreateInventoryCustodianSlipDto } from './dto/create-inventory-custodian-slip.dto';
import { UpdateInventoryCustodianSlipDto } from './dto/update-inventory-custodian-slip.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('InventoryCustodianSlip')
@Controller({ path: 'inventory-custodian-slip', version: '1' })
export class InventoryCustodianSlipController {
  constructor(private readonly inventoryCustodianSlipService: InventoryCustodianSlipService) { }

  @Post()
  create(@Body() createInventoryCustodianSlipDto: CreateInventoryCustodianSlipDto) {
    return this.inventoryCustodianSlipService.create(createInventoryCustodianSlipDto);
  }

  @Get()
  findAll() {
    return this.inventoryCustodianSlipService.findAll();
  }

  @Get('byMonthYear/:date')
  findAllByMonthYear(@Param('date') date: Date) {
    return this.inventoryCustodianSlipService.findAllByMonthYear(date);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryCustodianSlipService.findOne(id);
  }

  @Get('transactionNo/transNo')
  getTransactionNo() {
    return this.inventoryCustodianSlipService.getTransactionNo();
  }

  @Get('propertyNo/:prefix')
  getPropertyNo(@Param('prefix') prefix: string) {
    return this.inventoryCustodianSlipService.getPropertyNo(prefix);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryCustodianSlipDto: UpdateInventoryCustodianSlipDto) {
    return this.inventoryCustodianSlipService.update(id, updateInventoryCustodianSlipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryCustodianSlipService.remove(id);
  }
}
