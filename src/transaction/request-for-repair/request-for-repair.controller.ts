import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestForRepairService } from './request-for-repair.service';
import { CreateRequestForRepairDto } from './dto/create-request-for-repair.dto';
import { UpdateRequestForRepairDto } from './dto/update-request-for-repair.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('RequestForRepair')
@Controller({ path: 'request-for-repair', version: '1' })
export class RequestForRepairController {
  constructor(private readonly requestForRepairService: RequestForRepairService) { }

  @Post()
  create(@Body() createRequestForRepairDto: CreateRequestForRepairDto) {
    return this.requestForRepairService.create(createRequestForRepairDto);
  }

  @Get()
  findAll() {
    return this.requestForRepairService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestForRepairService.findOne(id);
  }

  @Get('transactionNo/transNo')
  getTransactionNo() {
    return this.requestForRepairService.getTransactionNo();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestForRepairDto: UpdateRequestForRepairDto) {
    return this.requestForRepairService.update(id, updateRequestForRepairDto);
  }

  @Patch('remarks/:id')
  updateItemRemarks(@Param('id') id: string, @Body() data: { remarks: string }) {
    return this.requestForRepairService.updateItemRemarks(id, data.remarks);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestForRepairService.remove(id);
  }
}
