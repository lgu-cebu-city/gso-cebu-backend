import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseRequestService } from './purchase-request.service';
import { CreatePurchaseRequestDto } from './dto/create-purchase-request.dto';
import { UpdatePurchaseRequestDto } from './dto/update-purchase-request.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PurchaseRequest')
@Controller({ path: 'purchase-request', version: '1' })
export class PurchaseRequestController {
  constructor(private readonly purchaseRequestService: PurchaseRequestService) { }

  @Post()
  create(@Body() createPurchaseRequestDto: CreatePurchaseRequestDto) {
    return this.purchaseRequestService.create(createPurchaseRequestDto);
  }

  @Get()
  findAll() {
    return this.purchaseRequestService.findAll();
  }

  @Get('byMonthYear/:date')
  findAllByMonthYear(@Param('date') date: Date) {
    return this.purchaseRequestService.findAllByMonthYear(date);
  }

  @Get('byMonthYear/forConso/:date')
  findAllForConsoByMonthYear(@Param('date') date: Date) {
    return this.purchaseRequestService.findAllForConsoByMonthYear(date);
  }

  @Get('byMonthYear/dbm/:date')
  findAllByMonthYearDBM(@Param('date') date: Date) {
    return this.purchaseRequestService.findAllByMonthYearDBM(date);
  }

  @Get('byMonthYear/forConso/dbm/:date')
  findAllForConsoByMonthYearDBM(@Param('date') date: Date) {
    return this.purchaseRequestService.findAllForConsoByMonthYearDBM(date);
  }

  @Get('byDateRange/:dateFrom/:dateTo')
  findAllByDateRange(@Param('dateFrom') dateFrom: Date, @Param('dateTo') dateTo: Date) {
    return this.purchaseRequestService.findAllByDateRange(dateFrom, dateTo);
  }

  @Get('byDateRange/forConso/:dateFrom/:dateTo')
  findAllForConsoByDateRange(@Param('dateFrom') dateFrom: Date, @Param('dateTo') dateTo: Date) {
    return this.purchaseRequestService.findAllForConsoByDateRange(dateFrom, dateTo);
  }

  @Get('byQuarter/:qtr/:year')
  findAllByQuarter(@Param('qtr') qtr: string, @Param('year') year: string) {
    return this.purchaseRequestService.findAllByQuarter(qtr, year);
  }

  @Get('byQuarter/forConso/:qtr/:year')
  findAllForConsoByQuarter(@Param('qtr') qtr: string, @Param('year') year: string) {
    return this.purchaseRequestService.findAllForConsoByQuarter(qtr, year);
  }

  @Get('byQuarter/dbm/:qtr/:year')
  findAllByQuarterDBM(@Param('qtr') qtr: string, @Param('year') year: string) {
    return this.purchaseRequestService.findAllByQuarterDBM(qtr, year);
  }

  @Get('byQuarter/forConso/dbm/:qtr/:year')
  findAllForConsoByQuarterDBM(@Param('qtr') qtr: string, @Param('year') year: string) {
    return this.purchaseRequestService.findAllForConsoByQuarterDBM(qtr, year);
  }

  @Get('byMonthYearIncludingClosed/:date')
  findAllIncludingClosedByMonthYear(@Param('date') date: Date) {
    return this.purchaseRequestService.findAllIncludingClosedByMonthYear(date);
  }

  @Get('byDateRangeIncludingClosed/:dateFrom/:dateTo')
  findAllIncludingClosedByDateRange(@Param('dateFrom') dateFrom: Date, @Param('dateTo') dateTo: Date) {
    return this.purchaseRequestService.findAllIncludingClosedByDateRange(dateFrom, dateTo);
  }

  @Get('byQuarterIncludingClosed/:qtr/:year')
  findAllIncludingClosedByQuarter(@Param('qtr') qtr: string, @Param('year') year: string) {
    return this.purchaseRequestService.findAllIncludingClosedByQuarter(qtr, year);
  }

  @Get('consolidated/all')
  findAllConsolidated() {
    return this.purchaseRequestService.findAllConsolidated();
  }

  @Get('consolidated/byMonthYear/:date')
  findAllConsolidatedByMonthYear(@Param('date') date: Date) {
    return this.purchaseRequestService.findAllConsolidatedByMonthYear(date);
  }

