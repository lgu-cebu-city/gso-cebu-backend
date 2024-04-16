import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InspectionAndAcceptanceReportService } from './inspection-and-acceptance-report.service';
import { CreateInspectionAndAcceptanceReportDto } from './dto/create-inspection-and-acceptance-report.dto';
import { UpdateInspectionAndAcceptanceReportDto } from './dto/update-inspection-and-acceptance-report.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('InspectionAndAcceptanceReport')
@Controller({ path: 'inspection-and-acceptance-report', version: '1' })
export class InspectionAndAcceptanceReportController {
  constructor(private readonly inspectionAndAcceptanceReportService: InspectionAndAcceptanceReportService) { }

  @Post()
  create(@Body() createInspectionAndAcceptanceReportDto: CreateInspectionAndAcceptanceReportDto) {
    return this.inspectionAndAcceptanceReportService.create(createInspectionAndAcceptanceReportDto);
  }

  @Get()
  findAll() {
    return this.inspectionAndAcceptanceReportService.findAll();
  }

  @Get('byMonthYear/:date')
  findAllByMonthYear(@Param('date') date: Date) {
    return this.inspectionAndAcceptanceReportService.findAllByMonthYear(date);
  }

  @Get('are/all')
  findAllARE() {
    return this.inspectionAndAcceptanceReportService.findAllARE();
  }

  @Get('ics/all')
  findAllICS() {
    return this.inspectionAndAcceptanceReportService.findAllICS();
  }

  @Get('byId/:id')
  findOne(@Param('id') id: string) {
    return this.inspectionAndAcceptanceReportService.findOne(id);
  }

  @Get('transactionNo/transNo')
  getTransactionNo() {
    return this.inspectionAndAcceptanceReportService.getTransactionNo();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInspectionAndAcceptanceReportDto: UpdateInspectionAndAcceptanceReportDto) {
    return this.inspectionAndAcceptanceReportService.update(id, updateInspectionAndAcceptanceReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inspectionAndAcceptanceReportService.remove(id);
  }
}
