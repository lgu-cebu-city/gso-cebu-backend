import { Module } from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { PurchaseOrderController } from './purchase-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { PurchaseOrderItemDetails } from './entities/purchase-order-item-details.entity';
import { AbstractOfCanvassSupplierDetails } from '../abstract-of-canvass/entities/abstract-of-canvass-supplier-details.entity';
import { AbstractOfCanvass } from '../abstract-of-canvass/entities/abstract-of-canvass.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseOrder, PurchaseOrderItemDetails, AbstractOfCanvass, AbstractOfCanvassSupplierDetails])],
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService],
  exports: [PurchaseOrderService]
})
export class PurchaseOrderModule { }
