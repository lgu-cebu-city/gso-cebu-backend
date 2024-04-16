import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestQuotationService } from './request-quotation.service';
import { CreateRequestQuotationDto } from './dto/create-request-quotation.dto';
import { UpdateRequestQuotationDto } from './dto/update-request-quotation.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('RequestQuotation')
@Controller({ path: 'request-quotation', version: '1' })
export class RequestQuotationController {
  constructor(private readonly requestQuotationService: RequestQuotationService) { }

  @Post()
  create(@Body() createRequestQuotationDto: CreateRequestQuotationDto) {
    return this.requestQuotationService.create(createRequestQuotationDto);
  }

  @Get()
  findAll() {
    return this.requestQuotationService.findAll();
  }

  @Get('byMonthYear/:date')
  findAllByMonthYear(@Param('date') date: Date) {
    return this.requestQuotationService.findAllByMonthYear(date);
  }

  @Get('byMonthYear/forAOQ/:date')
  findAllForAOQByMonthYear(@Param('date') date: Date) {
    return this.requestQuotationService.findAllForAOQByMonthYear(date);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestQuotationService.findOne(id);
  }

  @Get('transactionNo/transNo')
  getTransactionNo() {
    return this.requestQuotationService.getTransactionNo();
  }

  @Get('transaction/count/:rfqId')
  getTransCount(@Param('rfqId') rfqId: string) {
    return this.requestQuotationService.getTransCount(rfqId);
  }

  @Get('items-by-rfqid/:id')
  findItemsByRfqId(@Param('id') id: string) {
    return this.requestQuotationService.findItemsByRfqId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestQuotationDto: UpdateRequestQuotationDto) {
    return this.requestQuotationService.update(id, updateRequestQuotationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestQuotationService.remove(id);
  }
}
