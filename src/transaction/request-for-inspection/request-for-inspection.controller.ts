import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestForInspectionService } from './request-for-inspection.service';
import { CreateRequestForInspectionDto } from './dto/create-request-for-inspection.dto';
import { UpdateRequestForInspectionDto } from './dto/update-request-for-inspection.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('RequestForInspection')
@Controller({ path: 'request-for-inspection', version: '1' })
export class RequestForInspectionController {
  constructor(private readonly requestForInspectionService: RequestForInspectionService) { }

  @Post()
  create(@Body() createRequestForInspectionDto: CreateRequestForInspectionDto) {
    return this.requestForInspectionService.create(createRequestForInspectionDto);
  }

  @Get()
  findAll() {
    return this.requestForInspectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestForInspectionService.findOne(id);
  }

  @Get('transactionNo/transNo')
  getTransactionNo() {
    return this.requestForInspectionService.getTransactionNo();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestForInspectionDto: UpdateRequestForInspectionDto) {
    return this.requestForInspectionService.update(id, updateRequestForInspectionDto);
  }

  @Patch('remarks/:id')
  updateItemRemarks(@Param('id') id: string, @Body() data: { remarks: string }) {
    return this.requestForInspectionService.updateItemRemarks(id, data.remarks);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestForInspectionService.remove(id);
  }
}
