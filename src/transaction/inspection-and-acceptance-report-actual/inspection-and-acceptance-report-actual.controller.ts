import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InspectionAndAcceptanceReportActualService } from './inspection-and-acceptance-report-actual.service';
import { CreateInspectionAndAcceptanceReportActualDto } from './dto/create-inspection-and-acceptance-report-actual.dto';
import { UpdateInspectionAndAcceptanceReportActualDto } from './dto/update-inspection-and-acceptance-report-actual.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('InspectionAndAcceptanceReportActual')
@Controller({ path: 'inspection-and-acceptance-report-actual', version: '1' })
export class InspectionAndAcceptanceReportActualController {
  constructor(private readonly inspectionAndAcceptanceReportActualService: InspectionAndAcceptanceReportActualService) { }

  @Post()
  create(@Body() createInspectionAndAcceptanceReportActualDto: CreateInspectionAndAcceptanceReportActualDto) {
    return this.inspectionAndAcceptanceReportActualService.create(createInspectionAndAcceptanceReportActualDto);
  }

  @Get()
  findAll() {
    return this.inspectionAndAcceptanceReportActualService.findAll();
  }

  @Get('byMonthYear/:date')
  findAllByMonthYear(@Param('date') date: Date) {
    return this.inspectionAndAcceptanceReportActualService.findAllByMonthYear(date);
  }

  @Get('are/all')
  findAllARE() {
    return this.inspectionAndAcceptanceReportActualService.findAllARE();
  }

  @Get('ics/all')
  findAllICS() {
    return this.inspectionAndAcceptanceReportActualService.findAllICS();
  }

  @Get('byId/:id')
  findOne(@Param('id') id: string) {
    return this.inspectionAndAcceptanceReportActualService.findOne(id);
  }

  @Get('transactionNo/transNo')
  getTransactionNo() {
    return this.inspectionAndAcceptanceReportActualService.getTransactionNo();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInspectionAndAcceptanceReportActualDto: UpdateInspectionAndAcceptanceReportActualDto) {
    return this.inspectionAndAcceptanceReportActualService.update(id, updateInspectionAndAcceptanceReportActualDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inspectionAndAcceptanceReportActualService.remove(id);
  }
}