  @Get('consolidated/byDateRange/:dateFrom/:dateTo')
  findAllConsolidatedByDateRange(@Param('dateFrom') dateFrom: Date, @Param('dateTo') dateTo: Date) {
    return this.purchaseRequestService.findAllConsolidatedByDateRange(dateFrom, dateTo);
  }

  @Get('consolidated/byQuarter/:qtr/:year')
  findAllConsolidatedByQuarter(@Param('qtr') qtr: string, @Param('year') year: string) {
    return this.purchaseRequestService.findAllConsolidatedByQuarter(qtr, year);
  }

  @Get('byDepartment/:deptId')
  findAllByDepartment(@Param('deptId') deptId: string) {
    return this.purchaseRequestService.findAllByDepartment(deptId);
  }

  @Get('withIssuance/byDepartment/:deptId')
  findAllWithIssuanceByDepartment(@Param('deptId') deptId: string) {
    return this.purchaseRequestService.findAllWithIssuanceByDepartment(deptId);
  }

  @Get('byDepartmentMonthYear/:deptId/:date')
  findAllByDepartmentMonthYear(@Param('deptId') deptId: string, @Param('date') date: Date) {
    return this.purchaseRequestService.findAllByDepartmentMonthYear(deptId, date);
  }

  @Get('byDepartmentByDateRange/:deptId/:dateFrom/:dateTo')
  findAllByDepartmentByDateRange(@Param('deptId') deptId: string, @Param('dateFrom') dateFrom: Date, @Param('dateTo') dateTo: Date) {
    return this.purchaseRequestService.findAllByDepartmentByDateRange(deptId, dateFrom, dateTo);
  }

  @Get('byDepartmentByQuarter/:deptId/:qtr/:year')
  findAllByDepartmentByQuarter(@Param('deptId') deptId: string, @Param('qtr') qtr: string, @Param('year') year: string) {
    return this.purchaseRequestService.findAllByDepartmentByQuarter(deptId, qtr, year);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseRequestService.findOne(id);
  }

  @Get('consolidated/listPrs/:prId')
  ListPrInConsolidated(@Param('prId') id: string) {
    return this.purchaseRequestService.ListPrInConsolidated(id);
  }

  @Get('byPrId/:prId')
  findPRLogsByPRId(@Param('prId') prId: string) {
    return this.purchaseRequestService.findPRLogsByPRId(prId);
  }

  @Get('prItems/:deptId/:year')
  getPRItemsByDeptDate(@Param('deptId') deptId: string, @Param('year') year: string) {
    return this.purchaseRequestService.getPRItemsByDeptDate(deptId, year);
  }

  @Get('transactionNo/transNo')
  getTransactionNo() {
    return this.purchaseRequestService.getTransactionNo();
  }

  @Get('transaction/count/:prId')
  getTransCount(@Param('prId') prId: string) {
    return this.purchaseRequestService.getTransCount(prId);
  }

  @Get('consotransaction/count/:prIds')
  getConsolidatedTransCount(@Param('prIds') prIds: string) {
    return this.purchaseRequestService.getConsolidatedTransCount(prIds);
  }

  @Get('callouttransaction/count/:prIds')
  getCalledOutTransCount(@Param('prIds') prIds: string) {
    return this.purchaseRequestService.getCalledOutTransCount(prIds);
  }

  @Get('totalPOPerDept/:deptId/:year/:accId')
  getTotalPOPerDept(@Param('deptId') deptId: string, @Param('year') year: string, @Param('accId') accId: string) {
    return this.purchaseRequestService.getTotalPOPerDept(deptId, year, accId);
  }

  @Get('totalAmountPerAccPerDept/:deptId/:year/:accId')
  getTotalAmountPerAccPerDept(@Param('deptId') deptId: string, @Param('year') year: string, @Param('accId') accId: string) {
    return this.purchaseRequestService.getTotalAmountPerAccPerDept(deptId, year, accId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseRequestDto: UpdatePurchaseRequestDto) {
    return this.purchaseRequestService.update(id, updatePurchaseRequestDto);
  }

  @Patch('lockPr/:id/:isLocked')
  lockPR(@Param('id') id: string, @Param('isLocked') islocked: string) {
    return this.purchaseRequestService.lockPR(id, islocked == 'true');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseRequestService.remove(id);
  }
}
