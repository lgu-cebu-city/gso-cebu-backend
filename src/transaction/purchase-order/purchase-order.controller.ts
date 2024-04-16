import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PurchaseOrder')
@Controller({ path: 'purchase-order', version: '1' })
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) { }

  @Post()
  create(@Body() createPurchaseOrderDto: CreatePurchaseOrderDto) {
    return this.purchaseOrderService.create(createPurchaseOrderDto);
  }

  @Get()
  findAll() {
    return this.purchaseOrderService.findAll();
  }

  @Get('byMonthYear/:date')
  findAllByMonthYear(@Param('date') date: Date) {
    return this.purchaseOrderService.findAllByMonthYear(date);
  }

  @Get('byMonthYearWithDR/:date')
  findAllByMonthYearWithDR(@Param('date') date: Date) {
    return this.purchaseOrderService.findAllByMonthYearWithDR(date);
  }

  @Get('byMonthYearWithDR/forIAR/:date')
  findAllByForIARMonthYearWithDR(@Param('date') date: Date) {
    return this.purchaseOrderService.findAllByForIARMonthYearWithDR(date);
  }

  @Get('byMonthYearWithDR/forIARActual/:date')
  findAllByForIARActualMonthYearWithDR(@Param('date') date: Date) {
    return this.purchaseOrderService.findAllByForIARActualMonthYearWithDR(date);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseOrderService.findOne(id);
  }

  @Get('transactionNo/transNo')
  getTransactionNo() {
    return this.purchaseOrderService.getTransactionNo();
  }

  @Get('transaction/count/:poId')
  getTransCount(@Param('poId') poId: string) {
    return this.purchaseOrderService.getTransCount(poId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    return this.purchaseOrderService.update(id, updatePurchaseOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseOrderService.remove(id);
  }
}
